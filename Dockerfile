FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy files to the working directory
COPY . /app

# Install pnpm and serve globally
RUN npm install -g pnpm serve

# Install dependencies
RUN pnpm install

# Build the project
RUN pnpm run build

# Run over node serve
ENTRYPOINT [ "serve", "-s", "build" ]