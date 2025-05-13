// routes/reports.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

// Get total inventory value
router.get('/inventory-value', async (req, res) => {
  try {
    const products = await Product.find();
    const totalValue = products.reduce((acc, product) => acc + (product.price * product.stock), 0);

    res.status(200).json({ totalValue });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get low stock products
router.get('/low-stock', async (req, res) => {
  try {
    const products = await Product.find({ stock: { $lt: 10 } });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get customer sales/purchases report
router.get('/customer/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const transactions = await Transaction.find({ customer: id })
      .populate('product')
      .sort({ timestamp: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
