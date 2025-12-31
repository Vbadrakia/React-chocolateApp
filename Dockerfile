# Use official Node.js runtime as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app/chocolate-frontend

# Copy frontend package files and install (including dev dependencies)
COPY chocolate-frontend/package*.json ./
RUN npm install --include=dev

# Copy frontend source (node_modules already exists)
COPY chocolate-frontend/src ./src
COPY chocolate-frontend/index.html ./
COPY chocolate-frontend/vite.config.js ./

# Build frontend using npx to ensure vite is found
RUN npx vite build

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
