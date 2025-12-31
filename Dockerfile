# Use official Node.js runtime as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy all package files first
COPY package*.json ./
COPY chocolate-frontend/package*.json ./chocolate-frontend/
COPY chocolate-backend/package*.json ./chocolate-backend/

# Install root and workspace dependencies
RUN npm ci --no-cache

# Copy all source files
COPY chocolate-frontend/src ./chocolate-frontend/src
COPY chocolate-frontend/index.html ./chocolate-frontend/
COPY chocolate-frontend/vite.config.js ./chocolate-frontend/
COPY chocolate-backend ./chocolate-backend

# Build frontend
WORKDIR /app
RUN npm run build --workspace=chocolate-frontend

# Start backend server
WORKDIR /app/chocolate-backend
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
