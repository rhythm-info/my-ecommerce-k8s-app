# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# This step is done separately to leverage Docker's layer caching.
# If only package.json changes, npm install won't re-run from scratch.
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (matching our app.js port)
EXPOSE 5000

# Command to run the application when the container starts
CMD [ "node", "app.js" ]