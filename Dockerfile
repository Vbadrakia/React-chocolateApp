# Use official Node.js runtime as base image
FROM node:22-alpine

# Build frontend first
WORKDIR /app/chocolate-frontend

# Copy frontend package files and install
COPY chocolate-frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY chocolate-frontend/src ./src
COPY chocolate-frontend/index.html ./
COPY chocolate-frontend/vite.config.js ./
RUN npm run build

# Setup backend
WORKDIR /app/chocolate-backend

# Copy backend package files and install
COPY chocolate-backend/package*.json ./
RUN npm install

# Copy backend source
COPY chocolate-backend/*.js ./
COPY chocolate-backend/config ./config
COPY chocolate-backend/models ./models
COPY chocolate-backend/routes ./routes

# Start backend server
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
