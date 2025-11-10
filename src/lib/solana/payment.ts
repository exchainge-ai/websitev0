import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

/**
 * Creates a USDC transfer transaction
 * @param connection Solana connection
 * @param fromWallet Sender's public key
 * @param toWallet Recipient's public key (base58 string or PublicKey)
 * @param amount Amount in USDC (will be converted to smallest unit)
 * @param usdcMint USDC token mint address
 * @returns Transaction ready to be signed and sent
 */
export async function createUsdcTransferTransaction(
  connection: Connection,
  fromWallet: PublicKey,
  toWallet: string | PublicKey,
  amount: number,
  usdcMint: PublicKey
): Promise<Transaction> {
  const recipientPubkey = typeof toWallet === "string" 
    ? new PublicKey(toWallet) 
    : toWallet;

  // USDC has 6 decimals
  const amountInSmallestUnit = Math.floor(amount * 1_000_000);

  // Get the token accounts
  const fromTokenAccount = await getAssociatedTokenAddress(
    usdcMint,
    fromWallet,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const toTokenAccount = await getAssociatedTokenAddress(
    usdcMint,
    recipientPubkey,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const transaction = new Transaction();

  // Check if recipient's token account exists
  const recipientAccountInfo = await connection.getAccountInfo(toTokenAccount);
  
  if (!recipientAccountInfo) {
    // Create associated token account for recipient if it doesn't exist
    transaction.add(
      createAssociatedTokenAccountInstruction(
        fromWallet, // payer
        toTokenAccount, // associated token account
        recipientPubkey, // owner
        usdcMint, // mint
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );
  }

  // Add transfer instruction
  transaction.add(
    createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      fromWallet,
      amountInSmallestUnit,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  // Get recent blockhash
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromWallet;

  return transaction;
}

/**
 * Gets USDC balance for a wallet
 * @param connection Solana connection
 * @param walletPublicKey Wallet's public key
 * @param usdcMint USDC token mint address
 * @returns USDC balance (in USDC, not smallest unit)
 */
export async function getUsdcBalance(
  connection: Connection,
  walletPublicKey: PublicKey,
  usdcMint: PublicKey
): Promise<number> {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletPublicKey,
      { mint: usdcMint }
    );

    if (tokenAccounts.value.length === 0) {
      return 0;
    }

    const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    return balance || 0;
  } catch (error) {
    console.error("Error fetching USDC balance:", error);
    return 0;
  }
}

/**
 * Confirms a transaction on Solana
 * @param connection Solana connection
 * @param signature Transaction signature
 * @param commitment Commitment level
 * @returns Transaction confirmation status
 */
export async function confirmTransaction(
  connection: Connection,
  signature: string,
  commitment: "processed" | "confirmed" | "finalized" = "confirmed"
): Promise<boolean> {
  try {
    const confirmation = await connection.confirmTransaction(signature, commitment);
    return !confirmation.value.err;
  } catch (error) {
    console.error("Error confirming transaction:", error);
    return false;
  }
}
