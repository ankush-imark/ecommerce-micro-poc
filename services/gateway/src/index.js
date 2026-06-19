const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'gateway' });
});

app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(port, () => {
  console.log(`Gateway running on port ${port}`);
});
