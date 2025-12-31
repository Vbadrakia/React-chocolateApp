# Use official Node.js runtime as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app/chocolate-frontend

# Copy frontend package files and install
COPY chocolate-frontend/package*.json ./
RUN npm install

# Copy frontend source (node_modules already exists)
COPY chocolate-frontend/src ./src
COPY chocolate-frontend/index.html ./
COPY chocolate-frontend/vite.config.js ./

# Build frontend
RUN npm run build

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
