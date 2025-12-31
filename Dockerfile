# Use official Node.js runtime as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY chocolate-frontend/package*.json ./chocolate-frontend/
COPY chocolate-backend/package*.json ./chocolate-backend/

# Install dependencies with no cache
RUN npm ci --no-cache --omit=dev --workspace=chocolate-frontend && \
    npm ci --no-cache --workspace=chocolate-backend

# Copy frontend source
COPY chocolate-frontend/src ./chocolate-frontend/src
COPY chocolate-frontend/index.html ./chocolate-frontend/
COPY chocolate-frontend/vite.config.js ./chocolate-frontend/

# Copy backend source
COPY chocolate-backend ./chocolate-backend

# Build frontend
WORKDIR /app/chocolate-frontend
RUN npm run build

# Start backend
WORKDIR /app/chocolate-backend
ENV PORT=5000
ENV NODE_ENV=production
CMD ["node", "server.js"]
