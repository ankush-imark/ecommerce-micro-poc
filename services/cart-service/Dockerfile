FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY services/shared/package*.json ./services/shared/
COPY services/cart-service/package*.json ./services/cart-service/
COPY prisma ./prisma
RUN npm install --legacy-peer-deps
RUN npx prisma generate --schema=/app/prisma/schema.prisma

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

COPY package*.json ./
COPY services/shared ./services/shared
COPY services/cart-service ./services/cart-service
WORKDIR /app/services/cart-service
EXPOSE 3002
CMD ["node", "src/index.js"]
