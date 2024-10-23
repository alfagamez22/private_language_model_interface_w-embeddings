# syntax=docker/dockerfile:1
# Use node 18-alpine for base image for all stages.
FROM node:18-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Create a stage for installing production dependencies.
FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Create a stage for building the application.
FROM deps as build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

# Create a new stage to run the application with minimal runtime dependencies.
FROM base as final
ENV NODE_ENV production
USER node
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next

# Expose the port that the application listens on.
EXPOSE 6969

# Run the application.
CMD ["npm", "start"]
