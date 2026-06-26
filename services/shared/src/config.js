function getEnv(name, defaultValue = null) {
  const value = process.env[name];

  if (!value && defaultValue === null) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value || defaultValue;
}

module.exports = {
  REDIS_URL: getEnv('REDIS_URL', 'redis://redis:6379'),
  KAFKA_BROKERS: getEnv('KAFKA_BROKERS', 'kafka:9092'),
};