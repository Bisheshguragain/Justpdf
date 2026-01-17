# JustPdf.net - Serverless PDF Tools Platform

![JustPdf Logo](https://justpdf.net/public/logo.png)

## Overview

JustPdf.net is a production-ready, fully serverless PDF tools platform offering 40+ PDF manipulation tools. Built with modern web technologies, it provides fast, secure, and private PDF processing without requiring user registration or subscriptions.

## 🎯 Features

- **40+ PDF Tools** - Complete suite of PDF editing, conversion, and manipulation tools
- **100% Serverless** - Built on serverless architecture (Vercel/Netlify/Cloudflare)
- **100% Stateless** - No database, no persistent storage
- **Privacy-First** - Files are never stored, processed in real-time with automatic cleanup
- **No Registration** - Use all tools without creating an account
- **SEO-Optimized** - Every tool page has 800-1500 words of unique content
- **Mobile-First** - Fully responsive design using TailwindCSS
- **Rate Limiting** - Client-side rate limiting (3 downloads per 24 hours) using LocalStorage/cookies
- **Future-Proof** - Architecture designed for easy addition of auth and subscriptions

## 📁 Project Structure

```
/JustPDF
├── /api                    # Serverless API endpoints
│   ├── merge-pdf.js       # Merge PDF files
│   └── /tools             # All tool endpoints
│       ├── compress-pdf.js
│       ├── split-pdf.js
│       ├── pdf-to-word.js
│       └── ... (40+ endpoints)
├── /components            # Reusable UI components (JS exports)
│   ├── Navbar.js
│   ├── Footer.js
│   ├── UploadBox.js
│   └── ...
├── /pages                 # Frontend pages (JS exports)
│   ├── index.js          # Homepage
│   ├── about.js
│   ├── contact.js
│   └── /tools            # Tool pages (placeholders)
├── /js                    # Client-side JavaScript
│   └── compress-pdf.js   # Example: Compress PDF client logic
├── /public               # Static assets
│   └── styles.css        # Compiled TailwindCSS
├── /styles
│   └── global.css        # TailwindCSS source
├── /utils                # Utility functions
│   ├── rateLimit.js      # Rate limiting logic
│   ├── fileValidation.js
│   └── toolRegistry.js   # Central tool registry
├── compress-pdf.html     # Example: Full tool page (HTML)
├── package.json
├── tailwind.config.js
├── vercel.json           # Vercel deployment config
└── README.md
```

## 🛠️ Tools Included

### PDF Editing & Annotation
- PDF Editor, Fill & Sign, Remove Annotations

### Page Manipulation
- Delete Pages, Merge PDF, Split PDF, Extract Pages, Crop PDF, Rotate PDF, Header & Footer, Page Numbers, Organize Pages

### Conversions FROM PDF
- PDF to Word, PDF to Excel, PDF to Image, PDF to PPT, PDF to Text

### Conversions TO PDF
- HTML to PDF, JPG to PDF, PNG to PDF, Word to PDF, PowerPoint to PDF, Excel to PDF

### Security
- Protect PDF, Unlock PDF

### Extraction & Optimization
- Extract Images, Grayscale, Watermark, Bates Numbering, Create Bookmarks, Edit Metadata, Repair PDF, Compress PDF

### OCR & Scanning
- OCR, Deskew

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/justpdf.git
cd justpdf

# Install dependencies
npm install

# Build TailwindCSS
npm run build:css

# Run development server (Vercel)
npm run dev
```

### Development

```bash
# Watch TailwindCSS changes
npm run watch:css

# Run Vercel development server
vercel dev
```

## 📦 Dependencies

### Core Libraries
- `pdf-lib` - PDF manipulation
- `pdf-parse` - PDF text extraction
- `pdfkit` - PDF generation
- `sharp` - Image processing
- `mammoth` - Word document conversion
- `tesseract.js` - OCR processing
- `formidable` - File upload handling

### Dev Dependencies
- `tailwindcss` - CSS framework
- `vercel` - Deployment platform

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
npm run deploy
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Deploy to Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build:css`
3. Set output directory: `/`
4. Deploy

## 🔒 Security & Privacy

- **No File Storage** - All processing is done in-memory with automatic cleanup
- **Serverless Architecture** - Files are processed statelessly
- **File Validation** - Strict file type and size validation
- **Rate Limiting** - Client-side rate limiting to prevent abuse
- **HTTPS Only** - All traffic encrypted in transit

## 📈 SEO Optimization

Every tool page includes:
- **Meta Tags** - Title, description, OpenGraph tags
- **Structured Data** - FAQ schema (JSON-LD)
- **Canonical URLs** - Prevent duplicate content
- **Internal Linking** - Related tools and category pages
- **Rich Content** - 800-1500 words of unique, valuable content
- **Mobile-First** - Responsive design for better rankings
- **Fast Loading** - Optimized for Core Web Vitals

## 💰 Monetization

### Google AdSense
- One ad per tool page (bottom placement)
- Non-intrusive, doesn't interfere with tool usage
- Placeholder code included (replace with your publisher ID)

### Future: Premium Features
The architecture supports adding:
- User authentication
- Stripe subscriptions (weekly, monthly, annual)
- Unlimited downloads for paid users
- Ad-free experience for subscribers
- Server-side rate limiting
- User file history

## 🔮 Future-Proofing

All API endpoints include commented placeholders for:
```javascript
// TODO: FUTURE - Add authentication check here
// if (!isAuthenticated(req)) { return res.status(401).json({ error: 'Unauthorized' }); }

// TODO: FUTURE - Check subscription status for unlimited access
// if (!hasActiveSubscription(req.user)) { /* apply rate limits */ }
```

## 📊 Rate Limiting

Current implementation:
- 3 downloads per 24 hours per device
- Uses LocalStorage (primary) and cookies (fallback)
- Client-side only (no server storage)

Future implementation:
- Server-side rate limiting with authentication
- Per-user limits based on subscription tier
- API key support for enterprise users

## 🎨 Customization

### Branding
- Update logo in `/public/logo.png`
- Change colors in `tailwind.config.js`
- Modify footer/header in component files

### Adding New Tools
1. Create HTML page in `/tools/your-tool.html`
2. Create client JS in `/js/your-tool.js`
3. Create API endpoint in `/api/tools/your-tool.js`
4. Add to tool registry in `/utils/toolRegistry.js`
5. Update homepage grid

## 🧪 Testing

```bash
# Test a specific endpoint locally
curl -X POST http://localhost:3000/api/tools/compress-pdf \
  -F "file=@test.pdf" \
  --output compressed.pdf
```

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

- Email: support@justpdf.net
- Website: https://justpdf.net/contact
- Issues: https://github.com/yourusername/justpdf/issues

## 🙏 Acknowledgments

- pdf-lib for PDF manipulation
- TailwindCSS for styling
- Vercel for serverless hosting
- All open-source contributors

---

**Built with ❤️ for the PDF community**
