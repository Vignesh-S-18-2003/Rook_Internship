const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// POST endpoint to handle incoming orders
app.post('/api/orders', (req, res) => {
  const newOrder = req.body;

  // Read the existing orders from db.json
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the database file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let orders = [];
    try {
      orders = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing the database file:', parseError);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Add the new order to the orders array
    orders.push(newOrder);

    // Write the updated orders back to db.json
    fs.writeFile(dbFilePath, JSON.stringify(orders, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the database file:', writeErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Respond with a success message and the new order
      res.status(201).json({ message: 'Order received', order: newOrder });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
