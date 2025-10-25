"use client";

import { CheckCircle, X, Shield, Copy, ExternalLink, Clock, Database, Hash, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { apiFetch } from "@/lib/api/client";

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
  datasetId,
  datasetHash,
  blockchainTxHash: initialBlockchainTxHash,
  blockchainExplorerUrl: initialBlockchainExplorerUrl,
  blockchainNetwork = 'mainnet-beta',
  blockchainTimestamp: initialBlockchainTimestamp,
}: DatasetUploadSuccessModalProps) {
  const { getAccessToken } = usePrivy();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedTx, setCopiedTx] = useState(false);

  /**
   * Local state for blockchain transaction data.
   * Allows real-time updates via polling when transaction is confirmed asynchronously.
   */
  const [blockchainTxHash, setBlockchainTxHash] = useState(initialBlockchainTxHash);
  const [blockchainExplorerUrl, setBlockchainExplorerUrl] = useState(initialBlockchainExplorerUrl);
  const [blockchainTimestamp, setBlockchainTimestamp] = useState(initialBlockchainTimestamp);
  const [isPolling, setIsPolling] = useState(false);

  const networkDisplayName = blockchainNetwork === 'mainnet-beta'
    ? 'Mainnet'
    : blockchainNetwork.charAt(0).toUpperCase() + blockchainNetwork.slice(1);

  const displayTimestamp = blockchainTimestamp
    ? new Date(blockchainTimestamp).toLocaleString()
    : new Date().toLocaleString();

  /**
   * Polls backend API for blockchain confirmation status.
   * Executes every 6 seconds for up to 2 minutes or until transaction is confirmed.
   */
  useEffect(() => {
    if (!isOpen || !datasetId || blockchainTxHash) {
      return;
    }

    setIsPolling(true);
    let pollCount = 0;
    const maxPolls = 20;
    const pollIntervalMs = 6000;

    const pollInterval = setInterval(async () => {
      pollCount++;

      try {
        const token = await getAccessToken();
        const response = await apiFetch<{
          data?: {
            blockchainTxHash?: string;
            blockchainExplorerUrl?: string;
            blockchainTimestamp?: string;
          };
        }>(`/datasets/${datasetId}`, {
          token: token || undefined,
        });

        if (response?.data?.blockchainTxHash) {
          setBlockchainTxHash(response.data.blockchainTxHash);
          setBlockchainExplorerUrl(response.data.blockchainExplorerUrl || null);
          setBlockchainTimestamp(response.data.blockchainTimestamp || null);
          setIsPolling(false);
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Failed to poll blockchain confirmation status:', error);
      }

      if (pollCount >= maxPolls) {
        setIsPolling(false);
        clearInterval(pollInterval);
      }
    }, pollIntervalMs);

    return () => {
      clearInterval(pollInterval);
      setIsPolling(false);
    };
  }, [isOpen, datasetId, blockchainTxHash]);

  const copyId = () => {
    if (!datasetId) return;
    navigator.clipboard.writeText(datasetId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const copyTx = () => {
    if (!blockchainTxHash) return;
    navigator.clipboard.writeText(blockchainTxHash);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  /**
   * Generates and downloads a text receipt containing dataset and blockchain transaction details.
   */
  const saveReceipt = () => {
    const receiptText = `
ExchAInge Dataset Upload Receipt
================================

Dataset ID: ${datasetId || 'N/A'}
Dataset Hash: ${datasetHash || 'N/A'}
Transaction Hash: ${blockchainTxHash || 'Pending'}
Blockchain: Solana ${networkDisplayName}
Timestamp: ${displayTimestamp}
Explorer URL: ${blockchainExplorerUrl || 'Pending'}

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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl max-w-3xl w-full border border-purple-500/30 shadow-2xl shadow-purple-900/50 relative overflow-hidden">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 animate-pulse pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-gray-700/50 transition-all hover:rotate-90 duration-300 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </button>

        {/* Success Header */}
        <div className="relative p-8 text-center border-b border-gray-700/50">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full shadow-lg shadow-green-500/50 mb-6">
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Upload Successful!
          </h2>
          <p className="text-lg text-gray-300">
            Your dataset has been securely uploaded to the blockchain
          </p>
        </div>

        {/* Professional Receipt Card */}
        <div className="relative p-8">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-600/50 overflow-hidden shadow-2xl">

            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-purple-600/20 px-8 py-6 border-b border-gray-600/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-purple-400" />
                    Upload Receipt
                  </h3>
                  <p className="text-sm text-gray-400">
                    {blockchainTxHash ? `Solana ${networkDisplayName} • Verified` : 'Processing blockchain registration'}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-semibold text-green-400">Confirmed</span>
                </div>
              </div>
            </div>

            {/* Receipt Body */}
            <div className="p-8 space-y-6">

              {/* Dataset ID */}
              {datasetId && (
                <div className="group">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Dataset ID
                    </label>
                    <button
                      onClick={copyId}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all"
                      title="Copy dataset ID"
                    >
                      {copiedId ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-300 font-medium">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900/60 border border-gray-600/50 rounded-lg px-4 py-3">
                    <code className="text-sm text-purple-300 font-mono break-all">{datasetId}</code>
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div>
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  {blockchainTxHash ? 'Blockchain Timestamp' : 'Upload Time'}
                </label>
                <div className="bg-gray-900/60 border border-gray-600/50 rounded-lg px-4 py-3">
                  <p className="text-base text-gray-200 font-mono">{displayTimestamp}</p>
                </div>
              </div>

              {/* Dataset Hash */}
              {datasetHash && (
                <div>
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2 mb-2">
                    <Hash className="w-4 h-4" />
                    Content Hash
                  </label>
                  <div className="bg-gray-900/60 border border-gray-600/50 rounded-lg px-4 py-3">
                    <code className="text-sm text-purple-300 font-mono break-all">{datasetHash}</code>
                  </div>
                </div>
              )}

              {/* Transaction Signature */}
              {blockchainTxHash && (
                <div className="border-t border-gray-600/50 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-green-400 uppercase tracking-wide flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Blockchain Transaction
                    </label>
                    <button
                      onClick={copyTx}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all"
                      title="Copy transaction hash"
                    >
                      {copiedTx ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-300 font-medium">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg px-4 py-3">
                    <code className="text-sm text-green-300 font-mono break-all">{blockchainTxHash}</code>
                  </div>
                </div>
              )}

              {/* Status Message */}
              <div className={`rounded-xl p-4 border ${
                blockchainTxHash
                  ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30'
                  : 'bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30'
              }`}>
                <div className="flex items-start gap-3">
                  {isPolling ? (
                    <Loader2 className="w-5 h-5 mt-0.5 text-blue-400 animate-spin" />
                  ) : (
                    <Shield className={`w-5 h-5 mt-0.5 ${blockchainTxHash ? 'text-green-400' : 'text-blue-400'}`} />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">
                      {isPolling ? 'Awaiting Blockchain Confirmation...' : blockchainTxHash ? 'Blockchain Verified' : 'Processing Blockchain Registration'}
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {blockchainTxHash
                        ? 'Your dataset registration has been permanently recorded on the Solana blockchain. This provides immutable proof of ownership and upload timestamp.'
                        : isPolling
                        ? 'Your dataset has been successfully uploaded. Waiting for blockchain transaction to be confirmed...'
                        : 'Your dataset has been successfully uploaded and is being processed. Blockchain registration will complete shortly.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Footer Actions */}
            <div className="bg-gray-800/50 px-8 py-6 border-t border-gray-600/50 flex flex-col sm:flex-row gap-3">
              {blockchainTxHash && blockchainExplorerUrl ? (
                <a
                  href={blockchainExplorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02]"
                >
                  <ExternalLink className="w-5 h-5" />
                  View on Solana Explorer
                </a>
              ) : (
                <button
                  onClick={saveReceipt}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02]"
                >
                  <Copy className="w-5 h-5" />
                  Save Receipt
                </button>
              )}

              {datasetId && (
                <a
                  href={`/marketplace?highlight=${datasetId}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all"
                  onClick={onClose}
                >
                  <Database className="w-5 h-5" />
                  View in Marketplace
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
