#!/bin/bash
# PDF to Word Converter - One-Click Setup and Start Script
# This will install dependencies and start the backend server

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

clear
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     PDF to Word Converter - Backend Setup & Start           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if Homebrew is installed
echo "1️⃣  Checking Homebrew..."
if command -v brew &> /dev/null; then
    echo -e "${GREEN}✅ Homebrew is installed${NC}"
else
    echo -e "${RED}❌ Homebrew not found${NC}"
    echo "Install Homebrew from: https://brew.sh"
    exit 1
fi
echo ""

# Check/Install Java
echo "2️⃣  Checking Java..."
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -1)
    echo -e "${GREEN}✅ Java is installed: $JAVA_VERSION${NC}"
else
    echo -e "${YELLOW}⚠️  Java not found. Installing...${NC}"
    echo "This may take a few minutes..."
    brew install openjdk@17
    
    # Add to PATH
    echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
    export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
    
    echo -e "${GREEN}✅ Java installed successfully${NC}"
fi
echo ""

# Check/Install Maven
echo "3️⃣  Checking Maven..."
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn --version | head -1)
    echo -e "${GREEN}✅ Maven is installed: $MVN_VERSION${NC}"
else
    echo -e "${YELLOW}⚠️  Maven not found. Installing...${NC}"
    brew install maven
    echo -e "${GREEN}✅ Maven installed successfully${NC}"
fi
echo ""

# Navigate to server directory
echo "4️⃣  Navigating to server directory..."
SERVER_DIR="/Users/millionairemindset/JustPDF/server"
if [ -d "$SERVER_DIR" ]; then
    cd "$SERVER_DIR"
    echo -e "${GREEN}✅ Found server directory${NC}"
else
    echo -e "${RED}❌ Server directory not found: $SERVER_DIR${NC}"
    exit 1
fi
echo ""

# Check if server is already running
echo "5️⃣  Checking if server is already running..."
if curl -s http://localhost:8080/api/convert/health &> /dev/null; then
    echo -e "${YELLOW}⚠️  Server is already running!${NC}"
    echo ""
    echo "Server Status:"
    curl -s http://localhost:8080/api/convert/health | python3 -m json.tool 2>/dev/null || echo "Server is running but health check failed"
    echo ""
    echo "You can now use the PDF to Word converter!"
    echo "Open: file:///Users/millionairemindset/JustPDF/tools/pdf-to-word.html"
    exit 0
fi
echo -e "${BLUE}ℹ️  Server is not running. Will start it now...${NC}"
echo ""

# Build the project (first time only - check if target exists)
if [ ! -d "target" ]; then
    echo "6️⃣  Building project (first time setup)..."
    echo -e "${YELLOW}This may take 3-5 minutes to download dependencies...${NC}"
    mvn clean install
    echo -e "${GREEN}✅ Build successful${NC}"
    echo ""
else
    echo "6️⃣  Project already built, skipping..."
    echo ""
fi

# Start the server
echo "7️⃣  Starting backend server..."
echo -e "${YELLOW}Server will start in background...${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Starting Spring Boot application...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start server in background and save PID
nohup mvn spring-boot:run > /tmp/justpdf-server.log 2>&1 &
SERVER_PID=$!

echo "Server PID: $SERVER_PID"
echo "Log file: /tmp/justpdf-server.log"
echo ""
echo "Waiting for server to start (this may take 30-60 seconds)..."

# Wait for server to be ready
MAX_WAIT=60
COUNTER=0
while [ $COUNTER -lt $MAX_WAIT ]; do
    if curl -s http://localhost:8080/api/convert/health &> /dev/null; then
        echo ""
        echo -e "${GREEN}✅ Server started successfully!${NC}"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo -e "${GREEN}🎉 PDF to Word Converter Backend is READY!${NC}"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "Health Check:"
        curl -s http://localhost:8080/api/convert/health | python3 -m json.tool 2>/dev/null || curl -s http://localhost:8080/api/convert/health
        echo ""
        echo ""
        echo "📋 Next Steps:"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "1. Open the frontend in your browser:"
        echo "   file:///Users/millionairemindset/JustPDF/tools/pdf-to-word.html"
        echo ""
        echo "2. Upload a PDF file and click 'Convert to Word'"
        echo ""
        echo "3. Your conversion should complete successfully! ✅"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "📝 Server Management:"
        echo "  • View logs:  tail -f /tmp/justpdf-server.log"
        echo "  • Stop server: kill $SERVER_PID"
        echo "  • Server PID: $SERVER_PID (saved to /tmp/justpdf-server.pid)"
        echo ""
        echo "  To stop the server later, run:"
        echo "  kill \$(cat /tmp/justpdf-server.pid)"
        echo ""
        
        # Save PID for later
        echo $SERVER_PID > /tmp/justpdf-server.pid
        
        exit 0
    fi
    
    echo -n "."
    sleep 2
    COUNTER=$((COUNTER + 2))
done

# Server didn't start in time
echo ""
echo -e "${RED}❌ Server failed to start within $MAX_WAIT seconds${NC}"
echo ""
echo "Check the logs for errors:"
echo "  tail -50 /tmp/justpdf-server.log"
echo ""
echo "Common issues:"
echo "  • Port 8080 already in use: lsof -i :8080"
echo "  • Missing dependencies: mvn clean install"
echo "  • Java version incompatible: java -version (need 17+)"
echo ""

exit 1
