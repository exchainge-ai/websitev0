import { apiFetch } from './client';

export interface WalletResponse {
  data: {
    id: string;
    user_id: string;
    wallet_address: string;
    trustline_rlusd: boolean;
    balance_xrp: number;
    balance_rlusd: number;
    created_at: string;
    updated_at: string;
  };
}

export interface PaymentResponse {
  success: true;
  sessionId: string;
  txHash: string;
  ledgerIndex: number;
  explorerUrl: string;
  amount: number;
  licenseId?: string;
  dataset: {
    id: string;
    title: string;
  };
}

export interface PaymentSessionStatus {
  data: {
    id: string;
    status: 'pending' | 'confirming' | 'completed' | 'failed' | 'expired';
    amountUsd: number;
    amountRlusd: number;
    buyerWallet: string;
    sellerWallet: string;
    txHash: string | null;
    ledgerIndex: number | null;
    explorerUrl: string | null;
    createdAt: string;
    completedAt: string | null;
    expiresAt: string;
    errorMessage: string | null;
    isBuyer: boolean;
  };
}

export async function createWallet(token: string): Promise<WalletResponse> {
  return apiFetch<WalletResponse>('/xrp/wallets', {
    method: 'POST',
    token,
  });
}

export async function getWallet(token: string): Promise<WalletResponse | null> {
  try {
    return await apiFetch<WalletResponse>('/xrp/wallets', {
      method: 'GET',
      token,
    });
  } catch (error: any) {
    if (error?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function purchaseDataset(
  datasetId: string,
  token: string
): Promise<PaymentResponse> {
  return apiFetch<PaymentResponse>('/xrp/payments', {
    method: 'POST',
    token,
    body: { datasetId },
  });
}

export async function getPaymentStatus(
  sessionId: string,
  token: string
): Promise<PaymentSessionStatus> {
  return apiFetch<PaymentSessionStatus>(`/xrp/payments/${sessionId}`, {
    method: 'GET',
    token,
  });
}
