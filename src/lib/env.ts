import { z } from "zod";

const publicEnvSchema = z.object({
  appUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_APP_URL must be a valid URL" }),
  apiBaseUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_API_BASE_URL must be a valid URL" }),
  privyAppId: z.string().min(1, {
    message: "NEXT_PUBLIC_PRIVY_APP_ID is required",
  }),
  privyClientId: z.string().min(1, {
    message: "NEXT_PUBLIC_PRIVY_CLIENT_ID is required",
  }),
  solanaRpcUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_SOLANA_RPC_URL must be a valid URL" })
    .optional(),
  supabaseUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_SUPABASE_URL must be a valid URL" })
    .optional(),
  supabaseAnonKey: z
    .string()
    .min(1, { message: "NEXT_PUBLIC_SUPABASE_ANON_KEY is required" })
    .optional(),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ValidatedEnv = PublicEnv;

export function validatePublicEnv(): PublicEnv {
  const envValues = {
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    privyAppId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    privyClientId: process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID,
    solanaRpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };

  try {
    return publicEnvSchema.parse(envValues);
  } catch (error) {
    handleValidationError(error);
  }
}

export function validateEnv(): ValidatedEnv {
  return validatePublicEnv();
}

function handleValidationError(error: unknown): never {
  if (error instanceof z.ZodError) {
    const issues = error.issues
      .map((issue) => {
        const path = issue.path.join(".");
        return `  - ${path || "unknown"}: ${issue.message}`;
      })
      .join("\n");

    throw new Error(
      `Environment variable validation failed:\n${issues}\n\nEnsure your .env.local file includes all required variables.`,
    );
  }

  throw error;
}
