const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'order-service' });
});

app.get('/', (req, res) => {
  res.send('Order Service is running');
});

app.listen(port, () => {
  console.log(`Order Service running on port ${port}`);
});
