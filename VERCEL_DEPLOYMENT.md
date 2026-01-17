# 🚀 Vercel + Railway Deployment Guide

## Overview

Your JustPDF site uses a **hybrid architecture**:
- **Frontend**: Static files deployed on Vercel (fast, free, global CDN)
- **Backend**: Java API deployed on Railway (for PDF encryption only)

## ✅ Step-by-Step Deployment

### Phase 1: Deploy Backend to Railway

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Navigate to server directory
cd /Users/millionairemindset/JustPDF/server

# 4. Initialize and deploy
railway init
railway up

# 5. Get your API URL
railway domain
```

**Expected Output:**
```
Service available at: https://justpdf-api.railway.app
```

**Important:** Copy this URL! You'll need it in the next step.

---

### Phase 2: Update Frontend with API URL

Open `tools/protect-pdf.html` and update line 180:

**Before:**
```javascript
const API_URL = 'http://localhost:8080'; // Change to your Railway/AWS/Heroku URL
```

**After:**
```javascript
const API_URL = 'https://justpdf-api.railway.app'; // ← Your Railway URL
```

**💡 Tip:** Use find-and-replace to make sure you get the exact line.

---

### Phase 3: Deploy Frontend to Vercel

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Go to your project root
cd /Users/millionairemindset/JustPDF

# 3. Login to Vercel
vercel login

# 4. Deploy!
vercel

# 5. For production deployment
vercel --prod
```

**Vercel will ask:**
```
? Set up and deploy "~/JustPDF"? [Y/n] y
? Which scope do you want to deploy to? Your Account
? Link to existing project? [y/N] n
? What's your project's name? justpdf
? In which directory is your code located? ./
```

**Expected Output:**
```
✅ Production: https://justpdf.vercel.app
```

---

### Phase 4: Test the Complete Setup

1. **Visit your Vercel site:**
   ```
   https://justpdf.vercel.app/tools/protect-pdf.html
   ```

2. **Test the PDF protection:**
   - Upload a PDF file
   - Enter a password (min 6 characters)
   - Click "Protect PDF with Password"
   - Download the protected PDF
   - Try opening it (should ask for password!)

3. **Verify encryption:**
   - Open the protected PDF in any PDF reader
   - It should require the password you set
   - Without the password, it should be inaccessible

---

## 🔧 Configuration Files

### Current `vercel.json`
Your existing `vercel.json` is already configured for static deployment:

```json
{
  "version": 2,
  "name": "justpdf",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

**This is perfect!** It serves all static files directly.

### Optional: Environment Variables (Alternative Approach)

If you want to avoid hardcoding the API URL in your HTML, you can use Vercel environment variables:

**1. Add to `vercel.json`:**
```json
{
  "version": 2,
  "name": "justpdf",
  "env": {
    "API_URL": "https://justpdf-api.railway.app"
  }
}
```

**2. Or set via Vercel dashboard:**
```
Settings > Environment Variables
Name: API_URL
Value: https://justpdf-api.railway.app
```

**3. Update `protect-pdf.html`:**
```javascript
const API_URL = window.ENV?.API_URL || 'https://justpdf-api.railway.app';
```

---

## 🛡️ CORS Configuration

Your backend is already configured for CORS! In `server/src/main/java/.../PdfProtectionController.java`:

```java
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PdfProtectionController {
    // ...
}
```

This allows your Vercel frontend to call your Railway backend without CORS errors.

**🔒 Security Note:** For production, you should restrict CORS to your domain:

```java
@CrossOrigin(origins = "https://justpdf.vercel.app")
```

---

## 📊 Architecture Diagram

```
User Browser
    │
    ├──→ Static Pages (HTML/CSS/JS)
    │         └──→ Vercel CDN (justpdf.vercel.app)
    │
    └──→ API Calls (/api/protect-pdf)
              └──→ Railway Backend (justpdf-api.railway.app)
                        └──→ AES-256 Encryption
                        └──→ Return Protected PDF
```

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Starting)

| Service | Cost | Limits |
|---------|------|--------|
| **Vercel** | $0 | 100GB bandwidth/month |
| **Railway** | $0 | $5 credit/month (~500 hours) |
| **Total** | **$0/month** | Good for moderate traffic |

### If You Scale Up

| Service | Cost | When Needed |
|---------|------|-------------|
| **Vercel** | $20/mo | >100GB bandwidth |
| **Railway** | Pay-as-you-go | After free credit |
| **Cloudflare** | $0 | Unlimited bandwidth (cache static) |

---

## 🚨 Common Issues & Solutions

### Issue 1: CORS Error
**Error:** `Access to fetch at 'https://...' has been blocked by CORS policy`

**Solution:**
- Make sure `@CrossOrigin` annotation is in your controller
- Verify Railway backend is running: `curl https://justpdf-api.railway.app/api/protect-pdf`

### Issue 2: 404 Not Found
**Error:** `POST https://justpdf-api.railway.app/api/protect-pdf 404`

**Solution:**
- Check Railway deployment logs: `railway logs`
- Verify the Spring Boot app is running
- Test endpoint: `curl -X POST https://your-url.railway.app/api/protect-pdf`

### Issue 3: API URL Not Updated
**Error:** `Failed to fetch` or connection refused

**Solution:**
- Search for `localhost:8080` in `protect-pdf.html`
- Replace with your Railway URL
- Commit and redeploy to Vercel

### Issue 4: Railway Deployment Fails
**Error:** Build or deployment error

**Solution:**
```bash
# Check logs
railway logs

# Rebuild and deploy
railway up --force

# Verify Java version
railway run java -version
```

---

## 🧪 Testing Checklist

Before going live:

- [ ] Backend deployed to Railway and accessible
- [ ] API URL updated in `protect-pdf.html`
- [ ] Frontend deployed to Vercel
- [ ] All other tools still work (merge, split, etc.)
- [ ] PDF protection works end-to-end
- [ ] Password-protected PDF opens in Adobe Reader
- [ ] Test on mobile devices
- [ ] Test with large files (>10MB)
- [ ] CORS is working (no console errors)
- [ ] Google AdSense loads correctly

---

## 🎯 Quick Start Commands

```bash
# Terminal 1: Deploy Backend
cd /Users/millionairemindset/JustPDF/server
railway login
railway init
railway up
railway domain  # Copy this URL!

# Terminal 2: Update Frontend & Deploy
cd /Users/millionairemindset/JustPDF
# Update protect-pdf.html with Railway URL
vercel login
vercel --prod

# Done! Visit https://justpdf.vercel.app
```

---

## 📝 Post-Deployment

### Monitor Your Services

**Railway:**
```bash
railway logs          # View real-time logs
railway status        # Check service status
railway metrics       # Usage statistics
```

**Vercel:**
```bash
vercel logs          # View deployment logs
vercel ls            # List deployments
```

### Update Your DNS (Optional)

If you have a custom domain (e.g., `justpdf.net`):

**For Vercel:**
1. Go to Vercel Dashboard > Project Settings > Domains
2. Add `justpdf.net`
3. Update DNS records as instructed

**For Railway:**
1. Add custom domain in Railway dashboard
2. Point a subdomain (e.g., `api.justpdf.net`) to Railway

---

## 🎉 Success!

Once deployed, you'll have:

✅ **Lightning-fast static site** on Vercel's global CDN  
✅ **Real PDF encryption** via Railway backend  
✅ **Zero ongoing maintenance** (both are managed platforms)  
✅ **Free tier** for moderate traffic  
✅ **Professional infrastructure** without managing servers  

**Live URLs:**
- Frontend: `https://justpdf.vercel.app`
- Backend: `https://justpdf-api.railway.app`
- Protect PDF: `https://justpdf.vercel.app/tools/protect-pdf.html`

---

## 🆘 Need Help?

If you encounter issues:

1. **Check Railway logs:** `railway logs`
2. **Check Vercel logs:** `vercel logs`
3. **Test API directly:** `curl -X POST https://your-railway-url/api/protect-pdf`
4. **Verify CORS:** Check browser console for errors
5. **Review docs:**
   - Railway: https://docs.railway.app
   - Vercel: https://vercel.com/docs

**Everything is set up correctly - you just need to deploy! 🚀**
