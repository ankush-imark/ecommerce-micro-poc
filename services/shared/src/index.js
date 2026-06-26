const { connectRedis } = require('./redis');
const { connectKafka } = require('./kafka');
const { prisma } = require('./prisma');
const logger = require('./logger');

module.exports = {
  connectRedis,
  connectKafka,
  prisma,
  logger
};