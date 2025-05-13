// routes/stockRoutes.js

const express = require('express');
const router = express.Router();

// Import the Mongoose models
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

// @route   PUT /api/stock/add/:id
// @desc    Add stock to a product and record transaction
// @access  Public or protected (as needed)
router.put('/add/:id', async (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than zero' });
  }

  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update stock and save
    product.stock += quantity;
    await product.save();

    // Record transaction
    const transaction = new Transaction({
      productId: product._id,
      quantity,
      type: 'add',
      date: Date.now(),
    });
    await transaction.save();

    return res.status(200).json({
      message: 'Stock added successfully',
      product,
      transaction,
    });
  } catch (error) {
    console.error('Error adding stock:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// @route   PUT /api/stock/remove/:id
// @desc    Remove stock from a product and record transaction
// @access  Public or protected (as needed)
router.put('/remove/:id', async (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than zero' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    product.stock -= quantity;
    await product.save();

    const transaction = new Transaction({
      productId: product._id,
      quantity,
      type: 'remove',
      date: Date.now(),
    });
    await transaction.save();

    return res.status(200).json({
      message: 'Stock removed successfully',
      product,
      transaction,
    });
  } catch (error) {
    console.error('Error removing stock:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// @route   GET /api/stock/history
// @desc    Get last 50 stock transactions
// @access  Public or protected (as needed)
router.get('/history', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ date: -1 })
      .limit(50)
      .populate('productId', 'name sku category price');

    return res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
