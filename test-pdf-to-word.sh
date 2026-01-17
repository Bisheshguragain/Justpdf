#!/bin/bash
# PDF to Word Converter - Quick Test Script
# Run this to test if everything is working

echo "🔍 PDF to Word Converter - System Check"
echo "========================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server directory exists
echo "1️⃣  Checking server directory..."
if [ -d "/Users/millionairemindset/JustPDF/server" ]; then
    echo -e "${GREEN}✅ Server directory found${NC}"
else
    echo -e "${RED}❌ Server directory not found${NC}"
    exit 1
fi

# Check if pom.xml exists
echo ""
echo "2️⃣  Checking Maven configuration..."
if [ -f "/Users/millionairemindset/JustPDF/server/pom.xml" ]; then
    echo -e "${GREEN}✅ pom.xml found${NC}"
else
    echo -e "${RED}❌ pom.xml not found${NC}"
    exit 1
fi

# Check if backend is running
echo ""
echo "3️⃣  Checking if backend server is running..."
HEALTH_CHECK=$(curl -s http://localhost:8080/api/convert/health 2>/dev/null)
if [ -n "$HEALTH_CHECK" ]; then
    echo -e "${GREEN}✅ Backend server is running${NC}"
    echo "   Response: $HEALTH_CHECK"
else
    echo -e "${YELLOW}⚠️  Backend server is NOT running${NC}"
    echo ""
    echo "To start the server, run:"
    echo "  cd /Users/millionairemindset/JustPDF/server"
    echo "  mvn spring-boot:run"
    echo ""
    read -p "Do you want to start the server now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Starting server..."
        cd /Users/millionairemindset/JustPDF/server
        mvn spring-boot:run &
        SERVER_PID=$!
        echo "Server starting with PID: $SERVER_PID"
        echo "Waiting 15 seconds for server to initialize..."
        sleep 15
        
        # Check again
        HEALTH_CHECK=$(curl -s http://localhost:8080/api/convert/health 2>/dev/null)
        if [ -n "$HEALTH_CHECK" ]; then
            echo -e "${GREEN}✅ Server started successfully!${NC}"
            echo "   Response: $HEALTH_CHECK"
        else
            echo -e "${RED}❌ Server failed to start. Check logs.${NC}"
            exit 1
        fi
    else
        echo "Server not started. Exiting."
        exit 0
    fi
fi

# Check if frontend file exists
echo ""
echo "4️⃣  Checking frontend file..."
if [ -f "/Users/millionairemindset/JustPDF/tools/pdf-to-word.html" ]; then
    echo -e "${GREEN}✅ Frontend file found${NC}"
    
    # Check if AdSense IDs are still placeholders
    if grep -q "ca-pub-xxxxxxxxxxxxxxxx" "/Users/millionairemindset/JustPDF/tools/pdf-to-word.html"; then
        echo -e "${YELLOW}⚠️  AdSense IDs are still placeholders${NC}"
        echo "   Remember to replace before production deployment!"
    else
        echo -e "${GREEN}✅ AdSense IDs have been updated${NC}"
    fi
else
    echo -e "${RED}❌ Frontend file not found${NC}"
    exit 1
fi

# Test with a sample PDF if one exists
echo ""
echo "5️⃣  Looking for test PDF..."
TEST_PDF=$(find /Users/millionairemindset/JustPDF -name "*.pdf" -type f | head -1)
if [ -n "$TEST_PDF" ]; then
    echo -e "${GREEN}✅ Found test PDF: $TEST_PDF${NC}"
    echo ""
    read -p "Do you want to test conversion with this file? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Testing conversion..."
        OUTPUT_FILE="/tmp/test-output-$(date +%s).docx"
        HTTP_CODE=$(curl -s -o "$OUTPUT_FILE" -w "%{http_code}" \
            -X POST http://localhost:8080/api/convert/pdf-to-word \
            -F "file=@$TEST_PDF" 2>/dev/null)
        
        if [ "$HTTP_CODE" = "200" ]; then
            echo -e "${GREEN}✅ Conversion successful!${NC}"
            echo "   Output saved to: $OUTPUT_FILE"
            echo "   File size: $(ls -lh "$OUTPUT_FILE" | awk '{print $5}')"
            echo ""
            read -p "Open the converted file? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                open "$OUTPUT_FILE"
            fi
        else
            echo -e "${RED}❌ Conversion failed (HTTP $HTTP_CODE)${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠️  No test PDF found${NC}"
    echo "   Create a sample PDF to test conversion"
fi

# Summary
echo ""
echo "========================================"
echo "📊 System Check Complete"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. If backend is running: ✅"
echo "2. Open frontend: file:///Users/millionairemindset/JustPDF/tools/pdf-to-word.html"
echo "3. Test conversion with a PDF file"
echo "4. Before production:"
echo "   - Replace AdSense IDs"
echo "   - Update API endpoint URL"
echo "   - Deploy backend to production"
echo ""
echo "For detailed instructions, see:"
echo "  - PDF-TO-WORD-LAUNCH-CHECKLIST.md"
echo "  - PDF-TO-WORD-AUDIT-COMPLETE.md"
echo ""
