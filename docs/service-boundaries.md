# Service Boundaries

## 1. API Gateway
- Handles incoming customer requests
- Routes traffic to internal services
- Applies rate limiting and authentication checks

## 2. Auth Service
- Handles login, signup, and token validation
- Manages customer identity

## 3. Cart Service
- Stores temporary cart data
- Supports add/update/remove item operations

## 4. Order Service
- Creates orders
- Tracks order lifecycle: Pending, Complete, Cancel
- Coordinates order events

## 5. Payment Service
- Integrates with Razorpay
- Handles payment success/failure callbacks
- Executes refunds when needed

## 6. Inventory Service
- Updates stock after successful payment
- Uses circuit breaker and retry patterns for resilience

## 7. Notification Service
- Sends updates for order, payment, cancellation, and refund events

## Interaction Model
- Gateway receives requests from clients
- Auth verifies identity
- Cart prepares checkout payload
- Order creates a pending order
- Payment confirms transaction
- Inventory updates stock
- Notification informs the customer
