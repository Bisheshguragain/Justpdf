// Tool Registry
// Central registry of all tools for JustPdf.net
// Used to generate homepage, navigation, and related tools

export const toolCategories = {
  editing: {
    name: "PDF Editing & Annotation",
    tools: [
      { name: "PDF Editor", slug: "pdf-editor", description: "Edit text, annotate, add images and shapes to PDFs" },
      { name: "Fill & Sign", slug: "fill-sign", description: "Fill forms and sign PDFs electronically" },
      { name: "Remove Annotations", slug: "remove-annotations", description: "Remove all annotations from PDFs" }
    ]
  },
  pageManipulation: {
    name: "Page Manipulation",
    tools: [
      { name: "Delete Pages", slug: "delete-pages", description: "Remove specific pages from PDFs" },
      { name: "Merge PDF", slug: "merge-pdf", description: "Combine multiple PDFs into one" },
      { name: "Split PDF", slug: "split-pdf", description: "Split PDFs by pages, bookmarks, text, size, or in half" },
      { name: "Extract Pages", slug: "extract-pages", description: "Extract specific pages from PDFs" },
      { name: "Crop PDF", slug: "crop-pdf", description: "Crop PDF pages to specific dimensions" },
      { name: "Rotate PDF", slug: "rotate-pdf", description: "Rotate PDF pages" },
      { name: "Header & Footer", slug: "header-footer-pdf", description: "Add headers and footers to PDFs" },
      { name: "Organize Pages", slug: "organize-pages", description: "Reorder pages in PDFs" }
    ]
  },
  fromPDF: {
    name: "Convert FROM PDF",
    tools: [
      { name: "PDF to Word", slug: "pdf-to-word", description: "Convert PDF to Word documents" },
      { name: "PDF to Excel", slug: "pdf-to-excel", description: "Convert PDF to Excel or CSV" },
      { name: "PDF to Image", slug: "pdf-to-image", description: "Convert PDF to JPG, PNG, or TIFF" },
      { name: "PDF to PPT", slug: "pdf-to-ppt", description: "Convert PDF to PowerPoint" },
      { name: "PDF to Text", slug: "pdf-to-text", description: "Extract text from PDFs" }
    ]
  },
  toPDF: {
    name: "Convert TO PDF",
    tools: [
      { name: "HTML to PDF", slug: "html-to-pdf", description: "Convert HTML to PDF" },
      { name: "JPG to PDF", slug: "jpg-to-pdf", description: "Convert JPG images to PDF" },
      { name: "PNG to PDF", slug: "png-to-pdf", description: "Convert PNG images to PDF" },
      { name: "Word to PDF", slug: "word-to-pdf", description: "Convert Word documents to PDF" },
      { name: "PowerPoint to PDF", slug: "ppt-to-pdf", description: "Convert PowerPoint to PDF" },
      { name: "Excel to PDF", slug: "excel-to-pdf", description: "Convert Excel to PDF" }
    ]
  },
  security: {
    name: "Security",
    tools: [
      { name: "Protect PDF", slug: "protect-pdf", description: "Add password protection to PDFs" },
      { name: "Unlock PDF", slug: "unlock-pdf", description: "Remove password protection from PDFs" }
    ]
  },
  optimization: {
    name: "Extraction & Optimization",
    tools: [
      { name: "Extract Images", slug: "extract-images", description: "Extract images from PDFs" },
      { name: "Grayscale", slug: "grayscale", description: "Convert PDFs to grayscale" },
      { name: "Watermark", slug: "watermark", description: "Add text or image watermarks to PDFs" },
      { name: "Bates Numbering", slug: "bates-numbering", description: "Add Bates numbering to PDFs" },
      { name: "Create Bookmarks", slug: "create-bookmarks", description: "Create bookmarks in PDFs" },
      { name: "Edit Metadata", slug: "edit-metadata", description: "Edit PDF metadata" },
      { name: "Repair PDF", slug: "repair-pdf", description: "Repair corrupted PDFs" },
      { name: "Compress PDF", slug: "compress-pdf", description: "Compress PDFs to reduce file size" }
    ]
  },
  ocrScanning: {
    name: "OCR & Scanning",
    tools: [
      { name: "OCR", slug: "ocr", description: "Convert scanned PDFs to searchable text" },
      { name: "Deskew", slug: "deskew", description: "Deskew scanned PDFs" }
    ]
  }
};

// Get all tools as flat array
export function getAllTools() {
  const allTools = [];
  Object.values(toolCategories).forEach(category => {
    allTools.push(...category.tools);
  });
  return allTools;
}

// Get related tools for a given tool (same category + popular tools)
export function getRelatedTools(currentSlug, count = 4) {
  const allTools = getAllTools();
  const currentTool = allTools.find(t => t.slug === currentSlug);
  if (!currentTool) return allTools.slice(0, count);
  
  // Find tools in same category
  let related = [];
  Object.values(toolCategories).forEach(category => {
    if (category.tools.find(t => t.slug === currentSlug)) {
      related = category.tools.filter(t => t.slug !== currentSlug);
    }
  });
  
  // Add popular tools if needed
  const popularTools = ['merge-pdf', 'compress-pdf', 'pdf-to-word', 'word-to-pdf'];
  popularTools.forEach(slug => {
    if (!related.find(t => t.slug === slug) && slug !== currentSlug) {
      const tool = allTools.find(t => t.slug === slug);
      if (tool) related.push(tool);
    }
  });
  
  return related.slice(0, count);
}
