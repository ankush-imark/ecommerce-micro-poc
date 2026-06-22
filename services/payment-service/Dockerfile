FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY services/shared/package*.json ./services/shared/
COPY services/payment-service/package*.json ./services/payment-service/
RUN npm install --legacy-peer-deps

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY services/shared ./services/shared
COPY services/payment-service ./services/payment-service
WORKDIR /app/services/payment-service
EXPOSE 3004
CMD ["node", "src/index.js"]
