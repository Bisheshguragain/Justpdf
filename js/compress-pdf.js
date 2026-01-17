// Client-side JavaScript for Compress PDF tool
// Handles file upload, rate limiting, progress, and download

(function() {
  'use strict';

  // DOM elements
  const uploadBox = document.getElementById('upload-box');
  const fileInput = document.getElementById('file-input');
  const compressBtn = document.getElementById('compress-btn');
  const uploadSection = document.getElementById('upload-section');
  const progressSection = document.getElementById('progress-section');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const downloadSection = document.getElementById('download-section');
  const downloadLink = document.getElementById('download-link');
  const compressionStats = document.getElementById('compression-stats');
  const compressAnother = document.getElementById('compress-another');
  const rateLimitMessage = document.getElementById('rate-limit-message');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');

  let selectedFile = null;

  // Rate limiting functions
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
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (!file) return 'No file selected.';
    if (file.type !== 'application/pdf') return 'Only PDF files are allowed.';
    if (file.size > maxSize) return 'File size exceeds 25MB limit.';
    return null;
  }

  // Show error
  function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
      errorMessage.classList.add('hidden');
    }, 5000);
  }

  // Reset UI
  function resetUI() {
    selectedFile = null;
    uploadSection.classList.remove('hidden');
    progressSection.classList.add('hidden');
    downloadSection.classList.add('hidden');
    errorMessage.classList.add('hidden');
    compressBtn.classList.add('hidden');
    fileInput.value = '';
  }

  // Drag and drop handlers
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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
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
    compressBtn.classList.remove('hidden');
  }

  // Compress PDF
  compressBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    // Check rate limit
    if (!canDownload()) {
      rateLimitMessage.classList.remove('hidden');
      uploadSection.classList.add('hidden');
      return;
    }

    // Show progress
    uploadSection.classList.add('hidden');
    progressSection.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = 'Uploading...';

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90;
      progressBar.style.width = progress + '%';
    }, 200);

    try {
      // Upload to API
      const formData = new FormData();
      formData.append('file', selectedFile);

      progressText.textContent = 'Compressing PDF...';

      const response = await fetch('/api/tools/compress-pdf', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('Compression failed. Please try again.');
      }

      // Get compressed file
      const blob = await response.blob();
      const originalSize = selectedFile.size;
      const compressedSize = blob.size;
      const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

      // Show download
      progressSection.classList.add('hidden');
      downloadSection.classList.remove('hidden');

      compressionStats.textContent = `Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB → Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)} MB (${reduction}% reduction)`;

      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = selectedFile.name.replace('.pdf', '_compressed.pdf');

      // Record download
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

  // Compress another
  compressAnother.addEventListener('click', resetUI);

})();
