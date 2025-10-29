# 🚀 AegisIndex GitHub Upload & Server Deployment Guide

## 📋 Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `aegisindex`
5. Description: `AI-powered SEO automation platform`
6. Make it **Public** (recommended)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## 📤 Step 2: Upload to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/aegisindex.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 🖥️ Step 3: Server Deployment Commands

Once your code is on GitHub, use these commands to deploy on your server:

### Option A: Clone from GitHub (Recommended)

```bash
# Connect to your server
ssh root@94.154.46.144
# Password: XzaRvudPZ-it1qnF

# Remove existing deployment if any
rm -rf /opt/aegisindex

# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/aegisindex.git /opt/aegisindex

# Navigate to app directory
cd /opt/aegisindex

# Install dependencies
npm install

# Install workspace dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd agent && npm install && cd ..

# Generate Prisma client
cd backend && npm run db:generate && cd ..

# Build application
npm run build

# Install PM2 if not already installed
npm install -g pm2

# Stop existing processes
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup

# Open firewall ports
ufw allow 3000
ufw allow 4000

# Check status
pm2 status
```

### Option B: Direct Upload (Alternative)

If you prefer to upload files directly:

```bash
# From your local machine, upload the deployment folder
scp -r aegisindex-deploy/* root@94.154.46.144:/opt/aegisindex/

# Then SSH and run deployment
ssh root@94.154.46.144
cd /opt/aegisindex
chmod +x deploy-server.sh
./deploy-server.sh
```

## 🌐 After Deployment

Your application will be available at:
- **Frontend**: http://94.154.46.144:3000
- **Backend API**: http://94.154.46.144:4000
- **Health Check**: http://94.154.46.144:4000/api/health

## 🔧 Useful Commands

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Restart services
pm2 restart all

# Stop services
pm2 stop all

# Update from GitHub
cd /opt/aegisindex
git pull origin main
npm run build
pm2 restart all
```

## 📝 Environment Variables

Make sure to create these environment files on your server:

**Frontend** (`/opt/aegisindex/frontend/.env.local`):
```
NEXT_PUBLIC_API_URL=http://94.154.46.144:4000
NEXT_PUBLIC_APP_URL=http://94.154.46.144
```

**Backend** (`/opt/aegisindex/backend/.env`):
```
API_PORT=4000
DATABASE_URL="file:./dev.db"
NODE_ENV=production
```

**Agent** (`/opt/aegisindex/agent/.env`):
```
NODE_ENV=production
```

## ✅ Success!

Once deployed, your AegisIndex platform will be live and accessible from anywhere!
