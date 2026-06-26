const express = require('express');
const { connectRedis, prisma } = require('../../shared/src');

const app = express();
const port = Number(process.env.PORT || 3002);
const serviceName = 'cart-service';

let redisClient;
let prismaClient;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${serviceName}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: serviceName,
    redis: redisClient?.isOpen ? 'connected' : 'disconnected',
    prisma: prismaClient ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    service: serviceName,
    message: 'Cart Service is running'
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    service: serviceName,
    message: 'Not found'
  });
});

app.use((err, req, res, next) => {
  console.error(`[${serviceName}] ${err.message}`);
  res.status(err.status || 500).json({
    status: 'error',
    service: serviceName,
    message: err.message || 'Internal Server Error'
  });
});

(async () => {
  try {
    await prisma.$connect();
    prismaClient = prisma;
    redisClient = await connectRedis(serviceName);
  } catch (error) {
    console.warn(`[${serviceName}] infrastructure init skipped`, error.message);
  } finally {
    app.listen(port, () => {
      console.log(`${serviceName} running on port ${port}`);
    });
  }
})();
