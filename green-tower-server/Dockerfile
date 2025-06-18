# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
