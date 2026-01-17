# JustPDF - Developer Documentation

## 🏗️ Architecture Overview

JustPDF is a **100% client-side PDF manipulation platform** built with vanilla JavaScript and modern browser APIs. No backend required!

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Core Libraries](#core-libraries)
- [Tool Implementation Guide](#tool-implementation-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with gradients and animations
- **Vanilla JavaScript (ES6+)** - No framework dependencies

### Libraries (CDN)
- **pdf-lib** (v1.17.1) - PDF creation and manipulation
- **pdf.js** (v3.11.174) - PDF rendering for thumbnails
- **CryptoJS** (v4.1.1) - Encryption utilities

### Browser APIs
- File API - File upload and reading
- Blob API - Creating downloadable files
- Canvas API - Image rendering (via pdf.js)
- Web Workers - (via pdf.js for rendering)

---

## 📁 Project Structure

```
JustPDF/
├── index.html                  # Homepage with tool grid
├── compress-pdf.html          # Compress PDF tool
├── tools/
│   ├── merge-pdf.html         # Merge multiple PDFs
│   ├── split-pdf.html         # Split PDF into parts
│   ├── rotate-pdf.html        # Rotate PDF pages
│   ├── delete-pages.html      # Delete specific pages
│   ├── image-to-pdf.html      # Convert images to PDF
│   ├── extract-pages.html     # Extract specific pages
│   ├── organize-pages.html    # Drag-drop page organizer
│   ├── protect-pdf.html       # Password protection
│   ├── page-numbers.html      # Add page numbers
│   └── [other-tools].html     # Placeholder files
├── IMPLEMENTATION_COMPLETE.md # Implementation summary
├── USER_GUIDE.md             # User documentation
└── DEVELOPER_GUIDE.md        # This file
```

---

## 📚 Core Libraries

### 1. pdf-lib

**Purpose**: PDF manipulation (create, modify, merge, split)

**Common Operations**:
```javascript
// Load a PDF
const pdfDoc = await PDFDocument.load(pdfBytes);

// Get page count
const pageCount = pdfDoc.getPageCount();

// Copy pages between PDFs
const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageIndex]);
newPdf.addPage(copiedPage);

// Rotate a page
const page = pdfDoc.getPage(0);
page.setRotation(degrees(90));

// Add text
page.drawText('Hello World', {
    x: 50,
    y: 50,
    size: 12,
    font: helveticaFont,
    color: rgb(0, 0, 0)
});

// Save PDF
const pdfBytes = await pdfDoc.save();
```

**Documentation**: https://pdf-lib.js.org/

### 2. pdf.js

**Purpose**: Rendering PDF pages to canvas (for thumbnails)

**Common Usage**:
```javascript
// Load PDF for rendering
const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
const pdf = await loadingTask.promise;

// Render a page
const page = await pdf.getPage(pageNumber);
const viewport = page.getViewport({ scale: 1.0 });
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = viewport.width;
canvas.height = viewport.height;

await page.render({
    canvasContext: context,
    viewport: viewport
}).promise;
```

**Documentation**: https://mozilla.github.io/pdf.js/

### 3. CryptoJS

**Purpose**: Encryption (for Protect PDF tool)

**Usage**:
```javascript
// Encrypt data
const encrypted = CryptoJS.AES.encrypt(data, password).toString();

// Decrypt data
const decrypted = CryptoJS.AES.decrypt(encrypted, password);
const originalData = decrypted.toString(CryptoJS.enc.Utf8);
```

**Documentation**: https://cryptojs.gitbook.io/

---

## 🚀 Deployment

### Requirements
- **Web Server**: Any static file server (Apache, Nginx, GitHub Pages, Netlify, Vercel, etc.)
- **HTTPS**: Required for File API to work properly in modern browsers
- **No Backend**: All processing client-side

### Deployment Steps

1. **Upload files** to your web server
2. **Ensure HTTPS** is enabled
3. **Test** all tools in target browsers
4. **Monitor** browser console for errors

### Recommended Hosts
- **Netlify**: Drag & drop deployment, free SSL
- **Vercel**: Git-based deployment, free SSL
- **GitHub Pages**: Free hosting for public repos
- **AWS S3 + CloudFront**: Scalable, requires configuration

### CDN Dependencies
All libraries loaded via CDN:
- pdf-lib: https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js
- pdf.js: https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js
- CryptoJS: https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js

---

## 🧪 Testing

### Browser Testing
Test on:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (desktop and mobile)
- ⚠️ Mobile browsers (limited drag-drop support)

### Test Cases per Tool

1. **Upload**: Valid PDF, invalid file, corrupted PDF
2. **Processing**: Small PDF (<1MB), medium (1-10MB), large (>10MB)
3. **Edge Cases**: Single page, 100+ pages, password-protected
4. **Download**: File saves correctly, filename is appropriate
5. **Error Handling**: Invalid input, processing errors, browser limitations

---

## 📊 Performance Considerations

### Memory Usage
- Large PDFs load entire file into memory
- Browser tab can use 100MB-1GB for large files
- Recommend <50MB files for best performance

### Processing Time
- Small PDFs (<5MB): Instant
- Medium PDFs (5-20MB): 1-5 seconds
- Large PDFs (>20MB): 5-30+ seconds

---

## 🔐 Security Considerations

### Client-Side Security
- ✅ No data sent to server
- ✅ Files processed in isolated browser context
- ✅ No persistent storage (files cleared on page close)
- ⚠️ User should close tab after processing sensitive files

### HTTPS Requirement
- File API requires secure context (HTTPS)
- Modern browsers block file operations on HTTP

---

**Version**: 1.0  
**Last Updated**: December 2024
