"use client";

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { createWallet, getWallet, purchaseDataset } from '@/lib/api/xrp-payments';
import { useUserSync } from '@/components/providers/UserSyncProvider';

interface XRPPaymentFlowProps {
  datasetId: string;
  datasetTitle: string;
  priceUsd: number;
  sellerId: string;
  currentUserId?: string;
}

export function XRPPaymentFlow({
  datasetId,
  datasetTitle,
  priceUsd,
  sellerId,
  currentUserId,
}: XRPPaymentFlowProps) {
  const { getAccessToken } = usePrivy();
  const { ensureUserSynced } = useUserSync();
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [creatingWallet, setCreatingWallet] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [explorerUrl, setExplorerUrl] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Check if user already has a wallet
  const checkWallet = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        setError('Please login first');
        return;
      }

      await ensureUserSynced();

      const walletData = await getWallet(token);
      setWallet(walletData?.data || null);
    } catch (err: any) {
      console.error('Failed to check wallet:', err);
      setWallet(null);
    } finally {
      setLoading(false);
    }
  };

  // Create XRP wallet
  const handleCreateWallet = async () => {
    setCreatingWallet(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        setError('Please login first');
        return;
      }

      await ensureUserSynced();

      const walletData = await createWallet(token);
      setWallet(walletData.data);
    } catch (err: any) {
      setError(err?.message || 'Failed to create wallet');
    } finally {
      setCreatingWallet(false);
    }
  };

  // Execute payment
  const handlePurchase = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      const token = await getAccessToken();
      if (!token) {
        setError('Please login first');
        return;
      }

      await ensureUserSynced();

      const result = await purchaseDataset(datasetId, token);

      setSuccess(true);
      setTxHash(result.txHash);
      setExplorerUrl(result.explorerUrl);
      setShowConfirm(false);
    } catch (err: any) {
      const errorMessage = err?.data?.error || err?.message || 'Payment failed';
      setError(errorMessage);
      setShowConfirm(false);
    } finally {
      setProcessing(false);
    }
  };

  // Load wallet on mount
  useEffect(() => {
    checkWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if user is the seller
  const isOwner = currentUserId === sellerId;

  if (isOwner) {
    return (
      <Card className="p-6 bg-gray-50 border-gray-200">
        <p className="text-gray-600">You cannot purchase your own dataset</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      </Card>
    );
  }

  if (success && txHash) {
    return (
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="font-semibold text-green-900">Payment Successful!</h3>
          </div>

          <p className="text-sm text-green-800">
            You now have access to {datasetTitle}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction:</span>
              <span className="font-mono text-xs">{txHash.slice(0, 8)}...{txHash.slice(-8)}</span>
            </div>
            {explorerUrl && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm block"
              >
                View on XRPL Explorer →
              </a>
            )}
          </div>

          <Button
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Download Dataset
          </Button>
        </div>
      </Card>
    );
  }

  if (!wallet) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Setup XRP Wallet</h3>
            <p className="text-sm text-gray-600 mb-4">
              You need an XRP wallet to purchase datasets with RLUSD
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
              {error}
            </div>
          )}

          <Button
            onClick={handleCreateWallet}
            disabled={creatingWallet}
            className="w-full"
          >
            {creatingWallet ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Creating Wallet...
              </div>
            ) : (
              'Setup XRP Wallet'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            This will create a custodial XRP wallet and set up RLUSD trustline on XRP Ledger Testnet
          </p>
        </div>
      </Card>
    );
  }

  if (showConfirm) {
    return (
      <Card className="p-6 border-blue-200 bg-blue-50">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Confirm Purchase</h3>
            <p className="text-sm text-gray-700">
              Pay ${priceUsd.toFixed(2)} USD with RLUSD for {datasetTitle}?
            </p>
          </div>

          <div className="space-y-2 text-sm bg-white p-3 rounded">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">{priceUsd.toFixed(2)} RLUSD</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-xs">Your Wallet:</span>
              <span className="font-mono text-xs break-all">
                {wallet.wallet_address}
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => setShowConfirm(false)}
              variant="outline"
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={processing}
              className="flex-1"
            >
              {processing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </div>
              ) : (
                'Confirm Payment'
              )}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Buy with RLUSD</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-semibold">${priceUsd.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span>RLUSD (XRP Ledger)</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 text-xs">Your Wallet:</span>
              <span className="font-mono text-xs break-all">
                {wallet.wallet_address}
              </span>
            </div>
            {wallet.balance_rlusd !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Balance:</span>
                <span className={wallet.balance_rlusd < priceUsd ? 'text-red-600' : 'text-green-600'}>
                  {wallet.balance_rlusd.toFixed(2)} RLUSD
                </span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
            {error}
          </div>
        )}

        {wallet.balance_rlusd < priceUsd && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            Insufficient RLUSD balance. Please fund your wallet first.
          </div>
        )}

        <Button
          onClick={handlePurchase}
          disabled={processing || wallet.balance_rlusd < priceUsd}
          className="w-full"
        >
          Buy Dataset for ${priceUsd.toFixed(2)}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Instant payment via XRP Ledger • 1 RLUSD = $1 USD
        </p>
      </div>
    </Card>
  );
}
