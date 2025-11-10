"use client";

import { PrivyWrapper } from "@/components/providers/PrivyWrapper";
import { useEffect } from "react";
import { logX402Config } from "@/lib/config/x402";

export function Providers({ children }: { children: React.ReactNode }) {
  // Validate and log x402 configuration on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      logX402Config();
    }
  }, []);

  return <PrivyWrapper>{children}</PrivyWrapper>;
}
