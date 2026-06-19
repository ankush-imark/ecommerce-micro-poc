const express = require('express');
const app = express();
const port = process.env.PORT || 3004;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'payment-service' });
});

app.get('/', (req, res) => {
  res.send('Payment Service is running');
});

app.listen(port, () => {
  console.log(`Payment Service running on port ${port}`);
});
