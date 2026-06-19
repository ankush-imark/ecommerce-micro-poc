const express = require('express');
const app = express();
const port = process.env.PORT || 3005;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'inventory-service' });
});

app.get('/', (req, res) => {
  res.send('Inventory Service is running');
});

app.listen(port, () => {
  console.log(`Inventory Service running on port ${port}`);
});
