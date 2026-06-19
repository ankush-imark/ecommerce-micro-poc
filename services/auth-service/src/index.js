const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'auth-service' });
});

app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

app.listen(port, () => {
  console.log(`Auth Service running on port ${port}`);
});
