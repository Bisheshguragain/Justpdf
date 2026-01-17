# JustPdf.net – Serverless PDF Tools Platform

## Overview
JustPdf.net is a fully serverless, stateless, and database-free platform for PDF editing, conversion, and manipulation. All tools are implemented as serverless API endpoints, with a fast, SEO-optimized frontend. No logins, no subscriptions, no persistent storage.

## Folder Structure
```
/public           # Static assets (logo, icons, etc.)
/pages            # All frontend pages (homepage, tool pages, static pages)
/api              # Serverless functions for each tool
/components       # Shared UI components (navbar, footer, upload box, etc.)
/styles           # TailwindCSS config and global styles
/utils            # Rate limiting, helpers, file validation, etc.
```

## Serverless Architecture
- **No database, no persistent storage**
- **All PDF processing is stateless and in-memory**
- **Each tool is a serverless function (Node.js, e.g. Vercel/Netlify/Cloudflare Functions)**
- **File uploads handled via multipart/form-data**
- **Temporary files (if needed) stored in `/tmp` and auto-cleaned**
- **No user data stored**
- **Rate limiting via LocalStorage/cookies (frontend only)**
- **Future-proof: Auth/subscription logic can be added in API endpoints**

## Deployment
- Deploy to Vercel, Netlify, or Cloudflare Pages/Functions
- Add TailwindCSS build step (if needed)
- Set up AdSense and Analytics in `/public/index.html`

## Security
- File validation (type, size)
- No persistent storage
- CORS headers as needed
- Error handling for all endpoints

## Future-Proofing
- Auth/subscription checks can be added in each API endpoint (see comments)
- Stripe integration, user file history, and server-side rate limiting can be added later

## How to Add a New Tool
1. Create a new page in `/pages/tool-name.js`
2. Create a new serverless function in `/api/tool-name.js`
3. Add tool to homepage grid and related tools
4. Write SEO content and FAQ

## Rate Limiting
- 3 downloads per 24 hours per device (LocalStorage/cookie)
- No backend storage

## AdSense
- One ad per page, at the bottom (see `/components/AdSense.js`)

## Contact
- For support, see `/pages/contact.js`

---
