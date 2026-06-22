FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY services/shared/package*.json ./services/shared/
COPY services/auth-service/package*.json ./services/auth-service/
RUN npm install --legacy-peer-deps

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY services/shared ./services/shared
COPY services/auth-service ./services/auth-service
WORKDIR /app/services/auth-service
EXPOSE 3001
CMD ["node", "src/index.js"]
