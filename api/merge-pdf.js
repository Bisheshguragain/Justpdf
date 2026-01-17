// Serverless function: Merge PDF files
// Accepts multipart/form-data with multiple PDF files
// Returns merged PDF as binary
// IMPLEMENTATION: Full serverless function with pdf-lib

import { PDFDocument } from 'pdf-lib';
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // TODO: FUTURE - Add authentication check here
  // if (!isAuthenticated(req)) { return res.status(401).json({ error: 'Unauthorized' }); }
  
  // TODO: FUTURE - Check subscription status for unlimited access
  // if (!hasActiveSubscription(req.user)) { /* apply rate limits */ }

  const tempFiles = [];

  try {
    // Parse the uploaded files
    const form = formidable({ 
      maxFileSize: 25 * 1024 * 1024, // 25MB per file
      multiples: true 
    });
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Get all uploaded files (handle both single and multiple uploads)
    let uploadedFiles = files.file || files.files;
    if (!Array.isArray(uploadedFiles)) {
      uploadedFiles = uploadedFiles ? [uploadedFiles] : [];
    }

    // Validate files
    if (uploadedFiles.length < 2) {
      res.status(400).json({ error: 'Please upload at least two PDF files' });
      return;
    }

    // Validate file types
    for (const file of uploadedFiles) {
      if (file.mimetype !== 'application/pdf') {
        res.status(400).json({ error: 'Only PDF files are allowed' });
        return;
      }
      tempFiles.push(file.filepath);
    }

    // Create merged PDF
    const mergedPdf = await PDFDocument.create();

    // Process each PDF
    for (const file of uploadedFiles) {
      const pdfBytes = await fs.readFile(file.filepath);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save merged PDF
    const mergedBytes = await mergedPdf.save();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="merged.pdf"');
    res.setHeader('Content-Length', mergedBytes.length);

    // Send merged PDF
    res.status(200).send(Buffer.from(mergedBytes));

  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ 
      error: 'Failed to merge PDFs. Please ensure all files are valid PDFs.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    // Clean up temporary files
    for (const tempFile of tempFiles) {
      try {
        await fs.unlink(tempFile);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
    }
  }
}

