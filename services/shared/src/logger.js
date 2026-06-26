function log(service, level, message, meta = {}) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      service,
      level,
      message,
      ...meta
    })
  );
}

module.exports = {
  info: (service, message, meta) =>
    log(service, 'INFO', message, meta),

  error: (service, message, meta) =>
    log(service, 'ERROR', message, meta),

  warn: (service, message, meta) =>
    log(service, 'WARN', message, meta),
};