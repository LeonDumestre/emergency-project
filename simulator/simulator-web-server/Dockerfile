# Base image
FROM node:20

# Install Nest CLI
RUN npm install -g @nestjs/cli

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3110

# Start the server using the production build
CMD ["npm", "start"]