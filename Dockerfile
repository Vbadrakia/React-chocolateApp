# Use official Node.js runtime as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app/chocolate-frontend

# Copy frontend package files and install with dev dependencies
COPY chocolate-frontend/package*.json ./
ENV NODE_ENV=development
RUN npm install

# Verify vite is installed
RUN ls -la node_modules/.bin/vite || echo "Vite not found in .bin"

# Copy frontend source (node_modules already exists)
COPY chocolate-frontend/src ./src
COPY chocolate-frontend/index.html ./
COPY chocolate-frontend/vite.config.js ./

# Build frontend
RUN NODE_ENV=production npm run build

# Setup backend
WORKDIR /app/chocolate-backend
COPY chocolate-backend/package*.json ./
RUN npm install
COPY chocolate-backend ./

# Start backend server
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
