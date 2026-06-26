const express = require('express');
const { connectRedis, connectKafka, prisma } = require('../../shared/src');

const app = express();
const port = Number(process.env.PORT || 3001);
const serviceName = 'auth-service';

app.use(express.json());

let redisClient;
let producer;
let consumer;
let prismaClient;

async function initInfrastructure() {
  await prisma.$connect();
  prismaClient = prisma;
  redisClient = await connectRedis(serviceName);
  const kafka = await connectKafka(serviceName, `${serviceName}-group`);
  producer = kafka.producer;
  consumer = kafka.consumer;
}

app.use((req, res, next) => {
  console.log(`[${serviceName}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: serviceName,
    redis: redisClient?.isOpen ? 'connected' : 'disconnected',
    kafka: producer && consumer ? 'connected' : 'disconnected',
    prisma: prismaClient ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    service: serviceName,
    message: 'Auth Service is running'
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
    await initInfrastructure();
  } catch (error) {
    console.warn(`[${serviceName}] infrastructure init skipped`, error.message);
  } finally {
    app.listen(port, () => {
      console.log(`${serviceName} running on port ${port}`);
    });
  }
})();
