# 🚀 Quick Backend Deployment to Railway

## Step-by-Step Instructions:

### 1️⃣ Deploy Backend to Railway

1. **Go to [railway.app](https://railway.app)** and sign in with GitHub

2. **New Project** → **Deploy from GitHub repo**

3. **Select**: `Vbadrakia/React-chocolateApp`

4. **Configure Service**:
   - Click on the service that was created
   - Settings → Change Root Directory to: `chocolate-backend`
   - Start Command: `node server.js`

5. **Add MongoDB**:
   - Click **"+ New"** in your project
   - Select **"Database"** → **"Add MongoDB"**
   - Railway will provision a MongoDB instance automatically

6. **Set Environment Variables**:
   - Click on your backend service
   - Go to **"Variables"** tab
   - Add these variables:
   ```
   PORT=5000
   MONGODB_URI=${{MongoDB.MONGO_URL}}
   JWT_SECRET=super-secret-jwt-key-change-this-12345
   NODE_ENV=production
   FRONTEND_URL=https://react-chocolateapp.pages.dev
   ALLOWED_ORIGINS=https://react-chocolateapp.pages.dev
   ```
   *(Note: The `${{MongoDB.MONGO_URL}}` will auto-reference your MongoDB)*

7. **Generate Domain**:
   - Go to **Settings** → **Networking**
   - Click **"Generate Domain"**
   - Copy your URL (e.g., `chocolate-backend-production.up.railway.app`)

8. **Deploy**: Click **"Deploy"** or push to main branch (auto-deploys)

---

### 2️⃣ Update Frontend on Cloudflare Pages

1. **Go to your Cloudflare Pages dashboard**:
   - Select project: `react-chocolateapp`
   - Go to **Settings** → **Environment variables**

2. **Add Production Variable**:
   ```
   Variable name: VITE_API_URL
   Value: https://YOUR-RAILWAY-URL.up.railway.app/api
   ```
   *(Replace with your actual Railway domain)*

3. **Redeploy**:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment → **"Retry deployment"**
   - OR push any change to trigger auto-deploy

---

### 3️⃣ Seed Database (Optional)

After backend is deployed, seed products:

```bash
# In Railway service dashboard → Settings → Enable "Railway CLI"
# Or use the web-based terminal

node seed.js
```

---

### 4️⃣ Test Your Deployment

1. **Test API**:
   ```bash
   curl https://your-railway-url.up.railway.app/api/health
   ```

2. **Test Frontend**: Visit `https://react-chocolateapp.pages.dev`

3. **Try Login** with seeded admin account:
   - Email: `admin@example.com`
   - Password: `admin123`

---

## 📊 Expected Result

✅ Backend running on Railway with MongoDB
✅ Frontend on Cloudflare Pages connecting to Railway API
✅ Full authentication, products, checkout, and admin features working
✅ CORS configured properly

---

## 🔧 Troubleshooting

**CORS Error?**
- Check `ALLOWED_ORIGINS` in Railway includes your Cloudflare URL
- Make sure `VITE_API_URL` in Cloudflare has `/api` at the end

**Database Connection Error?**
- Verify `MONGODB_URI` variable uses `${{MongoDB.MONGO_URL}}`
- Check MongoDB service is running in Railway project

**404 on API calls?**
- Ensure `VITE_API_URL` ends with `/api` (not `/`)
- Check Railway domain is correct

---

## 💰 Cost

- **Railway**: Free tier includes $5/month credit (enough for small apps)
- **MongoDB on Railway**: Included in free tier
- **Cloudflare Pages**: Free forever

Total: **$0/month** within free tier limits! 🎉
