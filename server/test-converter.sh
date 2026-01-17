#!/bin/bash

# JustPDF Converter - Test Script
# Tests the PDF to Word conversion API

set -e

echo "🧪 JustPDF Converter - Test Suite"
echo "=================================="
echo ""

# Configuration
API_URL="${API_URL:-http://localhost:8080}"
TEST_DIR="test-files"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create test directory
mkdir -p "$TEST_DIR"

# Function to check if server is running
check_server() {
    echo "📡 Checking server status..."
    if curl -s "$API_URL/api/convert/health" > /dev/null; then
        echo -e "${GREEN}✓ Server is running${NC}"
        return 0
    else
        echo -e "${RED}✗ Server is not running at $API_URL${NC}"
        echo "Start the server with: mvn spring-boot:run"
        exit 1
    fi
}

# Function to create test PDF
create_test_pdf() {
    echo ""
    echo "📄 Creating test PDF..."
    
    # Create a simple test PDF using echo and ps2pdf (if available)
    if command -v ps2pdf &> /dev/null; then
        cat > "$TEST_DIR/test.ps" << 'EOF'
%!PS-Adobe-3.0
/Helvetica findfont 20 scalefont setfont
50 750 moveto
(This is a test PDF document) show
50 700 moveto
(Created for PDF to Word conversion testing) show
showpage
EOF
        ps2pdf "$TEST_DIR/test.ps" "$TEST_DIR/test.pdf" 2>/dev/null
        rm "$TEST_DIR/test.ps"
        echo -e "${GREEN}✓ Test PDF created${NC}"
    else
        echo -e "${YELLOW}⚠ ps2pdf not available. Please provide a test PDF manually.${NC}"
        echo "Place a PDF file at: $TEST_DIR/test.pdf"
        read -p "Press Enter when ready..."
    fi
}

# Function to test conversion
test_conversion() {
    local test_file="$1"
    local test_name="$2"
    
    echo ""
    echo "🔄 Testing: $test_name"
    echo "   File: $test_file"
    
    if [ ! -f "$test_file" ]; then
        echo -e "${YELLOW}⚠ Test file not found: $test_file${NC}"
        return 1
    fi
    
    # Get file size
    local file_size=$(ls -lh "$test_file" | awk '{print $5}')
    echo "   Size: $file_size"
    
    # Perform conversion
    local output_file="$TEST_DIR/$(basename "${test_file%.pdf}").docx"
    
    echo "   Converting..."
    if curl -s -X POST "$API_URL/api/convert/pdf-to-word" \
         -F "file=@$test_file" \
         -o "$output_file" \
         -w "%{http_code}" | grep -q "200"; then
        
        if [ -f "$output_file" ] && [ -s "$output_file" ]; then
            local output_size=$(ls -lh "$output_file" | awk '{print $5}')
            echo -e "${GREEN}✓ Conversion successful${NC}"
            echo "   Output: $output_file ($output_size)"
            return 0
        else
            echo -e "${RED}✗ Conversion failed - empty output${NC}"
            return 1
        fi
    else
        echo -e "${RED}✗ Conversion failed - API error${NC}"
        if [ -f "$output_file" ]; then
            cat "$output_file"
        fi
        return 1
    fi
}

# Function to test invalid inputs
test_invalid_inputs() {
    echo ""
    echo "🚫 Testing invalid inputs..."
    
    # Test 1: No file
    echo "   Test: No file uploaded"
    response=$(curl -s -X POST "$API_URL/api/convert/pdf-to-word" -w "%{http_code}")
    if echo "$response" | grep -q "400"; then
        echo -e "   ${GREEN}✓ Correctly rejected${NC}"
    else
        echo -e "   ${RED}✗ Should have rejected${NC}"
    fi
    
    # Test 2: Wrong file type
    echo "   Test: Wrong file type (txt)"
    echo "test" > "$TEST_DIR/test.txt"
    response=$(curl -s -X POST "$API_URL/api/convert/pdf-to-word" \
        -F "file=@$TEST_DIR/test.txt" -w "%{http_code}")
    if echo "$response" | grep -q "400"; then
        echo -e "   ${GREEN}✓ Correctly rejected${NC}"
    else
        echo -e "   ${RED}✗ Should have rejected${NC}"
    fi
    rm "$TEST_DIR/test.txt"
}

# Function to test performance
test_performance() {
    local test_file="$1"
    
    if [ ! -f "$test_file" ]; then
        echo -e "${YELLOW}⚠ Performance test skipped - no test file${NC}"
        return
    fi
    
    echo ""
    echo "⚡ Performance test..."
    echo "   Converting 3 times and measuring average time..."
    
    local total_time=0
    for i in {1..3}; do
        echo -n "   Attempt $i: "
        start_time=$(date +%s)
        
        curl -s -X POST "$API_URL/api/convert/pdf-to-word" \
             -F "file=@$test_file" \
             -o "$TEST_DIR/perf-test.docx" > /dev/null
        
        end_time=$(date +%s)
        elapsed=$((end_time - start_time))
        total_time=$((total_time + elapsed))
        echo "${elapsed}s"
    done
    
    average=$((total_time / 3))
    echo -e "   ${GREEN}Average time: ${average}s${NC}"
    rm -f "$TEST_DIR/perf-test.docx"
}

# Main test execution
main() {
    echo "Starting tests at $(date)"
    echo ""
    
    # Check server
    check_server
    
    # Create test PDF
    create_test_pdf
    
    # Run conversion tests
    if [ -f "$TEST_DIR/test.pdf" ]; then
        test_conversion "$TEST_DIR/test.pdf" "Basic PDF conversion"
    fi
    
    # Test invalid inputs
    test_invalid_inputs
    
    # Performance test
    if [ -f "$TEST_DIR/test.pdf" ]; then
        test_performance "$TEST_DIR/test.pdf"
    fi
    
    # Summary
    echo ""
    echo "=================================="
    echo -e "${GREEN}✅ Test suite completed!${NC}"
    echo ""
    echo "Test files location: $TEST_DIR/"
    echo "Review converted DOCX files and verify quality."
    echo ""
}

# Run tests
main
