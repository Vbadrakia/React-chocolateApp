# Environment Setup & Prerequisites

## 🖥️ System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.14+, Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB for node_modules
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **PostgreSQL**: v12 or higher

### Recommended Setup
- **OS**: Windows 11 / macOS 12+ / Ubuntu 20.04+
- **RAM**: 8GB or more
- **Node.js**: v18 LTS or v20
- **PostgreSQL**: v14+

---

## 📥 Installation Steps

### 1. Install Node.js

**Windows:**
- Download from https://nodejs.org/
- Choose LTS version
- Run installer and follow prompts
- Verify: `node --version` and `npm --version`

**macOS:**
```bash
# Using Homebrew
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Linux (Fedora):**
```bash
sudo dnf install nodejs
```

---

### 2. Install PostgreSQL

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Run installer
- Set password for postgres user
- Remember the password!
- Keep default port 5432

**macOS:**
```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Linux (Fedora):**
```bash
sudo dnf install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
```

---

### 3. Verify Installations

```bash
# Check Node.js
node --version
# Should output: v18.x.x or higher

# Check npm
npm --version
# Should output: 8.x.x or higher

# Check PostgreSQL
psql --version
# Should output: psql (PostgreSQL) 12.x or higher
```

---

## 🗄️ PostgreSQL Setup

### Windows & macOS

1. **Open PostgreSQL Command Line**
   - Windows: SQL Shell (psql) from Start Menu
   - macOS: Terminal and type `psql postgres`

2. **Create Database**
   ```sql
   CREATE DATABASE chocolate_db;
   ```

3. **Verify Database**
   ```sql
   \l
   ```
   You should see `chocolate_db` in the list.

### Linux

```bash
# Connect as postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE chocolate_db;

# Verify
\l

# Exit
\q
```

---

## 📝 Environment Variables

### Backend .env
Create `chocolate-backend/.env`:

```
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/chocolate_db

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Frontend .env
Create `chocolate-frontend/.env`:

```
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

---

## 🔄 Step-by-Step Setup

### Backend Setup

```bash
# 1. Navigate to backend
cd chocolate-backend

# 2. Install dependencies
npm install

# 3. Ensure PostgreSQL is running
# Windows: PostgreSQL service should be running
# macOS: brew services start postgresql@14
# Linux: sudo systemctl start postgresql

# 4. Create database (if not already created)
psql -U postgres
CREATE DATABASE chocolate_db;
\q

# 5. Update .env file with correct DATABASE_URL
# Edit chocolate-backend/.env
# Example: postgresql://postgres:your_password@localhost:5432/chocolate_db

# 6. Start backend
npm run dev

# Output should show:
# ✓ Database connected
# ✓ Database synchronized
# ✓ Server running on port 5000
```

### Frontend Setup

```bash
# 1. Navigate to frontend (in new terminal)
cd chocolate-frontend

# 2. Install dependencies
npm install

# 3. Update .env if needed (default should work)
# VITE_API_URL=http://localhost:5000/api

# 4. Start frontend
npm run dev

# Output should show:
# VITE v5.0.8  ready in 123 ms
# ➜  Local:   http://localhost:3000/
```

---

## ✅ Verification Checklist

### Backend Verification

```bash
# 1. Check backend is running
curl http://localhost:5000/api/health

# Expected output:
# {"status":"Backend is running"}

# 2. Check database connection
# Server should show: "✓ Database connected"

# 3. Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Should return user data and token
```

### Frontend Verification

```bash
# 1. Open browser
# Navigate to http://localhost:3000

# 2. Page should load without errors
# Check browser console (F12) for errors

# 3. Try logging in
# Use: user@example.com / password123

# Should redirect to /products page
```

---

## 🐛 Troubleshooting

### PostgreSQL Connection Issues

**Error**: `error: ECONNREFUSED`

**Solution:**
```bash
# Windows: Ensure PostgreSQL Service is running
# Services.msc → PostgreSQL → Start

# macOS: Start PostgreSQL
brew services start postgresql@14

# Linux: Start PostgreSQL
sudo systemctl start postgresql

# Verify
psql -U postgres
```

**Error**: `FATAL: password authentication failed`

**Solution:**
```sql
# Reset password in PostgreSQL shell
ALTER USER postgres WITH PASSWORD 'your_new_password';
# Update DATABASE_URL in .env with new password
```

### Node Package Issues

**Error**: `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps
```

**Error**: `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Error**: `EADDRINUSE :::5000` or `EADDRINUSE :::3000`

**Windows:**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env
PORT=5001
```

**macOS/Linux:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### CORS Errors

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
1. Ensure backend is running on port 5000
2. Check VITE_API_URL is correct in frontend .env
3. Verify backend has CORS enabled (it does by default)
4. Clear browser cache and local storage

### Token Errors

**Error**: `Invalid token` or `No token provided`

**Solution:**
```javascript
// Clear localStorage
localStorage.clear();

// Log out and login again
// Or check JWT_SECRET matches between login and request
```

---

## 🔒 Security Notes

### For Development

✅ Current .env uses basic values
✅ Suitable for local development only

### Before Production

⚠️ **MUST DO:**
1. Change `JWT_SECRET` to a strong random string
   ```bash
   # Generate strong secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. Use environment-specific configuration
   ```
   DATABASE_URL=postgresql://user:password@production-db:5432/chocolate_db
   JWT_SECRET=<strong_random_secret>
   NODE_ENV=production
   ```

3. Enable HTTPS
4. Use database backups
5. Setup monitoring and logging
6. Configure firewall rules

---

## 📚 Useful Commands

### npm Commands

```bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Update all packages
npm update

# Remove package
npm uninstall package-name

# List installed packages
npm list

# Run development server
npm run dev

# Build for production
npm run build

# Clear cache
npm cache clean --force
```

### PostgreSQL Commands

```bash
# Connect to database
psql -U postgres -d chocolate_db

# List databases
\l

# List tables
\dt

# Describe table
\d table_name

# Run SQL file
\i path/to/file.sql

# Backup database
pg_dump -U postgres chocolate_db > backup.sql

# Restore database
psql -U postgres chocolate_db < backup.sql

# Exit
\q
```

### Git Commands (Optional)

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Push to remote
git push -u origin main
```

---

## 🎯 Quick Checklist

Before running the application:

- [ ] Node.js installed (v14+)
- [ ] npm installed (v6+)
- [ ] PostgreSQL installed and running
- [ ] Database `chocolate_db` created
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Port 5000 available for backend
- [ ] Port 3000 available for frontend
- [ ] No firewall blocking ports

---

## 🚀 First Run

```bash
# Terminal 1 - Backend
cd chocolate-backend
npm install
npm run dev

# Terminal 2 - Frontend
cd chocolate-frontend
npm install
npm run dev

# Browser
# Navigate to http://localhost:3000
# Login with: user@example.com / password123
```

---

## 📞 Getting Help

### Check Logs

1. **Backend Console**: Shows database and server messages
2. **Frontend Console**: F12 → Console tab for JavaScript errors
3. **Network Tab**: F12 → Network tab to inspect API calls

### Common Issues & Solutions

See **Troubleshooting** section above for:
- PostgreSQL connection errors
- Port conflicts
- CORS issues
- Missing dependencies
- Token/authentication issues

---

**Ready to Start?** Run `QUICKSTART.bat` (Windows) or `bash QUICKSTART.sh` (macOS/Linux)

Version: 1.0.0  
Last Updated: December 2025
