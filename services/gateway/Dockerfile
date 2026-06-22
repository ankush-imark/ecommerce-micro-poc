FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY services/shared/package*.json ./services/shared/
COPY services/gateway/package*.json ./services/gateway/
RUN npm install --legacy-peer-deps

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY services/shared ./services/shared
COPY services/gateway ./services/gateway
WORKDIR /app/services/gateway
EXPOSE 3000
CMD ["node", "src/index.js"]
