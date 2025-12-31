# Use official Node.js runtime as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy and install frontend dependencies
COPY chocolate-frontend/package*.json ./chocolate-frontend/
WORKDIR /app/chocolate-frontend
RUN npm install

# Copy frontend source and build
COPY chocolate-frontend ./
RUN npm run build

# Copy and install backend dependencies
WORKDIR /app
COPY chocolate-backend/package*.json ./chocolate-backend/
WORKDIR /app/chocolate-backend
RUN npm install

# Copy backend source
COPY chocolate-backend ./

# Start backend server
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
