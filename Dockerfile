# Use official Node.js runtime as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy root package.json
COPY package*.json ./

# Copy workspace package files
COPY chocolate-frontend/package*.json ./chocolate-frontend/
COPY chocolate-backend/package*.json ./chocolate-backend/

# Install dependencies in root to link workspaces
RUN npm install

# Copy frontend source
COPY chocolate-frontend ./chocolate-frontend

# Copy backend source  
COPY chocolate-backend ./chocolate-backend

# Build frontend from its directory
WORKDIR /app/chocolate-frontend
RUN npm run build

# Switch to backend for runtime
WORKDIR /app/chocolate-backend
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
