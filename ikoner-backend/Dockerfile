FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy files to the working directory
COPY . /app

# Install pnpm and nodemon globally
RUN npm install -g pnpm nodemon

# Install dependencies
RUN pnpm install

# Run over node 
ENTRYPOINT [ "node", "index.js" ]