"use client";
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Star,
  XCircle,
  Wallet,
} from "lucide-react";
// Performance optimization imports removed
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// @jsx React.createElement
// @jsxFrag React.Fragment
import React, { useCallback, useMemo, useRef } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { createUsdcTransferTransaction, confirmTransaction } from "@/lib/solana/payment";
import { checkApiHealth } from "@/lib/api/health";
import { getUsdcMint } from "@/lib/config/x402";
import { buildApiUrl } from "@/lib/api/client";

// Local type fallbacks for environments without path alias
type DatasetStatus = "draft" | "pending" | "live" | "rejected" | "archived";
type ExtendedDataset = {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  status?: DatasetStatus;
  verificationScore?: number;
  isUserUploaded?: boolean;
  isMarketplaceOnly?: boolean;
  price?: string;
  downloads?: string;
  format?: string;
  lastUpdated?: string;
  size?: string;
  actionLabel?: string;
  rating?: number;
  category?: string;
};
const DATASET_STATUS = {
  DRAFT: "draft",
  PENDING: "pending",
  LIVE: "live",
  REJECTED: "rejected",
  ARCHIVED: "archived",
};

interface DatasetCardProps {
  dataset: ExtendedDataset;
}

/**
 * A unified dataset card component for displaying both sample and user datasets
 */
const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => {
  const router = useRouter();
  const { authenticated, login, getAccessToken } = usePrivy();
  const { connected, connecting, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentRequired, setPaymentRequired] = React.useState(false);
  const [paymentInstructions, setPaymentInstructions] = React.useState<any>(null);
  const [downloadError, setDownloadError] = React.useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);
  const [txHash, setTxHash] = React.useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = React.useState<number | null>(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = React.useState(false);
  const [apiHealthy, setApiHealthy] = React.useState<boolean>(true);

  // USDC token mint address, uses centralized config
  const USDC_MINT = useMemo(() => new PublicKey(getUsdcMint()), []);

  // Fetch USDC balance when wallet connects with rate limiting
  React.useEffect(() => {
    let isMounted = true;
    
    async function fetchUsdcBalance() {
      if (!connected || !publicKey || !connection) {
        setUsdcBalance(null);
        return;
      }

      try {
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!isMounted) return;
        
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: USDC_MINT
        });

        if (isMounted && tokenAccounts.value.length > 0) {
          const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
          setUsdcBalance(balance);
        } else if (isMounted) {
          setUsdcBalance(0);
        }
      } catch (error: any) {
        if (isMounted) {
          // Don't log 429 errors, just silently fail
          if (!error?.message?.includes('429')) {
            console.error("Error fetching USDC balance:", error);
          }
          setUsdcBalance(null);
        }
      }
    }

    fetchUsdcBalance();
    
    return () => {
      isMounted = false;
    };
  }, [connected, publicKey, connection, USDC_MINT]);

  // Check API health when payment is required
  React.useEffect(() => {
    async function performHealthCheck() {
      if (paymentRequired && paymentInstructions) {
        const health = await checkApiHealth();
        setApiHealthy(health !== null && health.status === "ok");
        
        if (!health || health.status !== "ok") {
          console.warn("[API Health] Backend may be unavailable");
        }
      }
    }
    performHealthCheck();
  }, [paymentRequired, paymentInstructions]);

  // Handle payment transaction
  const handlePayment = async () => {
    if (!connected || !publicKey || !sendTransaction || !paymentInstructions) {
      alert("Please connect your wallet first");
      return;
    }

    setIsPaymentProcessing(true);
    setDownloadError(null);

    try {
      console.log("Initiating payment:", paymentInstructions);
      console.log("Sending from wallet:", publicKey.toBase58());
      
      // Parse the USDC mint from payment instructions
      const usdcMint = new PublicKey(paymentInstructions.mint || USDC_MINT);
      const amount = parseFloat(paymentInstructions.amount);
      
      const transaction = await createUsdcTransferTransaction(
        connection,
        publicKey,
        paymentInstructions.wallet,
        amount,
        usdcMint
      );
      
      console.log("Transaction created, sending...");
      
      // Send and confirm transaction
      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction sent:", signature);
      
      setTxHash(signature);
      setIsPaymentProcessing(false);
      
      // Wait for confirmation
      console.log("Waiting for confirmation...");
      const confirmed = await confirmTransaction(connection, signature, "confirmed");
      
      if (confirmed) {
        console.log("Payment confirmed! Signature:", signature);
        
        console.log("[Payment Log]", {
          txHash: signature,
          dataset: dataset.id,
          amount: amount,
          recipient: paymentInstructions.wallet,
          timestamp: new Date().toISOString()
        });
        
        alert(`Payment successful! Transaction: ${signature}\n\nClick OK to download the dataset.`);
      } else {
        setDownloadError("Payment transaction failed to confirm. Please check your wallet.");
        console.error("Transaction failed to confirm");
      }
      
    } catch (error: any) {
      console.error("Payment error:", error);
      
      let errorMessage = "Payment failed";
      
      if (error?.message?.includes("User rejected")) {
        errorMessage = "Payment cancelled by user";
      } else if (error?.message?.includes("insufficient")) {
        errorMessage = "Insufficient USDC balance";
      } else if (error?.message?.includes("blockhash")) {
        errorMessage = "Network error - please try again";
      } else if (error?.message?.includes("timeout")) {
        errorMessage = "Transaction timeout - please check your wallet";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      console.error("[Payment Error]", {
        dataset: dataset.id,
        error: errorMessage,
        fullError: error,
        timestamp: new Date().toISOString()
      });
      
      setDownloadError(`Payment failed: ${errorMessage}`);
      setIsPaymentProcessing(false);
      setTxHash(null);
    }
  };

  React.useEffect(() => {
    if (dataset.isUserUploaded && !dataset.isMarketplaceOnly) {
      const url = `/dashboard/dataset/${encodeURIComponent(dataset.id)}`;
      router.prefetch(url);
    }
  }, [dataset.id, dataset.isUserUploaded, dataset.isMarketplaceOnly, router]);

  const getStatusBadge = useCallback(() => {
    if (dataset.status === DATASET_STATUS.LIVE) {
      return (
        <div
          className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg border border-green-400/30"
          aria-label="Verified with score"
        >
          <CheckCircle className="w-3 h-3" />
          {dataset.verificationScore || "Live"}
          {dataset.verificationScore && "%"}
        </div>
      );
    } else if (dataset.status === DATASET_STATUS.PENDING) {
      return (
        <div
          className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg border border-yellow-400/30"
          aria-label="Pending verification"
        >
          <Clock className="w-3 h-3" />
          Pending
        </div>
      );
    } else if (dataset.status === DATASET_STATUS.REJECTED) {
      return (
        <div
          className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg border border-red-400/30"
          aria-label="Rejected verification"
        >
          <XCircle className="w-3 h-3" />
          Rejected
        </div>
      );
    } else if (dataset.verificationScore) {
      return (
        <div
          className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg border border-green-400/30"
          aria-label="Verification score"
        >
          <CheckCircle className="w-3 h-3" />
          {dataset.verificationScore}%
        </div>
      );
    }
    return null;
  }, [dataset.status, dataset.verificationScore]);

  const styles = useMemo(() => {
    const isUserUploaded = dataset.isUserUploaded || false;

    return {
      cardStyle: isUserUploaded
        ? "border-2 border-[#6DF77E]/40 hover:border-[#6DF77E]/60 relative ring-2 ring-[#6DF77E]/20 hover:ring-[#6DF77E]/40"
        : "border border-gray-700 hover:border-blue-500",

      accentColor: isUserUploaded ? "green" : "blue",
      buttonColor: isUserUploaded ? "green" : "blue",

      categoryBadge: `bg-gray-900/80 ${isUserUploaded ? "text-[#6DF77E]" : "text-blue-300"} px-3 py-1 rounded-full text-sm font-semibold ${isUserUploaded ? "border border-[#6DF77E]/30" : "border border-blue-500/30"} shadow-sm backdrop-blur-sm`,

      downloadIcon: `w-4 h-4 ${isUserUploaded ? "text-[#6DF77E]" : "text-blue-400"}`,
      fileTextIcon: `w-4 h-4 ${isUserUploaded ? "text-[#6DF77E]" : "text-blue-400"}`,
      calendarIcon: `w-4 h-4 ${isUserUploaded ? "text-[#6DF77E]" : "text-blue-400"}`,

      sizeTag: `text-xs ${isUserUploaded ? "bg-[#6DF77E]/10 text-[#6DF77E] border border-[#6DF77E]/30" : "bg-blue-900/30 text-blue-300 border border-blue-500/30"} px-2 py-1 rounded font-semibold`,

      actionButton: `${isUserUploaded ? "bg-[#6DF77E] text-[#03241f]" : "bg-[#6DF77E] text-[#03241f]"} inline-flex items-center justify-center gap-2 rounded-lg border border-[#6DF77E]/20 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#04C61B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04C61B] shadow-[0_14px_30px_-20px_rgba(99,247,125,0.9)]`,

      tags: isUserUploaded
        ? "bg-[#6DF77E]/10 text-[#6DF77E] px-2 py-1 rounded-lg text-xs border border-[#6DF77E]/30 font-medium"
        : "bg-blue-900/30 text-blue-300 px-2 py-1 rounded-lg text-xs border border-blue-500/30 font-medium",
    };
  }, [dataset.isUserUploaded]);

  const displayPrice = useMemo(() => {
    if (!dataset.price) return "";
    return dataset.price.replace(/^\s*\$/, "").trim();
  }, [dataset.price]);

  return (
    <div
      ref={cardRef}
      className={`bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${styles.cardStyle} flex flex-col h-full`}
    >
      {/* Image - with optimized loading */}
      <div className="h-48 relative overflow-hidden">
        {dataset.image ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <FileText
                className={`w-12 h-12 ${styles.accentColor === "green" ? "text-[#6DF77E]/40" : "text-blue-400/40"}`}
              />
            </div>
            <Image
              src={dataset.image}
              alt={`Preview of ${dataset.title}`}
              priority={dataset.isUserUploaded}
              loading={dataset.isUserUploaded ? "eager" : "lazy"}
              fetchPriority={dataset.isUserUploaded ? "high" : "auto"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFmMjkzNyIvPjwvc3ZnPg=="
              width={400}
              height={300}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fallbacks: Record<string, string> = {
                  Robotics: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
                  "Autonomous Vehicles": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
                  Navigation: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
                  "Human-Robot Interaction": "https://images.unsplash.com/photo-1527430253228-e93688616381?w=400&h=300&fit=crop",
                  "Sensor Data": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
                  "Motion Capture": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
                };

                target.src =
                  dataset.category && fallbacks[dataset.category]
                    ? fallbacks[dataset.category]
                    : "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop";
              }}
            />
          </>
        ) : (
          <div className="h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
            <FileText
              className={`w-16 h-16 ${styles.accentColor === "green" ? "text-[#6DF77E]/60 group-hover:text-[#6DF77E]" : "text-blue-400/60 group-hover:text-blue-300"} transition-all duration-300 group-hover:scale-110`}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className={styles.categoryBadge}>{dataset.category}</span>
        </div>

        {/* Status Badge */}
        {getStatusBadge()}
      </div>

      <div className="p-6 bg-gray-800 flex flex-col flex-1">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white line-clamp-2 flex-1 mr-2">
            {dataset.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-400 ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold text-gray-300">
              {dataset.rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-3 font-medium">
          {dataset.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {dataset.tags?.slice(0, 3).map((tag: string) => (
            <span key={tag} className={styles.tags}>
              {tag}
            </span>
          ))}
          {dataset.tags?.length && dataset.tags.length > 3 && (
            <span className="text-gray-400 text-xs font-medium">
              +{dataset.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Dataset Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Download className={styles.downloadIcon} />
            <span className="font-medium">{dataset.downloads}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className={styles.fileTextIcon} />
            <span className="font-medium">{dataset.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className={styles.calendarIcon} />
            <span className="font-medium">{dataset.lastUpdated}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={styles.sizeTag}>{dataset.size}</span>
          </div>
        </div>

        {/* Price and Purchase/Manage Button */}
        <div className="pt-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-1 text-green-400">
          <span className="text-sm font-semibold">$</span>
          <span className="text-2xl font-bold tracking-tight">
            {displayPrice}
          </span>
        </div>
        <div className="flex items-center gap-2">
        {dataset.isUserUploaded && !dataset.isMarketplaceOnly ? (
          <button
            type="button"
            onClick={() => {
                const datasetId = encodeURIComponent(dataset.id);
                router.push(`/dashboard/dataset/${datasetId}`);
              }}
              // Prefetch route on hover for instant navigation
              onMouseEnter={() => {
                const url = `/dashboard/dataset/${encodeURIComponent(dataset.id)}`;
                router.prefetch(url);
              }}
              className={styles.actionButton}
            >
              <span className="relative z-10">
                {dataset.actionLabel || "Manage"}
              </span>
            </button>
          ) : (
            <>
            <button
              type="button"
              onClick={async () => {
                setDownloadError(null);
                setIsLoading(true);
                setPaymentRequired(false);
                setPaymentInstructions(null);
                setDownloadUrl(null);
                if (!authenticated) {
                  login();
                  setIsLoading(false);
                  return;
                }
                try {
                  // Get authentication token from Privy
                  const token = await getAccessToken();
                  
                  // Prepare request body with transaction signature if payment was made
                  const requestBody = txHash && publicKey ? {
                    txSignature: txHash,
                    sender: publicKey.toBase58()
                  } : null;

                  const fetchOptions: RequestInit = {
                    method: requestBody ? 'POST' : 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    },
                    body: requestBody ? JSON.stringify(requestBody) : undefined,
                  };

                  console.log("[Download Attempt]", {
                    datasetId: dataset.id,
                    hasTxSignature: !!txHash,
                    txSignature: txHash,
                    sender: publicKey?.toBase58(),
                    hasAuthToken: !!token,
                    timestamp: new Date().toISOString()
                  });

                  const apiUrl = buildApiUrl(`datasets/${encodeURIComponent(dataset.id)}/download`);
                  console.log("[API URL]", apiUrl);

                  // Add timeout to prevent infinite loading
                  const controller = new AbortController();
                  const timeoutId = setTimeout(() => controller.abort(), 30000);

                  const res = await fetch(
                    apiUrl,
                    {
                      ...fetchOptions,
                      signal: controller.signal,
                    }
                  );

                  clearTimeout(timeoutId);

                  if (res.status === 200) {
                    // Check if response is JSON with downloadUrl or actual file blob
                    const contentType = res.headers.get('content-type');
                    
                    if (contentType?.includes('application/json')) {
                      // Backend returned JSON with download URL (current behavior)
                      const jsonData = await res.json();
                      
                      if (jsonData.data?.downloadUrl) {
                        // Direct download URL provided
                        const downloadUrl = jsonData.data.downloadUrl;
                        setDownloadUrl(downloadUrl);
                        setIsLoading(false);
                        
                        console.log("[Download Success - Direct URL]", {
                          datasetId: dataset.id,
                          fileName: jsonData.data.fileName,
                          timestamp: new Date().toISOString()
                        });
                        
                        // Clear payment state after successful download
                        setPaymentRequired(false);
                        setPaymentInstructions(null);
                        setTxHash(null);
                      } else {
                        setDownloadError("Invalid response format from server");
                        setIsLoading(false);
                      }
                    } else {
                      // Payment verified, download ready as blob
                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      setDownloadUrl(url);
                      setIsLoading(false);
                      
                      console.log("[Download Success - Blob]", {
                        datasetId: dataset.id,
                        txSignature: txHash,
                        timestamp: new Date().toISOString()
                      });
                      
                      // Clear payment state after successful download
                      setPaymentRequired(false);
                      setPaymentInstructions(null);
                      setTxHash(null);
                    }
                  } else if (res.status === 402) {
                    // Payment required (x402 flow)
                    const data = await res.json();
                    setPaymentRequired(true);
                    setPaymentInstructions(data.payment);
                    setIsLoading(false);
                    
                    console.log("[Payment Required]", {
                      datasetId: dataset.id,
                      paymentInstructions: data.payment,
                      timestamp: new Date().toISOString()
                    });
                  } else if (res.status === 403) {
                    // Forbidden - Current backend behavior (no license/ownership)
                    // Treat as payment required for now
                    setPaymentRequired(true);
                    // Mock payment instructions until backend implements x402
                    setPaymentInstructions({
                      wallet: "Demo: Backend needs x402 implementation",
                      amount: "5.00",
                      mint: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
                      facilitatorUrl: "Not configured",
                      cdpClientKey: "Not configured"
                    });
                    setIsLoading(false);
                    
                    console.log("[Access Denied - Treating as Payment Required]", {
                      datasetId: dataset.id,
                      note: "Backend returns 403. x402 not implemented yet.",
                      timestamp: new Date().toISOString()
                    });
                  } else if (res.status === 404) {
                    setDownloadError("Dataset not found.");
                    setIsLoading(false);
                  } else {
                    let errorDetails = `Status: ${res.status}`;
                    try {
                      const responseText = await res.text();
                      let errorData;
                      try {
                        errorData = JSON.parse(responseText);
                        console.error("[Backend Error Response]", {
                          status: res.status,
                          statusText: res.statusText,
                          data: errorData,
                          datasetId: dataset.id,
                          timestamp: new Date().toISOString()
                        });
                        errorDetails = errorData.message || errorData.error || JSON.stringify(errorData);
                      } catch {
                        console.error("[Backend Error Response]", {
                          status: res.status,
                          statusText: res.statusText,
                          text: responseText,
                          datasetId: dataset.id,
                          timestamp: new Date().toISOString()
                        });
                        errorDetails = responseText || res.statusText;
                      }
                    } catch (readErr) {
                      console.error("[Backend Error Response - Could not read body]", {
                        status: res.status,
                        statusText: res.statusText,
                        readError: readErr,
                        datasetId: dataset.id,
                        timestamp: new Date().toISOString()
                      });
                      errorDetails = res.statusText;
                    }
                    setDownloadError(`Backend error: ${errorDetails}`);
                    setIsLoading(false);
                  }
                } catch (err: any) {
                  console.error("[Download Error]", {
                    datasetId: dataset.id,
                    error: err.message,
                    name: err.name,
                    timestamp: new Date().toISOString()
                  });
                  
                  if (err.name === 'AbortError') {
                    setDownloadError("Request timeout. Please check your backend connection and try again.");
                  } else {
                    setDownloadError("Network error. Please try again.");
                  }
                  setIsLoading(false);
                }
              }}
              className={styles.actionButton}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  "Loading..."
                ) : !authenticated ? (
                  "Sign In to Purchase"
                ) : !connected ? (
                  <>
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </>
                ) : txHash ? (
                  "Verify Payment & Download"
                ) : (
                  dataset.actionLabel || "Purchase/Download"
                )}
              </span>
            </button>
            {downloadUrl && (
              <a 
                href={downloadUrl} 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
            </>
          )}
            </div>
          </div>
            {/* Inline UI for payment, error, and download status */}
            {paymentRequired && paymentInstructions && (
              <div className="mt-3 p-3 bg-gray-900 border border-yellow-400 rounded text-yellow-200">
                {paymentInstructions.wallet.includes("Demo:") && (
                  <div className="mb-2 p-2 bg-orange-900/30 border border-orange-500 rounded text-orange-400 text-xs">
                    <b>Demo Mode:</b> Backend x402 integration not complete. Payment flow UI ready but backend needs to:
                    <ul className="mt-1 ml-4 list-disc text-xs">
                      <li>Return 402 instead of 403</li>
                      <li>Include real payment instructions</li>
                      <li>Accept POST with txSignature</li>
                    </ul>
                  </div>
                )}
                <div className="font-bold mb-2 flex items-center gap-2 text-sm">
                  <Wallet className="w-4 h-4" />
                  Payment Required
                </div>
                
                <div className="mb-2 text-xs bg-blue-900/20 border border-blue-500/30 rounded p-2">
                  <div className="font-semibold mb-1 text-blue-300">How it works:</div>
                  <ol className="ml-4 list-decimal space-y-0.5 text-xs text-blue-200">
                    <li>Connect your Solana wallet below</li>
                    <li>Click "Send {paymentInstructions.amount} USDC"</li>
                    <li>Approve transaction in your wallet popup</li>
                    <li>We automatically verify payment with backend</li>
                    <li>Dataset unlocks immediately after confirmation</li>
                  </ol>
                </div>

                <div className="text-xs space-y-0.5 mb-2 opacity-70">
                  <div><b>Amount:</b> {paymentInstructions.amount} USDC</div>
                  <div><b>Network:</b> Solana Devnet</div>
                </div>

                {/* API Health Warning */}
                {!apiHealthy && (
                  <div className="mb-2 p-2 bg-red-900/30 border border-red-500 rounded text-red-400 text-xs">
                    Warning: Backend API may be unavailable. Payment verification might fail.
                  </div>
                )}

                {/* Wallet Status */}
                <div className="mb-2 p-2 bg-gray-800 rounded border text-xs">
                  <div className="font-medium mb-1">Wallet Status:</div>
                  {connected ? (
                    <div className="space-y-0.5">
                      <div className="text-green-400">Connected</div>
                      <div>Address: {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-4)}</div>
                      {usdcBalance !== null && (
                        <div>Balance: {usdcBalance.toFixed(2)} USDC</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-orange-400">
                      Wallet not connected - please connect your Solana wallet first
                    </div>
                  )}
                </div>

                {/* Payment Action */}
                {connected ? (
                  <div className="space-y-1.5">
                    <button
                      onClick={handlePayment}
                      disabled={isPaymentProcessing || (usdcBalance !== null && usdcBalance < parseFloat(paymentInstructions.amount))}
                      className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded font-semibold transition-all"
                    >
                      {isPaymentProcessing 
                        ? "Processing Payment..." 
                        : (usdcBalance !== null && usdcBalance < parseFloat(paymentInstructions.amount))
                        ? `Insufficient USDC (need ${paymentInstructions.amount})`
                        : `Send ${paymentInstructions.amount} USDC & Unlock`}
                    </button>
                    <div className="text-xs text-gray-400 text-center">
                      Click once - we handle everything automatically
                    </div>
                    {txHash && (
                      <div className="p-2 bg-green-900/30 border border-green-500 rounded text-green-400 text-xs">
                        <div className="font-bold mb-1">Payment Confirmed</div>
                        <div className="mb-1">TX: {txHash.slice(0, 8)}...{txHash.slice(-4)}</div>
                        <div className="text-green-300">Payment verified. Click "Verify Payment & Download" above to access your dataset.</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-3 bg-orange-900/20 border border-orange-500 rounded">
                    <div className="text-sm text-orange-400 mb-1">
                      Connect your Solana wallet to continue
                    </div>
                    <div className="text-xs text-orange-300">
                      We'll automatically handle the payment transaction
                    </div>
                  </div>
                )}

                <div className="mt-2 text-xs text-gray-400 border-t border-gray-700 pt-2">
                  <b>Secure:</b> Your wallet stays in your control. We only request transaction approval.
                </div>
              </div>
            )}
            {downloadError && (
              <div className="mt-2 p-2 bg-red-900/20 border border-red-500 rounded text-red-400 text-xs">
                {downloadError}
              </div>
            )}
        </div>
        </div>
    </div>
  );
};

// Export with React.memo with optimized comparison to prevent unnecessary re-renders
export default React.memo(DatasetCard, (prevProps, nextProps) => {
  const prevDataset = prevProps.dataset;
  const nextDataset = nextProps.dataset;
  if (prevDataset.id !== nextDataset.id) return false;
  return (
    prevDataset.title === nextDataset.title &&
    prevDataset.status === nextDataset.status &&
    prevDataset.isUserUploaded === nextDataset.isUserUploaded &&
    prevDataset.isMarketplaceOnly === nextDataset.isMarketplaceOnly &&
    prevDataset.verificationScore === nextDataset.verificationScore
  );
});
