// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route modules
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const stockRoutes = require('./routes/stockRoutes'); // Ensure this is imported
const categoryRoutes = require('./routes/categoryRoutes'); // Add this import
const reportRoutes = require('./routes/report');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/stock', stockRoutes); // Ensure this route is mounted
app.use('/api/categories', categoryRoutes); // Add this line
app.use('/api/reports', reportRoutes);



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventory')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
