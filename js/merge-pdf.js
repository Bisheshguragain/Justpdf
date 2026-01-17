// Merge PDF Tool - Client-side JavaScript
import { checkRateLimit, recordUsage } from '/utils/rateLimit.js';
import { validateFile } from '/utils/fileValidation.js';

let selectedFiles = [];

document.addEventListener('DOMContentLoaded', () => {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const selectBtn = document.getElementById('selectBtn');
  const fileList = document.getElementById('fileList');
  const fileListItems = document.getElementById('fileListItems');
  const actionContainer = document.getElementById('actionContainer');
  const mergeBtn = document.getElementById('mergeBtn');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const downloadContainer = document.getElementById('downloadContainer');
  const downloadBtn = document.getElementById('downloadBtn');

  // Click to select files
  selectBtn.addEventListener('click', () => fileInput.click());
  uploadArea.addEventListener('click', () => fileInput.click());

  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-green-500', 'bg-green-50');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-green-500', 'bg-green-50');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-green-500', 'bg-green-50');
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  });

  // Handle file selection
  function handleFiles(files) {
    const validFiles = files.filter(file => {
      const validation = validateFile(file, { maxSize: 50 * 1024 * 1024 }); // 50MB max
      if (!validation.valid) {
        alert(validation.error);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    selectedFiles = [...selectedFiles, ...validFiles];
    updateFileList();
    fileList.classList.remove('hidden');
    actionContainer.classList.remove('hidden');
  }

  // Update file list display
  function updateFileList() {
    fileListItems.innerHTML = '';
    selectedFiles.forEach((file, index) => {
      const item = document.createElement('div');
      item.className = 'flex items-center justify-between bg-white p-3 rounded border';
      item.innerHTML = `
        <div class="flex items-center space-x-3">
          <span class="text-2xl">📄</span>
          <div>
            <div class="font-semibold">${file.name}</div>
            <div class="text-sm text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button class="move-up px-2 py-1 text-gray-600 hover:text-green-600" data-index="${index}" ${index === 0 ? 'disabled' : ''}>↑</button>
          <button class="move-down px-2 py-1 text-gray-600 hover:text-green-600" data-index="${index}" ${index === selectedFiles.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="remove px-2 py-1 text-red-600 hover:text-red-800" data-index="${index}">✕</button>
        </div>
      `;
      fileListItems.appendChild(item);
    });

    // Add event listeners for reorder and remove buttons
    document.querySelectorAll('.move-up').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        if (index > 0) {
          [selectedFiles[index - 1], selectedFiles[index]] = [selectedFiles[index], selectedFiles[index - 1]];
          updateFileList();
        }
      });
    });

    document.querySelectorAll('.move-down').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        if (index < selectedFiles.length - 1) {
          [selectedFiles[index], selectedFiles[index + 1]] = [selectedFiles[index + 1], selectedFiles[index]];
          updateFileList();
        }
      });
    });

    document.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        selectedFiles.splice(index, 1);
        updateFileList();
        if (selectedFiles.length === 0) {
          fileList.classList.add('hidden');
          actionContainer.classList.add('hidden');
        }
      });
    });
  }

  // Merge PDFs
  mergeBtn.addEventListener('click', async () => {
    if (selectedFiles.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }

    // Check rate limit
    const rateLimitCheck = checkRateLimit('merge-pdf');
    if (!rateLimitCheck.allowed) {
      alert(`Rate limit exceeded. Please wait ${Math.ceil(rateLimitCheck.retryAfter / 60)} minutes before trying again.`);
      return;
    }

    try {
      // Show progress
      progressContainer.classList.remove('hidden');
      actionContainer.classList.add('hidden');
      progressBar.style.width = '0%';
      progressText.textContent = 'Preparing files...';

      // Note: This is a client-side implementation using pdf-lib
      // For production, you may want to use the API endpoint instead
      const { PDFDocument } = window.pdfjsLib || await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js');

      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < selectedFiles.length; i++) {
        progressBar.style.width = `${(i / selectedFiles.length) * 80}%`;
        progressText.textContent = `Processing file ${i + 1} of ${selectedFiles.length}...`;

        const arrayBuffer = await selectedFiles[i].arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      progressBar.style.width = '90%';
      progressText.textContent = 'Finalizing merge...';

      const mergedPdfBytes = await mergedPdf.save();
      
      progressBar.style.width = '100%';
      progressText.textContent = 'Complete!';

      // Create download
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      downloadBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merged.pdf';
        a.click();
        recordUsage('merge-pdf');
      };

      // Show download button
      setTimeout(() => {
        progressContainer.classList.add('hidden');
        downloadContainer.classList.remove('hidden');
      }, 500);

    } catch (error) {
      console.error('Merge error:', error);
      alert('Failed to merge PDFs. Please try again or contact support.');
      progressContainer.classList.add('hidden');
      actionContainer.classList.remove('hidden');
    }
  });
});
