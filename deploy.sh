#!/bin/bash

# cPanel Deployment Script
# This script builds the project and prepares it for cPanel deployment

echo "🚀 Starting build process..."

# Install dependencies
npm ci

# Build the project
npm run build

echo "✅ Build completed successfully!"
echo "📦 Production files are in the 'dist' folder"
echo ""
echo "Next steps for cPanel deployment:"
echo "1. Go to your cPanel Git Version Control"
echo "2. Create deployment and point to this repository"
echo "3. The .cpanel.yml file will automatically deploy to public_html"
