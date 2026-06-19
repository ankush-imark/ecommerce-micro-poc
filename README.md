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

## Local development
1. Install dependencies: `npm install`
2. Start services with Docker: `npm run docker:up`
3. Start the gateway locally: `npm run dev`
