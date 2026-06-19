const express = require('express');
const app = express();
const port = process.env.PORT || 3006;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'notification-service' });
});

app.get('/', (req, res) => {
  res.send('Notification Service is running');
});

app.listen(port, () => {
  console.log(`Notification Service running on port ${port}`);
});
