FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY services/shared/package*.json ./services/shared/
COPY services/inventory-service/package*.json ./services/inventory-service/
RUN npm install --legacy-peer-deps

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY services/shared ./services/shared
COPY services/inventory-service ./services/inventory-service
WORKDIR /app/services/inventory-service
EXPOSE 3005
CMD ["node", "src/index.js"]
