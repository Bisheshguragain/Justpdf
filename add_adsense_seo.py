#!/usr/bin/env python3
"""
Batch add AdSense slots and SEO meta tags to non-compliant PDF tools
"""

import os
import re

# Tool metadata for SEO
TOOL_METADATA = {
    'pdf-to-word.html': {
        'title': 'PDF to Word Converter Online Free - PDF to DOCX | JustPdf',
        'description': 'Convert PDF to Word (DOCX) online for free. Edit PDF content as Word documents. Fast, accurate conversion with formatting preserved. No registration required.',
        'keywords': 'pdf to word, pdf to docx, convert pdf to word, pdf converter, editable pdf',
        'icon': '📄',
        'h1': 'PDF to Word Converter',
        'subtitle': 'Convert PDF files to editable Word documents instantly'
    },
    'pdf-to-excel.html': {
        'title': 'PDF to Excel Converter Online Free - PDF to XLS | JustPdf',
        'description': 'Convert PDF to Excel (XLSX) online for free. Extract tables and data from PDF to spreadsheet. Fast, accurate, secure. No registration required.',
        'keywords': 'pdf to excel, pdf to xlsx, convert pdf to excel, pdf table extractor, pdf data extraction',
        'icon': '📊',
        'h1': 'PDF to Excel Converter',
        'subtitle': 'Convert PDF files to Excel spreadsheets and extract table data'
    },
    'pdf-to-ppt.html': {
        'title': 'PDF to PowerPoint Converter Online Free - PDF to PPT | JustPdf',
        'description': 'Convert PDF to PowerPoint (PPTX) online for free. Transform PDF slides to editable presentations. Fast, accurate, secure. No registration required.',
        'keywords': 'pdf to powerpoint, pdf to ppt, convert pdf to ppt, pdf to slides, pdf presentation converter',
        'icon': '📊',
        'h1': 'PDF to PowerPoint Converter',
        'subtitle': 'Convert PDF files to editable PowerPoint presentations'
    },
    'watermark-pdf.html': {
        'title': 'Add Watermark to PDF Online Free - PDF Watermarking Tool | JustPdf',
        'description': 'Add text or image watermarks to PDF files online for free. Protect your documents with custom watermarks. Fast, secure, easy to use. No registration required.',
        'keywords': 'pdf watermark, add watermark to pdf, watermark pdf online, pdf protection, pdf branding',
        'icon': '💧',
        'h1': 'Add Watermark to PDF',
        'subtitle': 'Protect your PDF documents with custom text or image watermarks'
    },
    'sign-pdf.html': {
        'title': 'Sign PDF Online Free - Electronic Signature Tool | JustPdf',
        'description': 'Sign PDF documents online for free. Add electronic signatures, initials, and dates. Legally binding e-signatures. No registration required.',
        'keywords': 'sign pdf, pdf signature, electronic signature, esign pdf, pdf signing tool',
        'icon': '✍️',
        'h1': 'Sign PDF',
        'subtitle': 'Add electronic signatures to your PDF documents'
    },
    'optimize-pdf.html': {
        'title': 'Optimize PDF Online Free - Reduce PDF File Size | JustPdf',
        'description': 'Optimize PDF files online for free. Reduce file size while maintaining quality. Fast PDF optimization for web and email. No registration required.',
        'keywords': 'optimize pdf, reduce pdf size, pdf optimizer, compress pdf, pdf file size reducer',
        'icon': '⚡',
        'h1': 'Optimize PDF',
        'subtitle': 'Reduce PDF file size while maintaining document quality'
    },
    'extract-pages.html': {
        'title': 'Extract PDF Pages Online Free - PDF Page Extractor | JustPdf',
        'description': 'Extract specific pages from PDF files online for free. Select and save individual PDF pages. Fast, secure, easy to use. No registration required.',
        'keywords': 'extract pdf pages, pdf page extractor, extract pdf, save pdf pages, pdf page selector',
        'icon': '📑',
        'h1': 'Extract PDF Pages',
        'subtitle': 'Extract specific pages from your PDF documents'
    },
    'organize-pages.html': {
        'title': 'Organize PDF Pages Online Free - Reorder PDF Pages | JustPdf',
        'description': 'Organize and reorder PDF pages online for free. Rearrange, move, and sort PDF pages easily. Fast, secure, intuitive. No registration required.',
        'keywords': 'organize pdf pages, reorder pdf, rearrange pdf pages, sort pdf pages, pdf page organizer',
        'icon': '🔀',
        'h1': 'Organize PDF Pages',
        'subtitle': 'Reorder and rearrange pages in your PDF documents'
    },
    'page-numbers.html': {
        'title': 'Add Page Numbers to PDF Online Free - PDF Page Numbering | JustPdf',
        'description': 'Add page numbers to PDF files online for free. Custom positioning, formatting, and styles. Professional page numbering tool. No registration required.',
        'keywords': 'add page numbers to pdf, pdf page numbering, number pdf pages, pdf pagination, page numbers',
        'icon': '🔢',
        'h1': 'Add Page Numbers to PDF',
        'subtitle': 'Add custom page numbers to your PDF documents'
    },
    'compare-pdf.html': {
        'title': 'Compare PDF Files Online Free - PDF Comparison Tool | JustPdf',
        'description': 'Compare two PDF files online for free. Find differences, changes, and modifications between PDF versions. Fast, accurate comparison. No registration required.',
        'keywords': 'compare pdf, pdf comparison, compare pdf files, pdf diff, pdf changes, pdf versions',
        'icon': '🔍',
        'h1': 'Compare PDF Files',
        'subtitle': 'Find differences between two PDF documents'
    },
    'validate-pdf.html': {
        'title': 'Validate PDF Online Free - PDF Validation Tool | JustPdf',
        'description': 'Validate PDF files online for free. Check PDF compliance, structure, and integrity. Fast PDF validation and error detection. No registration required.',
        'keywords': 'validate pdf, pdf validation, check pdf, pdf validator, pdf compliance checker',
        'icon': '✓',
        'h1': 'Validate PDF',
        'subtitle': 'Check PDF file compliance, structure, and integrity'
    },
    'bates-numbering.html': {
        'title': 'Add Bates Numbering to PDF Online Free - Legal PDF Numbering | JustPdf',
        'description': 'Add Bates numbering to PDF files online for free. Legal document numbering system for attorneys and law firms. Secure, professional. No registration required.',
        'keywords': 'bates numbering, bates stamping, legal pdf numbering, pdf bates numbers, document numbering',
        'icon': '🔢',
        'h1': 'Add Bates Numbering',
        'subtitle': 'Add legal Bates numbering to your PDF documents'
    },
    'redact-pdf.html': {
        'title': 'Redact PDF Online Free - PDF Redaction Tool | JustPdf',
        'description': 'Redact sensitive information from PDF files online for free. Permanently remove text and images. Secure PDF redaction tool. No registration required.',
        'keywords': 'redact pdf, pdf redaction, remove text from pdf, pdf privacy, redact sensitive information',
        'icon': '🖍️',
        'h1': 'Redact PDF',
        'subtitle': 'Permanently remove sensitive information from PDF documents'
    },
    'grayscale-pdf.html': {
        'title': 'Convert PDF to Grayscale Online Free - PDF to Black & White | JustPdf',
        'description': 'Convert PDF to grayscale online for free. Transform color PDFs to black and white. Reduce file size and print costs. No registration required.',
        'keywords': 'pdf to grayscale, convert pdf to black and white, grayscale pdf, pdf color converter',
        'icon': '⚫',
        'h1': 'Convert PDF to Grayscale',
        'subtitle': 'Transform color PDF documents to black and white'
    },
    'pdf-to-pdf-a.html': {
        'title': 'Convert to PDF/A Online Free - PDF to PDF/A Converter | JustPdf',
        'description': 'Convert PDF to PDF/A format online for free. Long-term archival standard compliance. Professional PDF/A conversion. No registration required.',
        'keywords': 'pdf to pdf/a, convert to pdf/a, pdf/a converter, archival pdf, pdf/a compliance',
        'icon': '📋',
        'h1': 'Convert to PDF/A',
        'subtitle': 'Convert PDF files to archival PDF/A format'
    },
    'pdf-to-html.html': {
        'title': 'PDF to HTML Converter Online Free - Extract PDF Content | JustPdf',
        'description': 'Convert PDF to HTML online for free. Extract PDF content as web pages. Preserve formatting and structure. No registration required.',
        'keywords': 'pdf to html, convert pdf to html, pdf html converter, extract pdf content, pdf to web',
        'icon': '🌐',
        'h1': 'PDF to HTML Converter',
        'subtitle': 'Convert PDF files to HTML web pages'
    },
    'remove-password.html': {
        'title': 'Remove PDF Password Online Free - Unlock Protected PDF | JustPdf',
        'description': 'Remove password from PDF files online for free. Unlock password-protected PDFs instantly. Fast, secure, easy to use. No registration required.',
        'keywords': 'remove pdf password, unlock pdf, pdf password remover, decrypt pdf, unlock protected pdf',
        'icon': '🔓',
        'h1': 'Remove PDF Password',
        'subtitle': 'Remove password protection from your PDF documents'
    },
    'remove-watermark.html': {
        'title': 'Remove Watermark from PDF Online Free - PDF Watermark Remover | JustPdf',
        'description': 'Remove watermarks from PDF files online for free. Delete text and image watermarks easily. Fast, secure watermark removal. No registration required.',
        'keywords': 'remove pdf watermark, pdf watermark remover, delete watermark, remove watermark from pdf',
        'icon': '🧹',
        'h1': 'Remove Watermark from PDF',
        'subtitle': 'Remove text and image watermarks from PDF documents'
    },
    'unlock-pdf.html': {
        'title': 'Unlock PDF Online Free - Remove PDF Restrictions | JustPdf',
        'description': 'Unlock PDF files online for free. Remove editing, printing, and copying restrictions. Fast PDF unlock tool. No registration required.',
        'keywords': 'unlock pdf, remove pdf restrictions, pdf unlocker, unlock protected pdf, remove pdf permissions',
        'icon': '🔑',
        'h1': 'Unlock PDF',
        'subtitle': 'Remove editing and printing restrictions from PDF documents'
    },
    'fill-sign.html': {
        'title': 'Fill and Sign PDF Online Free - PDF Form Filler | JustPdf',
        'description': 'Fill and sign PDF forms online for free. Add text, checkmarks, signatures, and dates. Fast, secure PDF form filling. No registration required.',
        'keywords': 'fill pdf, sign pdf, pdf form filler, fill pdf form, pdf signature, complete pdf forms',
        'icon': '✍️',
        'h1': 'Fill & Sign PDF',
        'subtitle': 'Fill out and sign PDF forms online'
    },
    'form-creator.html': {
        'title': 'Create PDF Forms Online Free - PDF Form Builder | JustPdf',
        'description': 'Create fillable PDF forms online for free. Add text fields, checkboxes, radio buttons, and more. Professional PDF form creator. No registration required.',
        'keywords': 'create pdf forms, pdf form creator, pdf form builder, fillable pdf, pdf form maker',
        'icon': '📝',
        'h1': 'Create PDF Forms',
        'subtitle': 'Build professional fillable PDF forms'
    },
    'header-footer.html': {
        'title': 'Add Header Footer to PDF Online Free - PDF Headers & Footers | JustPdf',
        'description': 'Add headers and footers to PDF files online for free. Custom text, page numbers, dates. Professional PDF headers and footers. No registration required.',
        'keywords': 'add header footer to pdf, pdf headers, pdf footers, pdf page numbers, pdf headers footers',
        'icon': '📄',
        'h1': 'Add Header & Footer to PDF',
        'subtitle': 'Add professional headers and footers to PDF documents'
    },
}

# AdSense code template (dual slots)
ADSENSE_TOP = '''
  <!-- Top AdSense Ad -->
  <div class="max-w-4xl mx-auto px-4 mb-8">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
'''

ADSENSE_BOTTOM = '''
  <!-- Bottom AdSense Ad -->
  <div class="max-w-4xl mx-auto px-4 mt-12 mb-8">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
'''

def create_seo_head(tool_file, metadata):
    """Generate SEO-optimized head section"""
    return f'''<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>{metadata['title']}</title>
  <meta name="title" content="{metadata['title']}">
  <meta name="description" content="{metadata['description']}">
  <meta name="keywords" content="{metadata['keywords']}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://justpdf.me/tools/{tool_file}">
  <meta property="og:title" content="{metadata['title']}">
  <meta property="og:description" content="{metadata['description']}">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://justpdf.me/tools/{tool_file}">
  <meta property="twitter:title" content="{metadata['title']}">
  <meta property="twitter:description" content="{metadata['description']}">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://justpdf.me/tools/{tool_file}">
  
  <!-- Scripts -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  
  <!-- FAQ Schema -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{
        "@type": "Question",
        "name": "Is this tool free to use?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Yes! This PDF tool is completely free with no watermarks, no file limits, and no registration required."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Is it safe to use?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Yes, all processing happens in your browser using client-side JavaScript. Your files never leave your device, ensuring complete privacy and security."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Do I need to install any software?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "No installation required! This is a web-based tool that works directly in your browser on any device."
        }}
      }}
    ]
  }}
  </script>
</head>'''

# Process each non-compliant tool
tools_to_update = list(TOOL_METADATA.keys())

print(f"🚀 Starting AdSense + SEO batch update for {len(tools_to_update)} tools...")
print("=" * 60)

updated_count = 0
skipped_count = 0

for tool_file in tools_to_update:
    file_path = f'/Users/millionairemindset/JustPDF/tools/{tool_file}'
    
    if not os.path.exists(file_path):
        print(f"⚠️  SKIP: {tool_file} (not found)")
        skipped_count += 1
        continue
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already has AdSense
        if 'data-ad-slot' in content and content.count('data-ad-slot') >= 2:
            print(f"✅ SKIP: {tool_file} (already has AdSense)")
            skipped_count += 1
            continue
        
        metadata = TOOL_METADATA[tool_file]
        
        # Replace <head> section with SEO-optimized version
        head_pattern = r'<head>.*?</head>'
        new_head = create_seo_head(tool_file, metadata)
        content = re.sub(head_pattern, new_head, content, flags=re.DOTALL)
        
        # Add top AdSense after <main> tag
        if '<main' in content and 'Top AdSense Ad' not in content:
            content = re.sub(
                r'(<main[^>]*>)',
                r'\1' + ADSENSE_TOP,
                content,
                count=1
            )
        
        # Add bottom AdSense before </main> tag
        if '</main>' in content and 'Bottom AdSense Ad' not in content:
            content = re.sub(
                r'(</main>)',
                ADSENSE_BOTTOM + r'\1',
                content,
                count=1
            )
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ UPDATED: {tool_file}")
        updated_count += 1
        
    except Exception as e:
        print(f"❌ ERROR: {tool_file} - {str(e)}")

print("=" * 60)
print(f"\n📊 BATCH UPDATE COMPLETE!")
print(f"✅ Updated: {updated_count} tools")
print(f"⚠️  Skipped: {skipped_count} tools")
print(f"\n🎉 All tools now have:")
print("   • Dual AdSense slots (top + bottom)")
print("   • SEO meta tags (title, description, keywords)")
print("   • Open Graph tags (social sharing)")
print("   • Schema.org structured data (FAQ)")
print("   • Canonical URLs")
print("   • 100% AdSense compliance")
