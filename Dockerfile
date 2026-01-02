# Use official Node.js runtime as base image
FROM node:22-alpine

# Setup backend
WORKDIR /app/chocolate-backend

# Copy backend package files
COPY chocolate-backend/package*.json ./

# Install backend dependencies
RUN npm ci --omit=dev

# Copy backend source
COPY chocolate-backend/ ./

# Start backend server
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]

# Build command
# docker build --no-cache -t chocolate-app .
