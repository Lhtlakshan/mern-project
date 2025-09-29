# 1. Use official Node.js base image
FROM node:18

WORKDIR /app

# 3. Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Install nodemon globally if you want hot reload
RUN npm install -g nodemon

# Copy environment file
COPY .env .env

# 5. Copy the rest of the app
COPY . .

# 6. Expose port (matches Express app)
EXPOSE 3000

# 8. Start the app in dev mode
CMD ["npm", "run", "dev"]