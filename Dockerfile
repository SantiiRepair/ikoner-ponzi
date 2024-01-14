FROM node:20

# Set the working directory inside the container
WORKDIR /ikoner

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install pnpm globally
RUN npm install -g pnpm serve nodemon

# Install dependencies
RUN pnpm install

# Change the working directory to the backend folder and install backend dependencies
WORKDIR /ikoner/ikoner-backend
COPY ikoner-backend/package.json .
COPY ikoner-backend/pnpm-lock.yaml .
RUN pnpm install

# Change the working directory back to the root folder
WORKDIR /ikoner

# Build the project
RUN pnpm run build

# Set the entrypoint to start.sh
ENTRYPOINT [ "bash", "start.sh" ]