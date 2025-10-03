# Build stage: compile Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (leverage Docker layer cache)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy sources and build in production mode
COPY . .
# Sanity check CLI availability and permissions
RUN npx ng version
RUN npm run build

# Runtime stage: serve with Nginx
FROM nginx:alpine AS runtime

# Remove default config and use SPA-friendly config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist/bibliotheque-admin/browser /usr/share/nginx/html

EXPOSE 80

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

# Default command
CMD ["nginx", "-g", "daemon off;"]
