# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lockfile first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build Astro project
RUN npm run build

# Expose the same port Astro uses (5000 from your logs)
EXPOSE 5000

# Run Astro preview in production mode
CMD ["npm", "run", "preview", "--", "--host", "--port", "5000"]
