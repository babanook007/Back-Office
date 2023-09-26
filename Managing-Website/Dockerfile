# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Expose the port that your React app will run on (แก้ port ตามที่คุณใช้ใน React app)
EXPOSE 8000

# Define the command to run your React app (แก้คำสั่งตามคำสั่งที่คุณใช้ใน React app)
CMD ["npm", "run", "dev"]
