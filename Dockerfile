FROM node:12.16.1-alpine

# Make the 'app' folder the current working directory
WORKDIR /app/

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app/

# npm install and run unit tests
RUN npm ci && npm test

EXPOSE 3001
CMD node index.js