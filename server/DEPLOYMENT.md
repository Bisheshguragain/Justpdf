# JustPDF Protection API - Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Railway.app (Recommended - FREE)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project (from /server directory)
   cd server
   railway init
   
   # Deploy
   railway up
   ```

3. **Get Your API URL**
   - Railway will give you a URL like: `https://your-app.railway.app`
   - Copy this URL

4. **Update Frontend**
   - Open `tools/protect-pdf.html`
   - Replace `API_URL` with your Railway URL

---

### Option 2: AWS Lambda (Scalable)

1. **Build JAR**
   ```bash
   cd server
   mvn clean package
   ```

2. **Deploy to Lambda**
   - Upload `target/pdf-protection-api-1.0.0.jar` to AWS Lambda
   - Set handler: `net.justpdf.api.PdfProtectionApplication`
   - Memory: 512MB
   - Timeout: 30 seconds

3. **Create API Gateway**
   - Create REST API
   - Add POST endpoint: `/api/protect-pdf`
   - Connect to Lambda function

---

### Option 3: Heroku (Easy)

1. **Create Heroku App**
   ```bash
   cd server
   heroku create justpdf-protection-api
   ```

2. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

3. **Your API URL**
   - `https://justpdf-protection-api.herokuapp.com`

---

## 🧪 Test Locally

```bash
cd server
mvn clean install
mvn spring-boot:run
```

Server runs on: `http://localhost:8080`

Test endpoint:
```bash
curl -X POST http://localhost:8080/api/protect-pdf \
  -F "file=@test.pdf" \
  -F "password=mypassword" \
  --output protected.pdf
```

---

## 📝 Environment Variables

No database or secrets needed! This is a stateless API.

Optional:
- `PORT` - Server port (default: 8080)

---

## 💰 Cost Estimate

### Railway.app FREE Tier:
- ✅ $5/month free credit
- ✅ Enough for ~10,000 requests/month
- ✅ Auto-sleeps when idle

### AWS Lambda FREE Tier:
- ✅ 1M requests/month free
- ✅ 400,000 GB-seconds free compute
- ✅ Pay only for what you use

### Heroku:
- 💵 $7/month (Eco Dynos)
- Always running

---

## 🔒 Security Notes

- ✅ No data stored (stateless)
- ✅ Files encrypted in memory
- ✅ No database needed
- ✅ CORS enabled for your domain
- ✅ Files never written to disk

---

## 📊 What This Costs

**Expected traffic:** 100-500 PDF protections/day

| Platform | Monthly Cost |
|----------|--------------|
| Railway  | **$0-3**     |
| AWS Lambda | **$0**     |
| Heroku   | **$7**       |

**Recommendation:** Start with Railway (free), scale to AWS Lambda if needed.
