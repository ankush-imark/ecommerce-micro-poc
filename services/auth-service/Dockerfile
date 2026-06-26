FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY services/shared/package*.json ./services/shared/
COPY services/auth-service/package*.json ./services/auth-service/
COPY prisma ./prisma

RUN npm install --legacy-peer-deps
RUN npx prisma generate --schema=/app/prisma/schema.prisma

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

COPY package*.json ./
COPY services/shared ./services/shared
COPY services/auth-service ./services/auth-service
WORKDIR /app/services/auth-service
EXPOSE 3001
# Production
# CMD ["node", "src/index.js"]

# Development
CMD ["npm", "run", "dev"]