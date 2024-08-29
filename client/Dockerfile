# Node.js image as the base
FROM node:18 as build

# Set the working directory in the container
WORKDIR /client

# Copy package*.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Builds the client-side application using
RUN npm run build

# Switches to the official Nginx image
FROM nginx:alpine

# Copies the built application files from the previous build stage to the Nginx image's HTML directory.
COPY --from=build /client/dist /usr/share/nginx/html

# Expose the port the server will run on
EXPOSE 80

# Run the command to start the server
CMD ["nginx", "-g", "daemon off;"]