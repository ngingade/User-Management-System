# Node.js image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /server

# Copy package*.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the server will run on
EXPOSE 3001

# Run the command to start the server
CMD ["npm", "run", "server"]