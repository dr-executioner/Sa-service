# Use official Node LTS image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

# Install dependencies (use npm or yarn as per your project)
RUN npm install --production

# Copy rest of your code
COPY . .

# Build TypeScript (if you use tsc, adjust if you use swc/esbuild)
RUN npm run build

# Expose port your Express app runs on
EXPOSE 9080

# Set NODE_ENV for production (optional but recommended)
ENV NODE_ENV=production

# Start server (adjust as per your build process)
CMD ["node", "dist/server.js"]
