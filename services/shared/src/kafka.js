const { Kafka } = require('kafkajs');
const { KAFKA_BROKERS } = require('./config');

async function connectKafka(serviceName, groupId) {
  const kafka = new Kafka({
    clientId: `${serviceName}-client`,
    brokers: KAFKA_BROKERS.split(',')
  });

  const producer = kafka.producer();
  const consumer = kafka.consumer({
    groupId: groupId || `${serviceName}-group`
  });

  await producer.connect();
  await consumer.connect();
  console.log(`[${serviceName}] Kafka connected`);
  return { kafka, producer, consumer };
}

module.exports = {
  connectKafka
};