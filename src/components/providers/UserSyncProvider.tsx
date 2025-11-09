"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrivy } from "@privy-io/react-auth";
import { apiFetch } from "@/lib/api/client";

type UserSyncStatus = "idle" | "syncing" | "synced" | "error";

interface UserSyncContextValue {
  status: UserSyncStatus;
  lastError?: string;
  ensureUserSynced: () => Promise<void>;
}

const defaultContext: UserSyncContextValue = {
  status: "idle",
  ensureUserSynced: async () => {},
};

const UserSyncContext = createContext<UserSyncContextValue>(defaultContext);

interface UserSyncProviderProps {
  children: ReactNode;
}

export function UserSyncProvider({ children }: UserSyncProviderProps) {
  const { user, getAccessToken } = usePrivy();
  const [status, setStatus] = useState<UserSyncStatus>("idle");
  const [lastError, setLastError] = useState<string | undefined>(undefined);
  const lastSyncedPrivyIdRef = useRef<string | null>(null);
  const syncPromiseRef = useRef<Promise<void> | null>(null);

  const syncUser = useCallback(async () => {
    if (!user) {
      lastSyncedPrivyIdRef.current = null;
      setStatus("idle");
      setLastError(undefined);
      return;
    }

    if (lastSyncedPrivyIdRef.current === user.id) {
      setStatus("synced");
      setLastError(undefined);
      return;
    }

    if (syncPromiseRef.current) {
      return syncPromiseRef.current;
    }

    const syncPromise = (async () => {
      try {
        setStatus("syncing");
        setLastError(undefined);

        const token = await getAccessToken();
        if (!token) {
          throw new Error("Missing access token");
        }

        await apiFetch("/users/sync", {
          method: "POST",
          token,
          body: {
            email: user.email?.address ?? undefined,
            displayName:
              user.email?.address ??
              user.wallet?.address ??
              user.id ??
              undefined,
            walletAddress: user.wallet?.address ?? undefined,
            accountType: "individual",
          },
        });

        lastSyncedPrivyIdRef.current = user.id;
        setStatus("synced");
      } catch (error) {
        console.error("[UserSync] Failed to sync user", error);
        setLastError(
          error instanceof Error ? error.message : "Failed to sync user",
        );
        setStatus("error");
        throw error;
      } finally {
        syncPromiseRef.current = null;
      }
    })();

    syncPromiseRef.current = syncPromise;
    return syncPromise;
  }, [user, getAccessToken]);

  const ensureUserSynced = useCallback(async () => {
    if (!user) {
      return;
    }
    await syncUser();
  }, [user, syncUser]);

  useEffect(() => {
    if (!user) {
      lastSyncedPrivyIdRef.current = null;
      setStatus("idle");
      setLastError(undefined);
      return;
    }

    void syncUser();
  }, [user, syncUser]);

  const value: UserSyncContextValue = {
    status,
    lastError,
    ensureUserSynced,
  };

  return (
    <UserSyncContext.Provider value={value}>
      {children}
    </UserSyncContext.Provider>
  );
}

export function useUserSync(): UserSyncContextValue {
  return useContext(UserSyncContext);
}
