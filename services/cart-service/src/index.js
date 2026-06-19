const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'cart-service' });
});

app.get('/', (req, res) => {
  res.send('Cart Service is running');
});

app.listen(port, () => {
  console.log(`Cart Service running on port ${port}`);
});
