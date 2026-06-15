# syntax=docker/dockerfile:1

# ---- Build stage: compile the Angular app ----
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies from the lockfile (reproducible install)
COPY package.json package-lock.json ./
RUN npm ci

# Build the production bundle -> dist/tubus-servicios/browser
COPY . .
RUN npm run build

# ---- Runtime stage: serve the static files with nginx ----
FROM nginx:1.27-alpine

# Railway injects $PORT at runtime; default to 80 for local `docker run`.
ENV PORT=80

# nginx renders templates in this dir (substituting $PORT) before starting.
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Compiled browser output produced by the build stage.
COPY --from=build /app/dist/tubus-servicios/browser /usr/share/nginx/html
