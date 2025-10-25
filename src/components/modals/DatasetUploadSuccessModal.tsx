"use client";

import { CheckCircle, X, Shield, Copy, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

interface DatasetUploadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  datasetId: string | null;
  datasetHash: string | null;
  blockchainTxHash?: string | null;
  blockchainExplorerUrl?: string | null;
  blockchainNetwork?: 'mainnet-beta' | 'devnet' | 'testnet';
  blockchainTimestamp?: string | null;
}

export function DatasetUploadSuccessModal({
  isOpen,
  onClose,
  message,
  datasetId,
  datasetHash,
  blockchainTxHash,
  blockchainExplorerUrl,
  blockchainNetwork = 'mainnet-beta',
  blockchainTimestamp,
}: DatasetUploadSuccessModalProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedTx, setCopiedTx] = useState(false);

  // Format network name for display
  const networkDisplayName = blockchainNetwork === 'mainnet-beta'
    ? 'Mainnet'
    : blockchainNetwork.charAt(0).toUpperCase() + blockchainNetwork.slice(1);

  // Format timestamp or use current time
  const displayTimestamp = blockchainTimestamp
    ? new Date(blockchainTimestamp).toLocaleString()
    : new Date().toLocaleString();

  if (isOpen) {
    console.log('[DEBUG] Modal Component Loaded, Build Time: 2025-01-23T02:15:00Z');
    console.log('[DEBUG] Modal Props:', {
      datasetId,
      datasetHash,
      blockchainTxHash,
      blockchainExplorerUrl,
      hasBlockchainData: !!(blockchainTxHash && blockchainExplorerUrl),
    });
  }

  const copyHash = () => {
    if (!datasetHash) return;
    navigator.clipboard.writeText(datasetHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const copyTx = () => {
    if (!blockchainTxHash) return;
    navigator.clipboard.writeText(blockchainTxHash);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  const saveReceipt = () => {
    const receiptText = `
      ExchAInge Dataset Upload Receipt
      ================================

      Dataset ID: ${datasetId || 'N/A'}
      Dataset Hash: ${datasetHash || 'N/A'}
      Transaction Hash: ${blockchainTxHash || 'N/A'}
      Blockchain: Solana ${networkDisplayName}
      Timestamp: ${displayTimestamp}
      Explorer URL: ${blockchainExplorerUrl || 'N/A'}

      This receipt confirms your dataset has been registered on the Solana blockchain.
      `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exchainge-receipt-${datasetId || 'dataset'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-lg w-full border border-purple-500/20 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Upload Successful!</h2>
              <p className="text-sm text-gray-400 mt-0.5">Your dataset is ready</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-gray-300 mb-6">{message}</p>

          {/* Dataset Hash Section */}
          {datasetHash && (
            <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Dataset Hash</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs text-purple-300 bg-gray-950/50 px-3 py-2 rounded font-mono break-all">
                  {datasetHash}
                </code>
                <button
                  onClick={copyHash}
                  className="p-2 hover:bg-gray-700 rounded transition-colors shrink-0"
                  title="Copy hash"
                >
                  {copiedHash ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Blockchain Proof Section - Professional Receipt UI */}
          {blockchainTxHash && blockchainExplorerUrl && (
            <div className="bg-gradient-to-b from-purple-900/20 to-gray-900/20 rounded-lg p-6 border border-purple-500/30">
              {/* Receipt Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Blockchain Proof</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Solana {networkDisplayName}</p>
                  </div>
                </div>
                <Shield className="w-5 h-5 text-purple-400/40" aria-hidden="true" />
              </div>

              {/* Key Info Grid */}
              <div className="space-y-4 mb-5">
                {/* Timestamp */}
                <div>
                  <label className="text-xs font-medium text-gray-400 block mb-1.5">
                    Recorded At
                  </label>
                  <p className="text-sm text-gray-200 font-mono">{displayTimestamp}</p>
                </div>

                {/* Transaction Signature */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-gray-400">
                      Transaction Signature
                    </label>
                    <button
                      onClick={copyTx}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                      title="Copy transaction signature"
                      aria-label={copiedTx ? "Transaction signature copied" : "Copy transaction signature"}
                    >
                      {copiedTx ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-300">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <code className="block text-xs text-purple-300 bg-gray-950/50 px-3 py-2.5 rounded border border-gray-700/50 font-mono break-all">
                    {blockchainTxHash}
                  </code>
                </div>
              </div>

              {/* Info Message */}
              <div className="bg-green-900/10 rounded-lg p-3.5 mb-5 border border-green-500/20">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Your dataset registration has been permanently recorded on the Solana blockchain.
                  This provides immutable proof of ownership and upload timestamp.
                </p>
              </div>

              {/* Explorer Link */}
              <a
                href={blockchainExplorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
                aria-label="View transaction on Solana Explorer (opens in new tab)"
              >
                <ExternalLink className="w-4 h-4" />
                View on Solana Explorer
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-6">
            {/* Primary action - View Your Dataset */}
            {datasetId && (
              <a
                href={`/dashboard/dataset/${datasetId}`}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-center flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Your Dataset
              </a>
            )}

            {/* Secondary actions */}
            <div className="flex gap-3">
              {blockchainTxHash && (
                <button
                  onClick={saveReceipt}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Save Receipt
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
