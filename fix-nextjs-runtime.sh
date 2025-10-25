#!/bin/bash
# Fix Next.js runtime errors and dependency issues

set -e

# Clean build artifacts and caches
echo "Cleaning build artifacts and caches..."
rm -rf node_modules .next package-lock.json bun.lockb
npm cache clean --force

# Install dependencies with legacy peer deps
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Add pageExtensions to next.config.ts if missing
echo "Ensuring pageExtensions in next.config.ts..."
if ! grep -q 'pageExtensions:' next.config.ts; then
  sed -i.bak '/outputFileTracingRoot:/a \
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],' next.config.ts
  echo "Added pageExtensions to next.config.ts"
else
  echo "pageExtensions already present in next.config.ts"
fi

# Build the project
echo "Building project..."
npm run build

echo "Done! You can now run: npm run dev"
