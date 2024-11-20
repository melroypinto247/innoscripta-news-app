# Use a Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight server to serve the built files
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port your app runs on
EXPOSE 3000