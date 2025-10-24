"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PrivyErrorBoundary } from "./PrivyErrorBoundary";

type PrivyModule = typeof import("@privy-io/react-auth");

interface PrivyWrapperProps {
  children: ReactNode;
}

export function PrivyWrapper({ children }: PrivyWrapperProps) {
  // Read env vars directly without validation
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || '';

  const [privyModule, setPrivyModule] = useState<PrivyModule | null>(null);

  useEffect(() => {
    let isMounted = true;

    import("@privy-io/react-auth")
      .then((module) => {
        if (isMounted) {
          setPrivyModule(module);
        }
      })
      .catch((error) => {
        console.error("[PrivyWrapper] Failed to load Privy provider:", error);
        if (isMounted) {
          setPrivyModule(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const shouldUsePrivy = Boolean(appId && clientId && privyModule);

  const content = shouldUsePrivy ? (
    (() => {
      const { PrivyProvider } = privyModule!;
      return (
        <PrivyProvider
          key="privy-provider"
          appId={appId}
          clientId={clientId}
          config={{
            embeddedWallets: {
              createOnLogin: "all-users",
            } as any,
            loginMethods: ["email", "wallet", "google", "github"],
            appearance: {
              theme: "dark",
              accentColor: "#8b5cf6",
              logo: "https://api.dicebear.com/7.x/shapes/svg?seed=exchainge&backgroundColor=8b5cf6",
              showWalletLoginFirst: false,
              walletList: ["metamask", "coinbase_wallet", "rainbow"],
              landingHeader: "Welcome to ExchAInge",
              loginMessage: "Sign in to access AI training datasets",
              walletChainType: "ethereum-and-solana",
            },
            legal: {
              termsAndConditionsUrl: "/terms",
              privacyPolicyUrl: "/privacy",
            },
          }}
        >
          <div suppressHydrationWarning>{children}</div>
        </PrivyProvider>
      );
    })()
  ) : (
    <div suppressHydrationWarning>{children}</div>
  );

  return (
    <PrivyErrorBoundary key="privy-error-boundary">
      <div key="privy-container" suppressHydrationWarning>
        {content}
      </div>
    </PrivyErrorBoundary>
  );
}
