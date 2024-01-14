FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy files to the working directory
COPY . /app

# Install pnpm globally
RUN npm install -g pnpm serve nodemon

# Install dependencies
RUN pnpm install

# Change the working directory to the backend folder and install backend dependencies
WORKDIR /app/ikoner-backend
COPY . /app/ikoner-backend
RUN pnpm install

# Change the working directory back to the root folder
WORKDIR /app

# Build the project
RUN pnpm run build

# Set the entrypoint to start.sh
ENTRYPOINT [ "bash", "start.sh" ]