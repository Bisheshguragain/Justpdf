# JustPDF Converter Service - Quick Start

## 🚀 Quick Start

### 1. Build the Project

```bash
cd server
mvn clean install
```

### 2. Run Locally

```bash
mvn spring-boot:run
```

Server will start on `http://localhost:8080`

### 3. Test the API

**Health Check:**
```bash
curl http://localhost:8080/api/convert/health
```

**Convert PDF to Word:**
```bash
curl -X POST http://localhost:8080/api/convert/pdf-to-word \
  -F "file=@sample.pdf" \
  -o output.docx
```

## 📡 API Endpoints

### PDF to Word Conversion
- **URL:** `POST /api/convert/pdf-to-word`
- **Content-Type:** `multipart/form-data`
- **Parameter:** `file` (PDF file, max 50MB)
- **Response:** DOCX file (binary)

### Health Check
- **URL:** `GET /api/convert/health`
- **Response:** JSON status

## 🔧 Configuration

Edit `src/main/resources/application.properties`:

```properties
# Change server port
server.port=8080

# Adjust file size limits
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB

# Configure conversion settings
converter.max-pages=500
converter.timeout-seconds=300
```

## 📦 Dependencies

Key libraries:
- **Spring Boot 3.2.1** - REST API framework
- **Apache PDFBox 2.0.30** - PDF parsing
- **docx4j 11.4.9** - Word document generation

Full list in `pom.xml`

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t justpdf-converter .

# Run container
docker run -p 8080:8080 justpdf-converter
```

## 🌐 Production Deployment

### Heroku
```bash
heroku create justpdf-converter
git push heroku main
```

### AWS Lambda
1. Build: `mvn clean package`
2. Upload JAR to Lambda
3. Set handler: `net.justpdf.converter.ConverterApplication`
4. Configure API Gateway

### Google Cloud Run
```bash
gcloud run deploy --source .
```

## 🧪 Testing

```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=PdfToWordServiceTest
```

## 📝 Project Structure

```
server/
├── pom.xml                                   # Maven config
├── src/
│   └── main/
│       ├── java/net/justpdf/
│       │   ├── converter/
│       │   │   ├── ConverterApplication.java    # Main class
│       │   │   ├── PdfToWordController.java     # REST API
│       │   │   └── PdfToWordService.java        # Conversion logic
│       │   └── protection/
│       │       └── PdfProtectionController.java  # PDF protection API
│       └── resources/
│           └── application.properties            # Configuration
```

## 🔐 Security

- File validation (type, size)
- MIME type checking
- Filename sanitization
- In-memory processing (no disk storage)
- CORS configuration
- HTTPS recommended for production

## 📚 Documentation

See `PDF-TO-WORD-IMPLEMENTATION-GUIDE.md` for complete documentation.

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in application.properties
server.port=8081
```

**Out of memory:**
```bash
# Increase heap size
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx2048m"
```

**Dependencies not resolving:**
```bash
# Clear Maven cache
mvn dependency:purge-local-repository
mvn clean install
```

## 📄 License

Part of JustPDF project. See main LICENSE file.
