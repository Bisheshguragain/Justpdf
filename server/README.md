# JustPDF Protection API

Real PDF password protection using Apache PDFBox and AES-256 encryption.

## Features

- ✅ **Real AES-256 Encryption** - PDFs actually require password to open
- ✅ **Stateless & Databaseless** - No data stored, files processed in memory
- ✅ **CORS Enabled** - Works with static frontend
- ✅ **Production Ready** - Error handling, validation, security

## Tech Stack

- **Java 17**
- **Spring Boot 3.2**
- **Apache PDFBox 2.0** (PDF encryption)
- **Maven** (build tool)

## API Endpoint

### POST `/api/protect-pdf`

**Request:**
- Content-Type: `multipart/form-data`
- `file`: PDF file (binary)
- `password`: String (min 6 characters)

**Response:**
- Content-Type: `application/pdf`
- Binary PDF file with AES-256 encryption

**Example:**
```bash
curl -X POST http://localhost:8080/api/protect-pdf \
  -F "file=@document.pdf" \
  -F "password=SecurePassword123" \
  --output protected.pdf
```

## Local Development

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Test
curl http://localhost:8080/api/health
```

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.

## Security

- ✅ Files never written to disk
- ✅ Processed in memory only
- ✅ No logging of sensitive data
- ✅ CORS configured for your domain
- ✅ Input validation (file type, password length)

## License

MIT
