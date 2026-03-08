#!/bin/bash
# RL Conseil — Ploi Deployment Script
# Coller ce script dans Ploi > Site > Deploy Script

set -e

echo "🚀 Deploying RL Conseil..."

# Navigate to project directory
cd /home/ploi/rlconseil.net

# Pull latest code
git pull origin main

# Install dependencies
npm ci --production=false

# Build the static export
npm run build

# The static output is in the 'out/' directory
# Configure Ploi's web root to: /home/ploi/rlconseil.net/out

echo "✅ Deployment complete!"
echo "📁 Static files in: /home/ploi/rlconseil.net/out"
