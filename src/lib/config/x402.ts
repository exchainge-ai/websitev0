/**
 * x402 Payment Configuration
 * 
 * These constants should match the backend configuration.
 * Ensure these values are synchronized with your backend environment variables.
 */

export const X402_CONFIG = {
  /**
   * USDC Token Mint Address on Solana Devnet
   * Backend should use the same mint address
   */
  USDC_MINT_DEVNET: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
  
  /**
   * USDC Token Mint Address on Solana Mainnet
   * Use this for production
   */
  USDC_MINT_MAINNET: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  
  /**
   * Solana Network
   * Should match backend SOLANA_NETWORK
   */
  NETWORK: process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet",
  
  /**
   * Solana RPC URL
   * Should match backend SOLANA_RPC_URL
   */
  RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com",
  
  /**
   * x402 Facilitator URL (if using x402-solana middleware)
   * Should match backend X402_FACILITATOR_URL
   */
  FACILITATOR_URL: process.env.NEXT_PUBLIC_X402_FACILITATOR_URL,
  
  /**
   * CDP Client Key (Coinbase Developer Platform)
   * Should match backend CDP_CLIENT_KEY
   */
  CDP_CLIENT_KEY: process.env.NEXT_PUBLIC_CDP_CLIENT_KEY,
  
  /**
   * Recipient Wallet Address for payments
   * Should match backend PAYMENT_WALLET_ADDRESS
   */
  PAYMENT_WALLET: process.env.NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS,
} as const;

/**
 * Get the appropriate USDC mint address based on network
 */
export function getUsdcMint(): string {
  return X402_CONFIG.NETWORK === "mainnet-beta" 
    ? X402_CONFIG.USDC_MINT_MAINNET 
    : X402_CONFIG.USDC_MINT_DEVNET;
}

/**
 * Validates that required environment variables are set
 */
export function validateX402Config(): {
  valid: boolean;
  missing: string[];
  warnings: string[];
} {
  const missing: string[] = [];
  const warnings: string[] = [];
  
  if (!X402_CONFIG.RPC_URL) {
    missing.push("NEXT_PUBLIC_SOLANA_RPC_URL");
  }
  
  if (!X402_CONFIG.FACILITATOR_URL) {
    warnings.push("NEXT_PUBLIC_X402_FACILITATOR_URL not set (optional)");
  }
  
  if (!X402_CONFIG.CDP_CLIENT_KEY) {
    warnings.push("NEXT_PUBLIC_CDP_CLIENT_KEY not set (optional)");
  }
  
  if (!X402_CONFIG.PAYMENT_WALLET) {
    warnings.push("NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS not set (will use backend-provided address)");
  }
  
  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

/**
 * Logs configuration validation results
 */
export function logX402Config(): void {
  const validation = validateX402Config();
  
  console.group("[x402 Configuration]");
  console.log("Network:", X402_CONFIG.NETWORK);
  console.log("RPC URL:", X402_CONFIG.RPC_URL);
  console.log("USDC Mint:", getUsdcMint());
  console.log("Facilitator URL:", X402_CONFIG.FACILITATOR_URL || "Not set");
  console.log("CDP Client Key:", X402_CONFIG.CDP_CLIENT_KEY ? "Set" : "Not set");
  console.log("Payment Wallet:", X402_CONFIG.PAYMENT_WALLET || "Will use backend address");
  
  if (validation.missing.length > 0) {
    console.error("❌ Missing required variables:", validation.missing);
  }
  
  if (validation.warnings.length > 0) {
    console.warn("⚠️ Warnings:", validation.warnings);
  }
  
  if (validation.valid && validation.warnings.length === 0) {
    console.log("✅ Configuration valid");
  }
  
  console.groupEnd();
}
