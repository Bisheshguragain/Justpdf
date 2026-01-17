// API Endpoint: Compress PDF
// NOTE: Do not duplicate. This endpoint compresses PDFs serverlessly.
// Accepts multipart/form-data, returns processed PDF.
// IMPLEMENTATION: Full serverless function with pdf-lib compression

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

  let tempFilePath = null;

  try {
    // Parse the uploaded file
    const form = formidable({ maxFileSize: 25 * 1024 * 1024 }); // 25MB limit
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Validate file
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

    // Read and load the PDF
    const pdfBytes = await fs.readFile(tempFilePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Compress by re-saving with default compression
    // pdf-lib automatically applies Flate compression to streams
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true, // Enable object streams for better compression
      addDefaultPage: false,
      objectsPerTick: 50,
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="compressed.pdf"');
    res.setHeader('Content-Length', compressedBytes.length);

    // Send compressed PDF
    res.status(200).send(Buffer.from(compressedBytes));

  } catch (error) {
    console.error('Compression error:', error);
    res.status(500).json({ 
      error: 'Failed to compress PDF. Please ensure the file is a valid PDF.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    // Clean up temporary file
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
    }
  }
}

