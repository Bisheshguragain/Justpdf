# PDF to Word Converter - Deployment Guide

## 🎯 Deployment Options

Choose your deployment platform based on your needs:

| Platform | Cost | Setup Time | Scalability | Best For |
|----------|------|------------|-------------|----------|
| **Local Server** | Free | 5 min | Manual | Development/Testing |
| **Heroku** | $7/mo | 10 min | Auto | Small projects |
| **AWS Lambda** | Pay-per-use | 30 min | Auto | Production |
| **Google Cloud Run** | Pay-per-use | 15 min | Auto | Production |
| **Azure Functions** | Pay-per-use | 30 min | Auto | Production |
| **DigitalOcean** | $5/mo | 20 min | Manual | Mid-size projects |

---

## 🏠 Option 1: Local Development

### Setup

```bash
# 1. Navigate to server directory
cd /Users/millionairemindset/JustPDF/server

# 2. Install dependencies
mvn clean install

# 3. Run server
mvn spring-boot:run
```

Server runs at `http://localhost:8080`

### Frontend Configuration

Update API endpoint in `pdf-to-word-COMPLETE.html`:

```javascript
const API_ENDPOINT = 'http://localhost:8080/api/convert/pdf-to-word';
```

---

## 🟣 Option 2: Heroku Deployment

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

```bash
# 1. Login to Heroku
heroku login

# 2. Create app
cd /Users/millionairemindset/JustPDF/server
heroku create justpdf-converter

# 3. Add Java buildpack
heroku buildpacks:set heroku/java

# 4. Create Procfile
echo "web: java -Dserver.port=\$PORT -jar target/*.jar" > Procfile

# 5. Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# 6. Open app
heroku open
```

### Environment Variables

```bash
heroku config:set JAVA_OPTS="-Xmx1024m"
heroku config:set SPRING_PROFILES_ACTIVE=production
```

### Frontend Configuration

```javascript
const API_ENDPOINT = 'https://justpdf-converter.herokuapp.com/api/convert/pdf-to-word';
```

---

## 🟠 Option 3: AWS Lambda Deployment

### Prerequisites
- AWS account
- AWS CLI configured
- Maven installed

### Steps

#### 1. Update pom.xml

Add AWS Lambda dependency:

```xml
<dependency>
    <groupId>com.amazonaws.serverless</groupId>
    <artifactId>aws-serverless-java-container-springboot3</artifactId>
    <version>2.0.0</version>
</dependency>
```

#### 2. Create Lambda Handler

```java
package net.justpdf.converter;

import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class LambdaHandler implements RequestStreamHandler {
    private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    static {
        try {
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(ConverterApplication.class);
        } catch (Exception e) {
            throw new RuntimeException("Could not initialize Lambda handler", e);
        }
    }

    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        handler.proxyStream(input, output, context);
    }
}
```

#### 3. Build and Package

```bash
mvn clean package
```

#### 4. Deploy to Lambda

```bash
# Create Lambda function
aws lambda create-function \
    --function-name pdf-to-word-converter \
    --runtime java17 \
    --handler net.justpdf.converter.LambdaHandler::handleRequest \
    --zip-file fileb://target/pdf-to-word-converter.jar \
    --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
    --timeout 300 \
    --memory-size 1024

# Create API Gateway
aws apigatewayv2 create-api \
    --name pdf-converter-api \
    --protocol-type HTTP \
    --target arn:aws:lambda:REGION:ACCOUNT_ID:function:pdf-to-word-converter
```

#### 5. Frontend Configuration

```javascript
const API_ENDPOINT = 'https://YOUR_API_ID.execute-api.REGION.amazonaws.com/api/convert/pdf-to-word';
```

---

## 🔵 Option 4: Google Cloud Run

### Prerequisites
- Google Cloud account
- gcloud CLI installed

### Steps

```bash
# 1. Login and set project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 2. Build Docker image
cd /Users/millionairemindset/JustPDF/server
docker build -t gcr.io/YOUR_PROJECT_ID/pdf-converter .

# 3. Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/pdf-converter

# 4. Deploy to Cloud Run
gcloud run deploy pdf-converter \
    --image gcr.io/YOUR_PROJECT_ID/pdf-converter \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 2Gi \
    --timeout 300

# 5. Get URL
gcloud run services describe pdf-converter --region us-central1 --format='value(status.url)'
```

### Frontend Configuration

```javascript
const API_ENDPOINT = 'https://pdf-converter-HASH-uc.a.run.app/api/convert/pdf-to-word';
```

---

## 🟡 Option 5: Azure Functions

### Prerequisites
- Azure account
- Azure CLI installed

### Steps

```bash
# 1. Login
az login

# 2. Create resource group
az group create --name pdf-converter-rg --location eastus

# 3. Create storage account
az storage account create \
    --name pdfconverterstorage \
    --resource-group pdf-converter-rg \
    --location eastus

# 4. Create function app
az functionapp create \
    --resource-group pdf-converter-rg \
    --name pdf-converter-app \
    --storage-account pdfconverterstorage \
    --runtime java \
    --runtime-version 17 \
    --functions-version 4 \
    --os-type Linux

# 5. Deploy
mvn clean package azure-functions:deploy
```

### Frontend Configuration

```javascript
const API_ENDPOINT = 'https://pdf-converter-app.azurewebsites.net/api/convert/pdf-to-word';
```

---

## 🟢 Option 6: DigitalOcean Droplet

### Prerequisites
- DigitalOcean account
- SSH access to droplet

### Steps

```bash
# 1. Create droplet (Ubuntu 22.04, 2GB RAM)
# Via DigitalOcean dashboard

# 2. SSH to droplet
ssh root@YOUR_DROPLET_IP

# 3. Install Java 17
apt update
apt install -y openjdk-17-jdk maven

# 4. Upload JAR
# On local machine:
cd /Users/millionairemindset/JustPDF/server
mvn clean package
scp target/*.jar root@YOUR_DROPLET_IP:/opt/pdf-converter/

# 5. On droplet, create systemd service
cat > /etc/systemd/system/pdf-converter.service << 'EOF'
[Unit]
Description=PDF to Word Converter
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/pdf-converter
ExecStart=/usr/bin/java -Xmx1024m -jar /opt/pdf-converter/*.jar
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# 6. Start service
systemctl daemon-reload
systemctl enable pdf-converter
systemctl start pdf-converter

# 7. Install Nginx reverse proxy
apt install -y nginx
cat > /etc/nginx/sites-available/pdf-converter << 'EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

ln -s /etc/nginx/sites-available/pdf-converter /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Frontend Configuration

```javascript
const API_ENDPOINT = 'http://YOUR_DROPLET_IP/api/convert/pdf-to-word';
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
cd /Users/millionairemindset/JustPDF
vercel --prod
```

### Option 2: Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Deploy
cd /Users/millionairemindset/JustPDF
netlify deploy --prod
```

### Option 3: GitHub Pages

```bash
# 1. Create gh-pages branch
git checkout -b gh-pages

# 2. Copy files
cp -r tools/* .

# 3. Push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

---

## 🔒 Security Best Practices

### 1. Enable HTTPS

```bash
# For DigitalOcean/custom server with Let's Encrypt
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

### 2. Configure CORS Properly

In `application.properties`:

```properties
# Production: Restrict to your domain
cors.allowed-origins=https://yourdomain.com

# Development: Allow localhost
cors.allowed-origins=http://localhost:3000,https://yourdomain.com
```

### 3. Set Environment Variables

```bash
# Never commit sensitive data
export DB_PASSWORD=secret
export API_KEY=secret
```

### 4. Enable Rate Limiting

Add to `pom.xml`:

```xml
<dependency>
    <groupId>com.github.vladimir-bukhtoyarov</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>8.1.1</version>
</dependency>
```

---

## 📊 Monitoring & Logging

### Application Logs

```bash
# Heroku
heroku logs --tail

# AWS Lambda
aws logs tail /aws/lambda/pdf-to-word-converter --follow

# DigitalOcean
journalctl -u pdf-converter -f
```

### Health Monitoring

```bash
# Setup cron job to check health
crontab -e

# Add:
*/5 * * * * curl -s https://your-api.com/api/convert/health || echo "API DOWN" | mail -s "API Alert" you@email.com
```

---

## 🚀 Performance Optimization

### 1. Increase Memory

```bash
# Java
java -Xmx2048m -jar app.jar

# Docker
docker run -m 2g your-image

# Lambda
aws lambda update-function-configuration \
    --function-name pdf-to-word-converter \
    --memory-size 2048
```

### 2. Enable Caching

Add Redis for caching frequently converted PDFs:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 3. Connection Pooling

```properties
# application.properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

---

## 🧪 Post-Deployment Testing

```bash
# Test API endpoint
curl -X POST https://your-api.com/api/convert/pdf-to-word \
  -F "file=@test.pdf" \
  -o output.docx

# Verify output
file output.docx

# Load testing (if apache bench installed)
ab -n 100 -c 10 https://your-api.com/api/convert/health
```

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue:** Out of memory errors
**Solution:** Increase heap size or container memory

**Issue:** Timeout on large files
**Solution:** Increase timeout in application.properties and cloud platform

**Issue:** CORS errors
**Solution:** Check allowed origins in configuration

**Issue:** Slow conversion
**Solution:** Upgrade instance size, optimize code, add caching

---

## ✅ Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend updated with correct API endpoint
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Logs accessible
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Health checks configured
- [ ] Performance tested
- [ ] Security reviewed
- [ ] Documentation updated

---

**Last Updated:** January 4, 2026
