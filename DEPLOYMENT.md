# JustPdf.net - Complete Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Vercel/Netlify/Cloudflare account created

### 2. Configuration
- [ ] Update AdSense publisher ID in all HTML files
- [ ] Add custom logo to `/public/logo.png`
- [ ] Update domain in all meta tags and canonical URLs
- [ ] Configure environment variables (if any)

### 3. Content Review
- [ ] All SEO content reviewed and customized
- [ ] Privacy Policy updated with your details
- [ ] Terms of Use reviewed
- [ ] Contact information updated

---

## 🚀 Deployment to Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Link Project
```bash
cd /path/to/JustPDF
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **justpdf**
- Directory? **./`**
- Override settings? **N**

### Step 4: Configure Domain
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain: **justpdf.net**
3. Follow DNS configuration instructions
4. Add **www.justpdf.net** as an alias

### Step 5: Configure Build Settings
In Vercel Dashboard → Settings → General:
- **Build Command**: `npm run build:css`
- **Output Directory**: `./`
- **Install Command**: `npm install`
- **Node Version**: 18.x

### Step 6: Deploy to Production
```bash
vercel --prod
```

### Step 7: Set Environment Variables (if needed)
```bash
vercel env add NODE_ENV production
```

---

## 🌐 Deployment to Netlify

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Initialize Project
```bash
cd /path/to/JustPDF
netlify init
```

Follow the prompts:
- Create & configure a new site? **Yes**
- Team? Select your team
- Site name? **justpdf**
- Build command? `npm run build:css`
- Directory to deploy? `./`
- Functions directory? `api`

### Step 4: Configure netlify.toml
Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build:css"
  functions = "api"
  publish = "."

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### Step 5: Deploy
```bash
netlify deploy --prod
```

### Step 6: Configure Domain
1. Go to Netlify Dashboard → Domain Settings
2. Add custom domain: **justpdf.net**
3. Configure DNS (A record or CNAME)
4. Enable HTTPS

---

## ☁️ Deployment to Cloudflare Pages

### Step 1: Connect Repository
1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect your GitHub/GitLab repository
4. Select the JustPDF repository

### Step 2: Configure Build Settings
- **Production branch**: `main`
- **Build command**: `npm run build:css`
- **Build output directory**: `/`
- **Root directory**: `/`

### Step 3: Environment Variables
Add if needed:
- `NODE_ENV`: `production`

### Step 4: Configure Functions
Create `_worker.js` in project root:
```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Route API requests to functions
    if (url.pathname.startsWith('/api/')) {
      // Handle serverless functions
      return new Response('Function handling', { status: 200 });
    }
    
    // Serve static files
    return env.ASSETS.fetch(request);
  }
};
```

### Step 5: Deploy
- Click "Save and Deploy"
- Wait for build to complete
- Configure custom domain in Cloudflare Pages settings

---

## 🔧 Post-Deployment Configuration

### 1. DNS Configuration

#### For Vercel:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### For Netlify:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: <your-site>.netlify.app
```

#### For Cloudflare Pages:
- Cloudflare automatically configures DNS if domain is on Cloudflare

### 2. SSL/HTTPS
- All platforms provide free SSL certificates
- Ensure "Force HTTPS" is enabled
- Verify certificate is active (green padlock in browser)

### 3. Performance Optimization
- Enable CDN caching
- Configure asset compression (gzip/brotli)
- Set cache headers for static assets
- Enable HTTP/2 or HTTP/3

### 4. Google Search Console
1. Verify ownership of justpdf.net
2. Submit sitemap (create sitemap.xml)
3. Monitor indexing status
4. Fix any crawl errors

### 5. Google AdSense
1. Apply for AdSense account (if not already approved)
2. Replace placeholder publisher ID in all HTML files:
   ```html
   data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
   ```
3. Create ad units for each placement
4. Update ad slot IDs in HTML files

### 6. Analytics Setup
Add Google Analytics to all pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 📊 Monitoring & Maintenance

### 1. Uptime Monitoring
- Use services like UptimeRobot or Pingdom
- Monitor critical endpoints:
  - Homepage: https://justpdf.net
  - API health: https://justpdf.net/api/health
  - Popular tools: /tools/compress-pdf/, /tools/merge-pdf/

### 2. Error Tracking
- Implement Sentry or similar error tracking
- Monitor serverless function errors
- Set up alerts for critical failures

### 3. Performance Monitoring
- Monitor Core Web Vitals (LCP, FID, CLS)
- Use Google PageSpeed Insights
- Track serverless function execution times
- Monitor API response times

### 4. Regular Updates
- Update dependencies monthly: `npm update`
- Review and update SEO content quarterly
- Add new tools based on user demand
- Monitor and fix broken links

---

## 🔐 Security Best Practices

### 1. API Rate Limiting
- Implement server-side rate limiting for production
- Use Vercel/Netlify/Cloudflare built-in protections
- Consider adding API keys for high-volume users

### 2. File Upload Security
- Validate file types and sizes strictly
- Scan uploaded files for malware (if volume increases)
- Implement request size limits
- Add CAPTCHA if bot abuse detected

### 3. CORS Configuration
Add CORS headers to API responses:
```javascript
res.setHeader('Access-Control-Allow-Origin', 'https://justpdf.net');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

### 4. Content Security Policy
Add CSP headers:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://cdn.tailwindcss.com https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';">
```

---

## 📈 SEO Checklist

- [ ] All pages have unique titles and descriptions
- [ ] OpenGraph tags configured
- [ ] Structured data (JSON-LD) added to tool pages
- [ ] Sitemap.xml created and submitted
- [ ] robots.txt configured
- [ ] Internal linking structure complete
- [ ] Mobile-friendly (test with Google Mobile-Friendly Test)
- [ ] Page speed optimized (score 90+ on PageSpeed Insights)
- [ ] HTTPS enabled
- [ ] Canonical URLs set

---

## 🎯 Launch Checklist

- [ ] All tools tested and working
- [ ] All pages render correctly on mobile/desktop
- [ ] Rate limiting tested
- [ ] File upload/download tested
- [ ] AdSense ads displaying correctly
- [ ] Analytics tracking verified
- [ ] Error pages created (404, 500)
- [ ] Privacy Policy and Terms of Use reviewed
- [ ] Contact form tested (if applicable)
- [ ] Domain SSL certificate verified
- [ ] Search Console verified
- [ ] Social media accounts created and linked
- [ ] Initial content marketing plan prepared

---

## 🚨 Troubleshooting

### API Endpoints Not Working
- Check serverless function logs in platform dashboard
- Verify API routes in vercel.json/netlify.toml
- Test locally with `vercel dev` or `netlify dev`

### File Uploads Failing
- Check file size limits (25MB default)
- Verify MIME type validation
- Check serverless function timeout (increase if needed)
- Review temp file cleanup logic

### Slow Performance
- Enable CDN caching
- Optimize images and assets
- Minimize JavaScript bundle size
- Use lazy loading for images

### Rate Limiting Not Working
- Verify LocalStorage is enabled in browser
- Check cookie settings
- Test in incognito/private mode

---

## 📞 Support Resources

- Vercel Documentation: https://vercel.com/docs
- Netlify Documentation: https://docs.netlify.com
- Cloudflare Pages: https://developers.cloudflare.com/pages
- pdf-lib Documentation: https://pdf-lib.js.org
- TailwindCSS Documentation: https://tailwindcss.com/docs

---

**Ready to launch! 🚀**
