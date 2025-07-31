# --- Stage 1: Build the React application ---
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to install dependencies
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application for production
# REACT_APP_BACKEND_API will be passed during docker build via --build-arg
# and automatically picked up by create-react-app at this step.
RUN npm run build

# --- Stage 2: Serve the built application with Nginx ---
FROM nginx:stable-alpine

# Copy the built React app from the builder stage into Nginx's public directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default for HTTP web servers)
EXPOSE 80

# Command to start Nginx when the container launches (default for nginx images)
CMD ["nginx", "-g", "daemon off;"]