# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install


# Install mongoose
RUN npm install mongoose bcrypt @types/bcrypt
# Copy the rest of your application's source code to the container
COPY . .

# Expose the port that your Node.js app will run on
EXPOSE 8888

# Define the command to run your Node.js application
CMD ["npm", "start"]
