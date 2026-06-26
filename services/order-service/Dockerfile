FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY services/shared/package*.json ./services/shared/
COPY services/order-service/package*.json ./services/order-service/
COPY prisma ./prisma
RUN npm install --legacy-peer-deps
RUN npx prisma generate --schema=/app/prisma/schema.prisma

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./
COPY services/shared ./services/shared
COPY services/order-service ./services/order-service
WORKDIR /app/services/order-service
EXPOSE 3003
CMD ["node", "src/index.js"]
