#!/bin/bash

# 🚀 One-Command Fix for Protect PDF Tool
# This script will deploy your backend and fix the issue

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🔧 Fixing Protect PDF Tool"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_green() { echo -e "${GREEN}✅ $1${NC}"; }
print_blue() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_yellow() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_red() { echo -e "${RED}❌ $1${NC}"; }

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    print_yellow "Railway CLI not found. Installing..."
    npm install -g @railway/cli
    print_green "Railway CLI installed!"
else
    print_green "Railway CLI found"
fi

echo ""
print_blue "Step 1/4: Deploying Backend to Railway..."
echo ""

# Navigate to server directory
cd server

# Login to Railway
print_yellow "Please login to Railway in your browser..."
railway login

# Initialize if needed
if [ ! -f "railway.toml" ]; then
    print_blue "Initializing Railway project..."
    railway init
fi

# Deploy
print_blue "Deploying backend (this may take 2-3 minutes)..."
railway up

echo ""
print_green "Backend deployed!"
echo ""

# Get the Railway URL
print_blue "Step 2/4: Getting your API URL..."
RAILWAY_URL=$(railway domain 2>&1 | grep -oE 'https://[^ ]+' | head -1)

if [ -z "$RAILWAY_URL" ]; then
    print_yellow "Couldn't automatically detect URL. Getting it manually..."
    railway domain
    echo ""
    read -p "Please paste your Railway URL here: " RAILWAY_URL
fi

echo ""
print_green "Your API URL: $RAILWAY_URL"
echo ""

# Navigate back to project root
cd ..

# Update protect-pdf.html
print_blue "Step 3/4: Updating protect-pdf.html..."

# Backup original file
cp tools/protect-pdf.html tools/protect-pdf.html.backup

# Replace localhost with Railway URL
sed -i.bak "s|const API_URL = 'http://localhost:8080';|const API_URL = '$RAILWAY_URL';|g" tools/protect-pdf.html
rm tools/protect-pdf.html.bak

print_green "API URL updated in protect-pdf.html"

# Test the API
print_blue "Step 4/4: Testing API connection..."
echo ""

if curl -s --head "$RAILWAY_URL/api/protect-pdf" | head -n 1 | grep "HTTP" > /dev/null; then
    print_green "API is responding!"
else
    print_yellow "API might still be starting up (give it 30 seconds)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_green "  🎉 Fix Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Your backend is now running at:"
echo "  $RAILWAY_URL"
echo ""
echo "Next steps:"
echo "  1. Open tools/protect-pdf.html in your browser"
echo "  2. Try protecting a PDF again"
echo "  3. It should work now! ✅"
echo ""
print_yellow "📝 Note: Your original file was backed up to:"
echo "     tools/protect-pdf.html.backup"
echo ""
print_blue "To deploy your frontend to Vercel, run:"
echo "  vercel --prod"
echo ""
