# PDF to Word Converter - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER'S BROWSER                                │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────┐    │
│  │         pdf-to-word-COMPLETE.html (Frontend)                  │    │
│  │                                                                │    │
│  │  [Upload Area]  ────┐                                         │    │
│  │  • Drag & Drop       │                                        │    │
│  │  • Click to Upload   │                                        │    │
│  │  • File Validation   │                                        │    │
│  │                      │                                        │    │
│  │  [Progress Bar] ◄────┤                                        │    │
│  │  • Upload Progress   │                                        │    │
│  │  • Conversion Status │                                        │    │
│  │                      │                                        │    │
│  │  [Download Button]   │                                        │    │
│  │  • DOCX Download ◄───┘                                        │    │
│  │                                                                │    │
│  └───────────────────────────────────────────────────────────────┘    │
│                              │                                         │
│                              │ HTTPS POST                              │
│                              │ FormData(file)                          │
└──────────────────────────────┼─────────────────────────────────────────┘
                               │
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    JAVA BACKEND (Server/Lambda/Cloud Run)              │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────┐    │
│  │                 Spring Boot Application                       │    │
│  │                                                                │    │
│  │  ┌─────────────────────────────────────────────────────┐     │    │
│  │  │      PdfToWordController.java (REST API)            │     │    │
│  │  │                                                      │     │    │
│  │  │  @PostMapping("/api/convert/pdf-to-word")          │     │    │
│  │  │                                                      │     │    │
│  │  │  1. Receive multipart file upload                   │     │    │
│  │  │  2. Validate file:                                  │     │    │
│  │  │     • Check MIME type (application/pdf)             │     │    │
│  │  │     • Check extension (.pdf)                        │     │    │
│  │  │     • Check size (max 50MB)                         │     │    │
│  │  │     • Sanitize filename                             │     │    │
│  │  │  3. Call PdfToWordService                           │     │    │
│  │  │  4. Return DOCX as binary response                  │     │    │
│  │  │                                                      │     │    │
│  │  └──────────────────┬───────────────────────────────────┘     │    │
│  │                     │                                         │    │
│  │                     │ calls                                   │    │
│  │                     ▼                                         │    │
│  │  ┌─────────────────────────────────────────────────────┐     │    │
│  │  │      PdfToWordService.java (Conversion Logic)       │     │    │
│  │  │                                                      │     │    │
│  │  │  ┌────────────────────────────────────────────┐    │     │    │
│  │  │  │  Step 1: Load PDF with Apache PDFBox       │    │     │    │
│  │  │  │  • PDDocument.load(pdfBytes)               │    │     │    │
│  │  │  │  • Extract page count                      │    │     │    │
│  │  │  └────────────────────────────────────────────┘    │     │    │
│  │  │                                                      │     │    │
│  │  │  ┌────────────────────────────────────────────┐    │     │    │
│  │  │  │  Step 2: Extract Content                   │    │     │    │
│  │  │  │  • PDFTextStripper                         │    │     │    │
│  │  │  │  • Extract text per page                   │    │     │    │
│  │  │  │  • Detect paragraphs                       │    │     │    │
│  │  │  │  • Detect headings                         │    │     │    │
│  │  │  │  • Detect tables                           │    │     │    │
│  │  │  │  • Extract images                          │    │     │    │
│  │  │  │  • Preserve formatting                     │    │     │    │
│  │  │  └────────────────────────────────────────────┘    │     │    │
│  │  │                                                      │     │    │
│  │  │  ┌────────────────────────────────────────────┐    │     │    │
│  │  │  │  Step 3: Generate DOCX with docx4j         │    │     │    │
│  │  │  │  • WordprocessingMLPackage.create()        │    │     │    │
│  │  │  │  • MainDocumentPart                        │    │     │    │
│  │  │  │  • Create paragraphs (P)                   │    │     │    │
│  │  │  │  • Create text runs (R)                    │    │     │    │
│  │  │  │  • Set font properties (RPr)               │    │     │    │
│  │  │  │  • Create tables (Tbl)                     │    │     │    │
│  │  │  │  • Add images                              │    │     │    │
│  │  │  │  • Add page breaks                         │    │     │    │
│  │  │  └────────────────────────────────────────────┘    │     │    │
│  │  │                                                      │     │    │
│  │  │  ┌────────────────────────────────────────────┐    │     │    │
│  │  │  │  Step 4: Save to ByteArrayOutputStream     │    │     │    │
│  │  │  │  • wordMLPackage.save(outputStream)        │    │     │    │
│  │  │  │  • Return byte array                       │    │     │    │
│  │  │  └────────────────────────────────────────────┘    │     │    │
│  │  │                                                      │     │    │
│  │  └──────────────────────────────────────────────────────┘     │    │
│  │                                                                │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  Libraries Used:                                                       │
│  • Spring Boot 3.2.1  - REST framework                                │
│  • Apache PDFBox 2.0.30 - PDF parsing                                 │
│  • docx4j 11.4.9      - DOCX generation                               │
│  • Java 17            - Runtime                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTP Response
                               │ Content-Type: application/octet-stream
                               │ Binary DOCX data
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER'S BROWSER                                │
│                                                                         │
│  [Download Manager]                                                    │
│  • Save DOCX file                                                      │
│  • Open in Microsoft Word / Google Docs / LibreOffice                 │
│  • Edit converted document                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
┌─────────────┐
│  PDF File   │
│  (Binary)   │
└──────┬──────┘
       │
       │ 1. Upload
       ▼
┌─────────────────┐
│  Frontend       │
│  Validation     │
│  • Type check   │
│  • Size check   │
└────────┬────────┘
         │
         │ 2. POST FormData
         ▼
┌─────────────────────┐
│  Controller         │
│  • MIME validation  │
│  • Extension check  │
│  • Sanitize name    │
└─────────┬───────────┘
          │
          │ 3. byte[]
          ▼
┌──────────────────────┐
│  PDFBox Parser       │
│  • Load document     │
│  • Extract text      │
│  • Get structure     │
│  • Extract images    │
└──────────┬───────────┘
           │
           │ 4. PdfPage objects
           ▼
┌───────────────────────┐
│  docx4j Generator     │
│  • Create package     │
│  • Build paragraphs   │
│  • Build tables       │
│  • Add images         │
│  • Format text        │
└──────────┬────────────┘
           │
           │ 5. ByteArrayOutputStream
           ▼
┌──────────────────────┐
│  Controller          │
│  • Set headers       │
│  • Set MIME type     │
│  • Return binary     │
└──────────┬───────────┘
           │
           │ 6. DOCX Binary
           ▼
┌──────────────────────┐
│  Frontend            │
│  • Create Blob       │
│  • Generate URL      │
│  • Trigger download  │
└──────────────────────┘
```

---

## Component Interactions

```
┌───────────────────┐
│   Frontend        │
│   (HTML/JS)       │
└─────────┬─────────┘
          │
          │ XMLHttpRequest
          │ FormData upload
          ▼
┌───────────────────────────────────┐
│   Spring Boot REST API            │
│   ┌─────────────────────────┐     │
│   │  @RestController        │     │
│   │  PdfToWordController    │     │
│   └───────────┬─────────────┘     │
│               │                   │
│               │ @Autowired        │
│               ▼                   │
│   ┌─────────────────────────┐     │
│   │  @Service               │     │
│   │  PdfToWordService       │     │
│   └───────────┬─────────────┘     │
│               │                   │
│               │ uses              │
│               ▼                   │
│   ┌─────────────────────────┐     │
│   │  Apache PDFBox          │     │
│   │  • PDDocument           │     │
│   │  • PDFTextStripper      │     │
│   └─────────────────────────┘     │
│               │                   │
│               │ generates         │
│               ▼                   │
│   ┌─────────────────────────┐     │
│   │  docx4j                 │     │
│   │  • WordprocessingML     │     │
│   │  • MainDocumentPart     │     │
│   └─────────────────────────┘     │
└───────────────────────────────────┘
```

---

## Security Layers

```
┌────────────────────┐
│  User Upload       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Frontend          │
│  Validation        │
│  • File type       │
│  • File size       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  HTTPS/TLS         │
│  Encryption        │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Backend           │
│  Validation        │
│  • MIME check      │
│  • Extension check │
│  • Size limit      │
│  • Sanitize name   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Processing        │
│  • In-memory only  │
│  • No disk write   │
│  • Auto cleanup    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Response          │
│  • Binary stream   │
│  • No caching      │
│  • Immediate delete│
└────────────────────┘
```

---

## Deployment Architectures

### Local Development
```
┌──────────┐     ┌──────────────┐
│ Browser  │────▶│ localhost    │
│          │     │ :8080        │
└──────────┘     └──────────────┘
```

### Cloud Deployment (Example: AWS)
```
┌──────────┐     ┌─────────────┐     ┌──────────────┐
│ Browser  │────▶│ CloudFront  │────▶│ API Gateway  │
│          │     │ (CDN)       │     │              │
└──────────┘     └─────────────┘     └──────┬───────┘
                                             │
                                             ▼
                                     ┌──────────────┐
                                     │ Lambda       │
                                     │ Function     │
                                     │ (Java)       │
                                     └──────────────┘
```

### Traditional Server
```
┌──────────┐     ┌─────────────┐     ┌──────────────┐
│ Browser  │────▶│ Nginx       │────▶│ Spring Boot  │
│          │     │ (Reverse    │     │ :8080        │
└──────────┘     │  Proxy)     │     └──────────────┘
                 └─────────────┘
```

---

## File Formats

### Input
```
PDF Document Structure:
┌─────────────────┐
│ Page 1          │
│ • Text          │
│ • Formatting    │
│ • Images        │
├─────────────────┤
│ Page 2          │
│ • Tables        │
│ • Lists         │
│ • Headings      │
└─────────────────┘
```

### Output
```
DOCX Document Structure:
┌─────────────────────────────┐
│ WordprocessingMLPackage     │
│ ┌─────────────────────────┐ │
│ │ MainDocumentPart        │ │
│ │ ┌─────────────────────┐ │ │
│ │ │ Paragraph 1 (P)     │ │ │
│ │ │ • Run (R)           │ │ │
│ │ │ • Text (T)          │ │ │
│ │ │ • Properties (RPr)  │ │ │
│ │ ├─────────────────────┤ │ │
│ │ │ Table (Tbl)         │ │ │
│ │ │ • Rows (Tr)         │ │ │
│ │ │ • Cells (Tc)        │ │ │
│ │ ├─────────────────────┤ │ │
│ │ │ Page Break          │ │ │
│ │ └─────────────────────┘ │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

---

**Architecture Design:** Microservices-ready, Stateless, Scalable, Secure
**Last Updated:** January 4, 2026
