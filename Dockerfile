# Use an official Node.js runtime as the base image
FROM node:20 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the project
RUN npm run build

# Use an official Nginx runtime as the base image
FROM nginx

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/www /usr/share/nginx/html

# Expose the port that the app is running on
EXPOSE 80
