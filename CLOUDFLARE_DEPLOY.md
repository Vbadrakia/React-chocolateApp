# 🚀 Cloudflare Pages Deployment Guide

**Issue**: Old UI still showing at https://react-chocolateapp.pages.dev  
**Solution**: Manual deployment needed for Cloudflare Pages

## Why Auto-Deploy Didn't Work

Cloudflare Pages doesn't automatically deploy from GitHub unless:
1. The GitHub repository is connected in Cloudflare dashboard
2. Auto-deployment is enabled in project settings
3. Build settings are correctly configured

## Solution: Manual Deployment

### Option 1: Using Wrangler CLI (Fastest)

**Step 1: Install Wrangler**
```bash
npm install -g wrangler
```

**Step 2: Login to Cloudflare**
```bash
wrangler login
```

**Step 3: Deploy**
```bash
cd chocolate-frontend
npm run build
wrangler pages deploy dist --project-name=react-chocolateapp
```

### Option 2: Via Cloudflare Dashboard

**Step 1: Build Locally**
```bash
cd chocolate-frontend
npm run build
```

**Step 2: Upload to Cloudflare Pages**
1. Go to https://dash.cloudflare.com
2. Navigate to Pages → react-chocolateapp
3. Click "Create deployment"
4. Upload the `dist` folder (drag & drop)
5. Click "Deploy"

### Option 3: Connect GitHub Auto-Deploy

**Step 1: Go to Cloudflare Dashboard**
1. Visit https://dash.cloudflare.com
2. Go to Pages → react-chocolateapp
3. Click "Settings" → "Builds & deployments"

**Step 2: Configure Build Settings**
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `chocolate-frontend`
- **Node version**: 18 or higher

**Step 3: Connect GitHub**
1. Go to "Settings" → "Builds & deployments"
2. Click "Connect to Git"
3. Select your repository: `Vbadrakia/React-chocolateApp`
4. Set branch: `main`
5. Enable auto-deploy

**Step 4: Trigger Deploy**
1. Go to "Deployments" tab
2. Click "Retry deployment" or
3. Make a new commit to trigger auto-deploy

## Quick Deploy Script

I'll create a PowerShell script to deploy instantly:

**File**: `deploy-cloudflare.ps1`
```powershell
# Deploy to Cloudflare Pages
Write-Host "Building React app..." -ForegroundColor Cyan
Set-Location chocolate-frontend
npm run build

Write-Host "`nDeploying to Cloudflare Pages..." -ForegroundColor Cyan
wrangler pages deploy dist --project-name=react-chocolateapp

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "Visit: https://react-chocolateapp.pages.dev" -ForegroundColor Cyan
```

## Verify Deployment

After deployment, test:
1. Visit https://react-chocolateapp.pages.dev
2. Hard refresh (Ctrl+Shift+R) to clear cache
3. Check mobile responsiveness:
   - Open Chrome DevTools (F12)
   - Click device toolbar (Ctrl+Shift+M)
   - Test different screen sizes

## Troubleshooting

### Issue: "wrangler command not found"
```bash
npm install -g wrangler
# Or use npx:
npx wrangler pages deploy dist --project-name=react-chocolateapp
```

### Issue: "Authentication required"
```bash
wrangler login
# Opens browser for Cloudflare login
```

### Issue: Build fails
```bash
# Check Node version (need 18+)
node --version

# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Old UI still showing
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache completely
- Try incognito/private window
- Wait 2-3 minutes for CDN cache to update

## Environment Variables

If your app needs environment variables:

**In Cloudflare Dashboard:**
1. Go to Pages → react-chocolateapp
2. Settings → Environment variables
3. Add variables:
   - `VITE_API_URL` = Your Railway backend URL
   - Any other VITE_ prefixed variables

**Note**: Vite only includes env vars prefixed with `VITE_`

## Next Steps

1. **Deploy Now**: Use one of the methods above
2. **Enable Auto-Deploy**: Connect GitHub for future automatic deployments
3. **Test**: Verify the new UI is live
4. **Monitor**: Check Cloudflare Analytics for traffic

## Current Build Info

- **Framework**: React 19 + Vite 7
- **Build Output**: `chocolate-frontend/dist/`
- **Entry Point**: `index.html`
- **Assets**: Bundled JS, CSS, images in dist folder
