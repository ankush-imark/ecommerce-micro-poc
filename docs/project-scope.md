//Problem
Currently, failed transactions, inventory updates, and order status changes are being handled manually, which can lead to inconsistent data and delayed customer updates.

//Solution
We are building a microservice-based order management system that can handle peak order traffic efficiently, track order status, process payments, update inventory after successful payment, and ensure consistency using circuit breaker patterns.

//Scope
-> Support only customer orders (no seller/admin order flow in the first version).
-> System should handle up to 5000 peak orders.
-> Order processing response time should not exceed 1 minute.
-> Payment gateway: Razorpay.
-> Order statuses: Pending, Complete, Cancel.
-> Transaction statuses: Success, Fail.
-> Inventory should be updated only after payment succeeds.
-> If payment succeeds but inventory is unavailable, the system must prevent inconsistent data using circuit breaker patterns.
-> If payment is deducted but inventory is out of stock, the system must process refund.

//Architecture / Technical Stack
-> Node.js for microservices.
-> PostgreSQL for transactional data.
-> Prisma ORM for database modeling, migrations, and queries.
-> Redis for caching and rate limiting.
-> Kafka for async events and communication between services.
-> Rate limiter for API protection and request throttling.

//Features
-> Authentication flow for customer users.
-> Customers can add products to cart.
-> Customers can checkout.
-> Payment processing using Razorpay.
-> Update inventory after payment success.
-> Track order status from Pending to Complete or Cancel.
-> Track transaction status as Success or Fail.
-> Refund handling if payment is captured but inventory update fails.
-> Send notifications after payment success, payment failure, order completion, or cancellation.

//Important Design Considerations
-> Payment and inventory updates must be coordinated carefully to avoid inconsistencies.
-> Circuit breaker pattern should be used for inventory or downstream dependency failures.
-> The system should be designed for microservices communication, not a monolithic structure.
-> No additional regulatory or compliance requirements are needed for this scope.