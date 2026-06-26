const { createClient } = require('redis');
const { REDIS_URL } = require('./config');

async function connectRedis(serviceName) {
  const client = createClient({
    url: REDIS_URL
  });

  client.on('error', (err) => {
    console.error(`[${serviceName}] Redis error:`, err);
  });

  await client.connect();
  console.log(`[${serviceName}] Redis connected`);
  return client;
}

module.exports = {
  connectRedis
};