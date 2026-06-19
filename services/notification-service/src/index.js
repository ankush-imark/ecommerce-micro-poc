const express = require('express');
const app = express();
const port = Number(process.env.PORT || 3006);
const serviceName = 'notification-service';

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${serviceName}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: serviceName,
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    service: serviceName,
    message: 'Notification Service is running'
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

app.listen(port, () => {
  console.log(`${serviceName} running on port ${port}`);
});
