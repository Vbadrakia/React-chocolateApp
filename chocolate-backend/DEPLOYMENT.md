# Backend Deployment Guide

## Deploy to Railway (Recommended - Free Tier)

### Step 1: Prepare Repository
Your backend is ready for deployment!

### Step 2: Deploy to Railway

1. **Go to [Railway.app](https://railway.app)** and sign in with GitHub

2. **Click "New Project"** → **"Deploy from GitHub repo"**

3. **Select your repository**: `Vbadrakia/React-chocolateApp`

4. **Configure the service**:
   - Root Directory: `chocolate-backend`
   - Start Command: `node server.js`

5. **Add MongoDB**:
   - Click "+ New" → "Database" → "MongoDB"
   - Railway will automatically create a MongoDB instance

6. **Set Environment Variables**:
   Go to your backend service → Variables tab:
   ```
   PORT=5000
   MONGODB_URI=${{MongoDB.MONGO_URL}}
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
   NODE_ENV=production
   ```

7. **Deploy**: Railway will automatically deploy on push to main

8. **Get your API URL**: 
   - Go to Settings → Generate Domain
   - Copy the URL (e.g., `https://your-app.up.railway.app`)

### Step 3: Update Frontend Environment Variable

1. **In your Cloudflare Pages dashboard**:
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend.up.railway.app/api`

2. **Redeploy frontend** (push to GitHub or manual redeploy in Cloudflare)

---

## Alternative: Deploy to Render (Free Tier)

1. **Go to [Render.com](https://render.com)** and sign in

2. **New → Web Service**

3. **Connect your GitHub repo**

4. **Configure**:
   - Root Directory: `chocolate-backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`

5. **Add MongoDB Atlas**:
   - Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get connection string

6. **Environment Variables**:
   ```
   PORT=10000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```

7. **Deploy** and copy the service URL

---

## Testing After Deployment

1. Test API endpoint:
   ```bash
   curl https://your-backend-url.com/api/products
   ```

2. Update frontend `.env` locally:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

3. Test login from your Cloudflare-hosted frontend

---

## Environment Variables Summary

**Backend (Railway/Render)**:
- `PORT` - Server port (5000 or 10000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to "production"

**Frontend (Cloudflare Pages)**:
- `VITE_API_URL` - Your deployed backend URL with /api path

---

## Monitoring

- **Railway**: Check logs in the service dashboard
- **Render**: View logs in the service logs tab
- **MongoDB**: Monitor connections in Railway/Atlas dashboard
