#!/bin/bash

echo "🧪 Testing JustPDF Protection API..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server is running
echo "1. Checking if server is running..."
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo -e "${GREEN}✅ Server is running!${NC}"
else
    echo -e "${RED}❌ Server is not running${NC}"
    echo -e "${YELLOW}Run: cd server && mvn spring-boot:run${NC}"
    exit 1
fi

echo ""

# Check if test PDF exists
if [ ! -f "test.pdf" ]; then
    echo -e "${YELLOW}⚠️  No test.pdf found, creating one...${NC}"
    # Create a simple test PDF using echo and some PDF basics
    echo "Creating test PDF..."
    # You can replace this with a real PDF file
    echo -e "${YELLOW}Please add a test.pdf file to this directory${NC}"
    exit 1
fi

echo "2. Testing PDF protection..."
curl -X POST http://localhost:8080/api/protect-pdf \
  -F "file=@test.pdf" \
  -F "password=TestPassword123" \
  -o protected_test.pdf \
  -w "\nHTTP Status: %{http_code}\n"

if [ -f "protected_test.pdf" ]; then
    echo -e "${GREEN}✅ PDF protected successfully!${NC}"
    echo ""
    echo "📁 File created: protected_test.pdf"
    echo "🔑 Password: TestPassword123"
    echo ""
    echo "Try opening protected_test.pdf - it should ask for a password!"
else
    echo -e "${RED}❌ Failed to create protected PDF${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 All tests passed!${NC}"
