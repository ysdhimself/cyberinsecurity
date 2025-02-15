// index.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON in requests
app.use(express.json());

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
