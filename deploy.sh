#!/bin/bash

# 🚀 JustPDF Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 JustPDF Deployment Assistant"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored text
print_green() { echo -e "${GREEN}✅ $1${NC}"; }
print_blue() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_yellow() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_red() { echo -e "${RED}❌ $1${NC}"; }

# Check if Railway CLI is installed
check_railway() {
    if command -v railway &> /dev/null; then
        print_green "Railway CLI found"
        return 0
    else
        print_yellow "Railway CLI not found"
        return 1
    fi
}

# Check if Vercel CLI is installed
check_vercel() {
    if command -v vercel &> /dev/null; then
        print_green "Vercel CLI found"
        return 0
    else
        print_yellow "Vercel CLI not found"
        return 1
    fi
}

# Install Railway CLI
install_railway() {
    print_blue "Installing Railway CLI..."
    npm install -g @railway/cli
    print_green "Railway CLI installed"
}

# Install Vercel CLI
install_vercel() {
    print_blue "Installing Vercel CLI..."
    npm install -g vercel
    print_green "Vercel CLI installed"
}

# Main menu
echo "What would you like to do?"
echo ""
echo "1) 🚂 Deploy Backend to Railway"
echo "2) ▲  Deploy Frontend to Vercel"
echo "3) 🔄 Deploy Both (Full Setup)"
echo "4) 🧪 Test Backend Locally"
echo "5) ❌ Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "  🚂 Backend Deployment (Railway)"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        # Check Railway CLI
        if ! check_railway; then
            read -p "Install Railway CLI? (y/n): " install_rail
            if [ "$install_rail" = "y" ]; then
                install_railway
            else
                print_red "Railway CLI required. Exiting."
                exit 1
            fi
        fi
        
        # Navigate to server directory
        cd server
        print_blue "Navigating to server directory..."
        
        # Login to Railway
        print_blue "Please login to Railway..."
        railway login
        
        # Initialize or link project
        if [ ! -f "railway.toml" ]; then
            print_blue "Initializing Railway project..."
            railway init
        else
            print_blue "Railway project already initialized"
        fi
        
        # Deploy
        print_blue "Deploying to Railway..."
        railway up
        
        # Get domain
        echo ""
        print_green "Backend deployed!"
        echo ""
        print_blue "Your API URL:"
        railway domain
        
        echo ""
        print_yellow "📝 Next Steps:"
        echo "1. Copy the URL above"
        echo "2. Open tools/protect-pdf.html"
        echo "3. Replace 'http://localhost:8080' with your Railway URL"
        echo "4. Run this script again and choose option 2 to deploy frontend"
        ;;
        
    2)
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "  ▲ Frontend Deployment (Vercel)"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        # Check Vercel CLI
        if ! check_vercel; then
            read -p "Install Vercel CLI? (y/n): " install_ver
            if [ "$install_ver" = "y" ]; then
                install_vercel
            else
                print_red "Vercel CLI required. Exiting."
                exit 1
            fi
        fi
        
        # Check if API URL is updated
        if grep -q "localhost:8080" tools/protect-pdf.html; then
            print_yellow "WARNING: protect-pdf.html still uses localhost:8080"
            read -p "Have you updated the API URL? (y/n): " api_updated
            if [ "$api_updated" != "y" ]; then
                print_red "Please update the API URL first!"
                echo ""
                echo "1. Open tools/protect-pdf.html"
                echo "2. Find: const API_URL = 'http://localhost:8080'"
                echo "3. Replace with your Railway URL"
                exit 1
            fi
        else
            print_green "API URL appears to be updated"
        fi
        
        # Login to Vercel
        print_blue "Please login to Vercel..."
        vercel login
        
        # Deploy to production
        print_blue "Deploying to Vercel..."
        vercel --prod
        
        echo ""
        print_green "Frontend deployed!"
        echo ""
        print_yellow "📝 Next Steps:"
        echo "1. Visit your Vercel URL (shown above)"
        echo "2. Test the Protect PDF tool"
        echo "3. Upload a PDF and try to protect it"
        ;;
        
    3)
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "  🔄 Full Deployment (Backend + Frontend)"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        print_yellow "This will deploy both backend and frontend"
        read -p "Continue? (y/n): " continue_full
        
        if [ "$continue_full" != "y" ]; then
            print_blue "Deployment cancelled"
            exit 0
        fi
        
        # Check CLIs
        if ! check_railway; then
            install_railway
        fi
        
        if ! check_vercel; then
            install_vercel
        fi
        
        # Deploy Backend
        echo ""
        print_blue "Step 1/3: Deploying Backend..."
        cd server
        railway login
        
        if [ ! -f "railway.toml" ]; then
            railway init
        fi
        
        railway up
        
        # Get Railway URL
        RAILWAY_URL=$(railway domain | grep -oE 'https://[^ ]+')
        print_green "Backend deployed to: $RAILWAY_URL"
        
        # Update frontend
        echo ""
        print_blue "Step 2/3: Updating Frontend API URL..."
        cd ..
        
        # Backup original file
        cp tools/protect-pdf.html tools/protect-pdf.html.backup
        
        # Update API URL
        sed -i.bak "s|http://localhost:8080|$RAILWAY_URL|g" tools/protect-pdf.html
        rm tools/protect-pdf.html.bak
        
        print_green "API URL updated in protect-pdf.html"
        
        # Deploy Frontend
        echo ""
        print_blue "Step 3/3: Deploying Frontend to Vercel..."
        vercel login
        vercel --prod
        
        echo ""
        print_green "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        print_green "  🎉 Deployment Complete!"
        print_green "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "Backend:  $RAILWAY_URL"
        echo "Frontend: (check Vercel output above)"
        echo ""
        print_yellow "📋 Next Steps:"
        echo "1. Visit your Vercel URL"
        echo "2. Go to /tools/protect-pdf.html"
        echo "3. Test PDF protection"
        ;;
        
    4)
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "  🧪 Test Backend Locally"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        cd server
        
        # Check if Maven is installed
        if ! command -v mvn &> /dev/null; then
            print_red "Maven not found!"
            echo "Please install Maven:"
            echo "  brew install maven  (on macOS)"
            exit 1
        fi
        
        print_blue "Starting Spring Boot server..."
        print_yellow "Server will run on http://localhost:8080"
        print_yellow "Press Ctrl+C to stop"
        echo ""
        
        mvn spring-boot:run
        ;;
        
    5)
        print_blue "Goodbye! 👋"
        exit 0
        ;;
        
    *)
        print_red "Invalid choice. Please run the script again."
        exit 1
        ;;
esac
