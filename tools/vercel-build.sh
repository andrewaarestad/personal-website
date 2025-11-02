#!/bin/bash

# Vercel Build Script with Database Migration Error Handling
# This script attempts to run database migrations but continues the build
# even if migrations fail (useful when the database is not yet provisioned)

set -e  # Exit on error (except where we explicitly handle errors)

echo "==============================================="
echo "Starting Vercel Build Process"
echo "==============================================="

# Step 1: Attempt database migration
echo ""
echo "Step 1: Running database migrations..."
echo "-----------------------------------------------"

# Temporarily disable exit-on-error for migration
set +e
pnpm --filter @personal-website/db-client db:migrate:deploy
MIGRATION_EXIT_CODE=$?
set -e

if [ $MIGRATION_EXIT_CODE -ne 0 ]; then
  echo ""
  echo "⚠️  WARNING: Database migration failed!"
  echo "⚠️  This is expected if the database is not yet provisioned."
  echo "⚠️  Continuing with build process..."
  echo ""
else
  echo "✓ Database migrations completed successfully"
  echo ""
fi

# Step 2: Build the website
echo "Step 2: Building website..."
echo "-----------------------------------------------"
pnpm build --filter @personal-website/website

echo ""
echo "==============================================="
echo "✓ Build process completed successfully"
echo "==============================================="
