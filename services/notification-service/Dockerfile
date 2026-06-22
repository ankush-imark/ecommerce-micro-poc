FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY services/shared/package*.json ./services/shared/
COPY services/notification-service/package*.json ./services/notification-service/
RUN npm install --legacy-peer-deps

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY services/shared ./services/shared
COPY services/notification-service ./services/notification-service
WORKDIR /app/services/notification-service
EXPOSE 3006
CMD ["node", "src/index.js"]
