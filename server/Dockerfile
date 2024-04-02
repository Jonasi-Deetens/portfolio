# Use an existing docker image as a base
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 3050/tcp

# Command to run the executable
CMD ["node", "server.js"]
