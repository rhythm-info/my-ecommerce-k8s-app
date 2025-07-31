const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 5000; // Our backend API will run on port 5000

// Use CORS middleware
// This allows requests from all origins during development.
// In production, you'd restrict 'origin' to your frontend's actual domain.
app.use(cors()); // <-- ADD THIS LINE HERE!

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// A simple root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend API!');
});

// A simple products route
app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product A', price: 29.99, description: 'Description for Product A' },
    { id: 2, name: 'Product B', price: 49.99, description: 'Description for Product B' },
    { id: 3, name: 'Product C', price: 19.99, description: 'Description for Product C' }
  ];
  res.json(products);
});

// Start the server
app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});