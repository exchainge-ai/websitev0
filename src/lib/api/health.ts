import { getApiBaseUrl } from "./client";

export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp?: string;
  version?: string;
  services?: {
    database?: boolean;
    solana?: boolean;
    x402?: boolean;
  };
}

/**
 * Checks if the backend API is healthy and accessible
 * @returns Health check response or null if failed
 */
export async function checkApiHealth(): Promise<HealthCheckResponse | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add timeout
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`[Health Check] API returned ${response.status}`);
      return null;
    }

    const data: HealthCheckResponse = await response.json();
    console.log("[Health Check] API is healthy:", data);
    return data;
  } catch (error) {
    console.error("[Health Check] Failed to connect to API:", error);
    return null;
  }
}

/**
 * Validates CORS configuration by making a preflight request
 * @returns true if CORS is properly configured
 */
export async function validateCors(): Promise<boolean> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/health`, {
      method: "OPTIONS",
      headers: {
        "Origin": window.location.origin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
      },
    });

    const hasCorsHeaders =
      response.headers.has("access-control-allow-origin") ||
      response.headers.has("Access-Control-Allow-Origin");

    if (hasCorsHeaders) {
      console.log("[CORS] Validation successful");
      return true;
    } else {
      console.warn("[CORS] No CORS headers found in response");
      return false;
    }
  } catch (error) {
    console.error("[CORS] Validation failed:", error);
    return false;
  }
}

/**
 * Performs comprehensive API connectivity check
 * @returns Object with health and CORS status
 */
export async function checkApiConnectivity(): Promise<{
  healthy: boolean;
  corsEnabled: boolean;
  healthData: HealthCheckResponse | null;
}> {
  const [healthData, corsEnabled] = await Promise.all([
    checkApiHealth(),
    validateCors(),
  ]);

  return {
    healthy: healthData !== null && healthData.status === "ok",
    corsEnabled,
    healthData,
  };
}
