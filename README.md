# E-commerce Microservice POC

This project is a Node.js + Express + npm microservice starter for the ecommerce order workflow.

## Service boundaries
- API Gateway: routes requests to internal services
- Auth Service: customer authentication
- Cart Service: cart management
- Order Service: order creation and order status tracking
- Payment Service: Razorpay integration and refunds
- Inventory Service: stock updates and consistency handling
- Notification Service: email/SMS/webhook notifications

## Tech stack
- Node.js
- Express
- npm workspaces
- Docker
- PostgreSQL
- Redis
- Kafka
- Prisma ORM

## Prerequisites
- Node.js (recommended LTS)
- npm
- Docker Desktop (or Docker Engine + Docker Compose)

## Environment setup
1. Copy the sample environment file:
   ```bash
   copy .env.example .env
   ```
   On macOS/Linux, use:
   ```bash
   cp .env.example .env
   ```
2. Update the values in `.env` if needed.

## Run the application
### 1. Install dependencies
```bash
npm install
```

### 2. Start infrastructure services
```bash
npm run docker:up
```
This starts PostgreSQL, Redis, Kafka, Zookeeper, and the Dockerized services.

### 3. Start the API gateway locally
```bash
npm run dev
```
The gateway will run on:
- http://localhost:3000

## Service URLs
Once the services are running, you can access:
- Gateway: http://localhost:3000
- Auth service: http://localhost:3001
- Cart service: http://localhost:3002
- Order service: http://localhost:3003
- Payment service: http://localhost:3004
- Inventory service: http://localhost:3005
- Notification service: http://localhost:3006

## Verify services
You can check the services with:
```bash
npm run verify:services
```

## Stop everything
```bash
docker compose down
```

