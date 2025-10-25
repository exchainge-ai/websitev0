import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),

  // Configure turbopack aliases for the standalone app
  turbopack: {
    resolveAlias: {
      "@/*": "./src/*",
    },
  },

  // Improve build performance
  distDir: process.env.BUILD_DIR || ".next",

  // Optimize build-time performance
  eslint: {
    // Only run ESLint on specific files when building for production
    dirs: ["src"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },

          // Performance headers
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Separate rule for static assets with longer cache times
      {
        source: "/(.*).(jpe?g|png|gif|svg|webp|avif|mp4|webm|woff2?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Performance optimizations
  // Next.js 15+ uses swcMinify by default, no need to specify it

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Cache aggressive response headers for static assets
  async rewrites() {
    return {
      beforeFiles: [
        // Add any rewrites here if needed
      ],
      afterFiles: [
        // Add any rewrites here if needed
      ],
      fallback: [],
    };
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Improve development server performance
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 300 * 1000, // 5 minutes - much longer to reduce recompiles
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 12, // Increased for better stability
  },

  // Improve stability of development server
  devIndicators: {
    position: "bottom-right",
  },

  // Configure webpack for better HMR stability in monorepo
  webpack: (config, { dev, isServer }) => {
    // Performance optimizations for both dev and production
    if (!isServer) {
      // Enable SWC minification which is faster than Terser
      config.optimization = {
        ...config.optimization,
        minimize: !dev,
        moduleIds: "deterministic",
        // Split chunks for better caching
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            // Create a separate chunk for react components
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name: "react",
              chunks: "all",
              priority: 40,
            },
            // Group privy components together
            privy: {
              test: /[\\/]node_modules[\\/]@privy-io[\\/]/,
              name: "privy",
              chunks: "all",
              priority: 30,
            },
            // Group other large dependencies
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "commons",
              chunks: "all",
              priority: 20,
            },
          },
        },
        runtimeChunk: {
          name: "runtime",
        },
      };
    }

    const solanaKitEntry = isServer
      ? path.resolve(__dirname, "node_modules/@solana/kit/dist/index.node.cjs")
      : path.resolve(__dirname, "node_modules/@solana/kit/dist/index.browser.mjs");

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@solana/kit": solanaKitEntry,
    };

    if (dev && !isServer) {
      // Optimize HMR for client-side in development with more stability
      config.watchOptions = {
        ...config.watchOptions,
        poll: 500, // Reduced polling interval for better stability
        aggregateTimeout: 800, // Further increased to reduce temporary file collisions
        ignored: [
          "**/node_modules/**",
          "**/.next/**",
          "**/dist/**",
          "**/coverage/**",
          "**/.git/**",
          "**/.turbo/**",
          "**/_buildManifest.js.tmp*", // Ignore temp files that cause errors
        ],
      };

      // Improve module resolution for HMR
      config.resolve.symlinks = false;

      // Add better stability for file operations
      if (config.experiments) {
        config.experiments = {
          ...config.experiments,
          backCompat: true, // Better backward compatibility
        };
      }

      // Suppress React key warnings from third-party libraries during development
      const DefinePlugin = config.plugins.find(
        (plugin: any) => plugin.constructor.name === "DefinePlugin",
      );
      if (DefinePlugin) {
        DefinePlugin.definitions = {
          ...DefinePlugin.definitions,
          __SUPPRESS_PRIVY_WARNINGS__: JSON.stringify(true),
        };
      }
    }
    return config;
  },
};

export default nextConfig;
