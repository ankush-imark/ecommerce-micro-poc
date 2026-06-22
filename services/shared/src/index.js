const { createClient } = require('redis');
const { Kafka } = require('kafkajs');

function getEnv(name, fallback) {
  return process.env[name] || fallback;
}

async function connectRedis(serviceName) {
  const redisUrl = getEnv('REDIS_URL', 'redis://redis:6379');
  const client = createClient({ url: redisUrl });

  client.on('error', (err) => {
    console.error(`[${serviceName}] Redis error:`, err);
  });

  await client.connect();
  console.log(`[${serviceName}] Redis connected`);
  return client;
}

async function connectKafka(serviceName, groupId) {
  const brokers = (getEnv('KAFKA_BROKERS', 'kafka:9092')).split(',');
  const kafka = new Kafka({
    clientId: `${serviceName}-client`,
    brokers
  });

  const producer = kafka.producer();
  const consumer = kafka.consumer({ groupId: groupId || `${serviceName}-group` });

  await producer.connect();
  await consumer.connect();
  console.log(`[${serviceName}] Kafka connected`);

  return { kafka, producer, consumer };
}

module.exports = {
  connectRedis,
  connectKafka
};
