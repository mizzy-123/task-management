FROM node:25

# Set working directory
WORKDIR /task-management-backend

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the port the app runs on
EXPOSE 3001

# Start the application (migration will run before starting)
CMD ["sh", "-c", "yarn migration:run && yarn prod"]