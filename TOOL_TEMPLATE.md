# Tool Page Template Generator Guide

## 📝 How to Create a New Tool Page

This guide shows you how to quickly create a new tool page using the established template pattern.

---

## 🎯 Template Structure

Each tool needs 3 files:
1. **HTML Page** - `/tools/your-tool.html`
2. **Client JavaScript** - `/js/your-tool.js`
3. **API Endpoint** - `/api/tools/your-tool.js`

---

## 📄 1. HTML Page Template

Create `/tools/your-tool.html` using this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[TOOL NAME] - [ACTION] PDF Online Free | JustPdf</title>
  <meta name="description" content="[DESCRIPTION - 150-160 characters]">
  <meta property="og:title" content="[TOOL NAME] - Free Online PDF Tool">
  <meta property="og:description" content="[SHORT DESCRIPTION]">
  <meta property="og:url" content="https://justpdf.net/tools/[tool-slug]/">
  <meta property="og:type" content="website">
  <link rel="canonical" href="https://justpdf.net/tools/[tool-slug]/">
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "[FAQ Question 1]",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "[FAQ Answer 1]"
        }
      }
    ]
  }
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
</head>
<body class="bg-gray-50">
  <!-- Navigation (copy from compress-pdf.html) -->
  <nav class="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
    <a href="/" class="flex items-center">
      <span class="font-bold text-2xl text-green-700">JustPdf</span>
    </a>
    <ul class="flex space-x-6 text-gray-700 text-base">
      <li><a href="/" class="hover:text-green-700 transition">All Tools</a></li>
      <li><a href="/about.html" class="hover:text-green-700 transition">About</a></li>
      <li><a href="/contact.html" class="hover:text-green-700 transition">Contact</a></li>
    </ul>
  </nav>

  <main class="max-w-4xl mx-auto px-4 py-10">
    <h1 class="text-4xl md:text-5xl font-bold text-green-700 mb-4">[TOOL NAME] - [ACTION] PDF Online Free</h1>
    <p class="text-lg text-gray-700 mb-8">[TOOL DESCRIPTION - 1-2 sentences]</p>

    <!-- Upload Section -->
    <div id="upload-section" class="mb-8">
      <div id="upload-box" class="border-2 border-dashed border-green-400 rounded-lg p-12 bg-white flex flex-col items-center cursor-pointer hover:bg-green-50 transition-all">
        <svg class="w-16 h-16 text-green-400 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/>
        </svg>
        <p class="text-gray-700 mb-2 text-lg">Drag & drop your PDF here or <span class="text-green-700 underline font-semibold">browse</span></p>
        <p class="text-sm text-gray-500">Max file size: 25MB</p>
        <input type="file" accept="application/pdf" class="hidden" id="file-input">
      </div>
      <button id="process-btn" class="hidden mt-4 w-full px-8 py-4 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition text-lg">
        [ACTION BUTTON TEXT]
      </button>
    </div>

    <!-- Progress Section -->
    <div id="progress-section" class="hidden mb-8">
      <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div id="progress-bar" class="bg-green-500 h-4 rounded-full transition-all" style="width: 0%;"></div>
      </div>
      <p id="progress-text" class="text-center text-sm text-gray-600">Processing...</p>
    </div>

    <!-- Download Section -->
    <div id="download-section" class="hidden text-center mb-8 bg-white rounded-lg p-8 shadow-lg">
      <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      <h3 class="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
      <a id="download-link" href="#" download class="inline-block px-8 py-4 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition text-lg">
        Download PDF
      </a>
      <p class="text-sm text-gray-500 mt-4">File will be automatically deleted after download</p>
      <button id="process-another" class="mt-4 text-green-700 hover:underline">[ACTION] another PDF</button>
    </div>

    <!-- Error/Rate Limit Messages (copy from compress-pdf.html) -->
    <div id="rate-limit-message" class="hidden bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
      <h3 class="font-bold text-yellow-800 mb-2">Daily Limit Reached</h3>
      <p class="text-yellow-800">You've reached the 3 downloads per 24 hours limit. Please try again tomorrow.</p>
    </div>

    <div id="error-message" class="hidden bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
      <h3 class="font-bold text-red-800 mb-2">Error</h3>
      <p id="error-text" class="text-red-800"></p>
    </div>

    <!-- SEO Content Article -->
    <article class="prose prose-lg max-w-none mt-16 bg-white rounded-lg p-8 shadow-sm">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">How to [ACTION] PDF Files Online</h2>
      <p class="text-gray-700 mb-6">[INTRODUCTION PARAGRAPH - 2-3 sentences explaining the tool and its benefits]</p>
      
      <h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-3">Why [ACTION] PDF Files?</h3>
      <p class="text-gray-700 mb-4">[PARAGRAPH explaining use cases and benefits]</p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>[BENEFIT 1 TITLE]:</strong> [Description]</li>
        <li><strong>[BENEFIT 2 TITLE]:</strong> [Description]</li>
        <li><strong>[BENEFIT 3 TITLE]:</strong> [Description]</li>
        <li><strong>[BENEFIT 4 TITLE]:</strong> [Description]</li>
      </ul>

      <h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-3">Step-by-Step Guide</h3>
      <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-3">
        <li><strong>Upload your PDF:</strong> [Step 1 description]</li>
        <li><strong>Click [ACTION]:</strong> [Step 2 description]</li>
        <li><strong>Download:</strong> [Step 3 description]</li>
      </ol>

      <h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-3">Frequently Asked Questions</h3>
      
      <div class="bg-gray-50 p-6 rounded-lg mb-4">
        <h4 class="font-semibold text-gray-800 mb-2">[FAQ QUESTION 1]</h4>
        <p class="text-gray-700">[FAQ ANSWER 1]</p>
      </div>

      <!-- Add 4-6 FAQ sections -->

      <h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-3">Tips for Better Results</h3>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>[TIP 1]</li>
        <li>[TIP 2]</li>
        <li>[TIP 3]</li>
      </ul>
    </article>

    <!-- Related Tools (copy from compress-pdf.html and customize) -->
    <div class="mt-12 bg-white rounded-lg p-8 shadow-sm">
      <h3 class="text-2xl font-bold mb-6 text-gray-800">Related PDF Tools</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- Add 4 related tools -->
      </div>
    </div>

    <!-- AdSense (copy from compress-pdf.html) -->
    <div class="mt-12 flex justify-center">
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </main>

  <!-- Footer (copy from compress-pdf.html) -->
  <footer class="bg-gray-800 text-white mt-20 py-12">
    <!-- Footer content -->
  </footer>

  <script src="/js/[tool-slug].js"></script>
</body>
</html>
```

---

## 💻 2. Client JavaScript Template

Create `/js/your-tool.js`:

```javascript
// Client-side JavaScript for [Tool Name]
// Handles file upload, rate limiting, progress, and download

(function() {
  'use strict';

  // DOM elements
  const uploadBox = document.getElementById('upload-box');
  const fileInput = document.getElementById('file-input');
  const processBtn = document.getElementById('process-btn');
  const uploadSection = document.getElementById('upload-section');
  const progressSection = document.getElementById('progress-section');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const downloadSection = document.getElementById('download-section');
  const downloadLink = document.getElementById('download-link');
  const processAnother = document.getElementById('process-another');
  const rateLimitMessage = document.getElementById('rate-limit-message');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');

  let selectedFile = null;

  // Rate limiting
  function canDownload() {
    const now = Date.now();
    let data = JSON.parse(localStorage.getItem('jpdl') || '{}');
    if (!data.ts || now - data.ts > 24 * 60 * 60 * 1000) {
      data = { count: 0, ts: now };
    }
    return data.count < 3;
  }

  function recordDownload() {
    const now = Date.now();
    let data = JSON.parse(localStorage.getItem('jpdl') || '{}');
    if (!data.ts || now - data.ts > 24 * 60 * 60 * 1000) {
      data = { count: 0, ts: now };
    }
    data.count = (data.count || 0) + 1;
    localStorage.setItem('jpdl', JSON.stringify(data));
    document.cookie = `jpdl=${JSON.stringify(data)};max-age=86400;path=/`;
  }

  // File validation
  function validatePDF(file) {
    const maxSize = 25 * 1024 * 1024;
    if (!file) return 'No file selected.';
    if (file.type !== 'application/pdf') return 'Only PDF files are allowed.';
    if (file.size > maxSize) return 'File size exceeds 25MB limit.';
    return null;
  }

  // Show error
  function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => errorMessage.classList.add('hidden'), 5000);
  }

  // Reset UI
  function resetUI() {
    selectedFile = null;
    uploadSection.classList.remove('hidden');
    progressSection.classList.add('hidden');
    downloadSection.classList.add('hidden');
    errorMessage.classList.add('hidden');
    processBtn.classList.add('hidden');
    fileInput.value = '';
  }

  // Drag and drop
  uploadBox.addEventListener('click', () => fileInput.click());
  
  uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('border-green-600', 'bg-green-100');
  });

  uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('border-green-600', 'bg-green-100');
  });

  uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('border-green-600', 'bg-green-100');
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  });

  // Handle file selection
  function handleFileSelect(file) {
    const error = validatePDF(file);
    if (error) {
      showError(error);
      return;
    }

    selectedFile = file;
    uploadBox.querySelector('p').innerHTML = `
      <strong class="text-green-700">${file.name}</strong><br>
      <span class="text-sm text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
    `;
    processBtn.classList.remove('hidden');
  }

  // Process PDF
  processBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    if (!canDownload()) {
      rateLimitMessage.classList.remove('hidden');
      uploadSection.classList.add('hidden');
      return;
    }

    uploadSection.classList.add('hidden');
    progressSection.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = 'Uploading...';

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90;
      progressBar.style.width = progress + '%';
    }, 200);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      progressText.textContent = 'Processing...';

      const response = await fetch('/api/tools/[tool-slug]', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('Processing failed. Please try again.');
      }

      const blob = await response.blob();

      progressSection.classList.add('hidden');
      downloadSection.classList.remove('hidden');

      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = selectedFile.name.replace('.pdf', '_processed.pdf');

      downloadLink.addEventListener('click', () => {
        recordDownload();
      }, { once: true });

    } catch (error) {
      clearInterval(progressInterval);
      progressSection.classList.add('hidden');
      uploadSection.classList.remove('hidden');
      showError(error.message || 'An error occurred. Please try again.');
    }
  });

  processAnother.addEventListener('click', resetUI);

})();
```

---

## ⚙️ 3. API Endpoint Template

Create `/api/tools/your-tool.js`:

```javascript
// API Endpoint: [Tool Name]
// Processes PDF files serverlessly

import { PDFDocument } from 'pdf-lib';
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // TODO: FUTURE - Add authentication check
  // TODO: FUTURE - Check subscription status

  let tempFilePath = null;

  try {
    // Parse uploaded file
    const form = formidable({ maxFileSize: 25 * 1024 * 1024 });
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = files.file?.[0] || files.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    if (file.mimetype !== 'application/pdf') {
      res.status(400).json({ error: 'Only PDF files are allowed' });
      return;
    }

    tempFilePath = file.filepath;

    // Load PDF
    const pdfBytes = await fs.readFile(tempFilePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // TODO: Implement tool-specific processing logic here
    // Examples:
    // - Rotate pages: page.setRotation(degrees(90))
    // - Delete pages: pdfDoc.removePage(index)
    // - Add watermark: page.drawText('Watermark', {...})
    // - Extract pages: const [newPage] = await newPdf.copyPages(pdfDoc, [0])

    // Save processed PDF
    const processedBytes = await pdfDoc.save();

    // Send response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="processed.pdf"');
    res.setHeader('Content-Length', processedBytes.length);
    res.status(200).send(Buffer.from(processedBytes));

  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ 
      error: 'Failed to process PDF',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
    }
  }
}
```

---

## 📋 Quick Checklist for New Tools

- [ ] Copy HTML template and customize all [PLACEHOLDERS]
- [ ] Write 800-1500 words of unique SEO content
- [ ] Create 4-6 FAQ sections with JSON-LD schema
- [ ] Add 4 related tools in the related tools section
- [ ] Copy client JavaScript template and update tool-specific logic
- [ ] Implement API endpoint with tool-specific PDF processing
- [ ] Add tool to `/utils/toolRegistry.js`
- [ ] Test upload, processing, and download flow
- [ ] Test rate limiting
- [ ] Verify SEO meta tags and OpenGraph tags
- [ ] Test on mobile devices

---

**Tool creation time: 30-60 minutes per tool** 🚀
