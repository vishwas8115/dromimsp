// stockRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const StockTransaction = require('../models/StockTransaction');

// Stock In (Add Stock)
router.post('/stock/in', async (req, res) => {
  const { productId, customerId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product stock
    product.stock += quantity;
    await product.save();

    // Log the transaction
    const transaction = new StockTransaction({
      type: 'in',
      product: productId,
      customer: customerId,
      quantity,
    });
    await transaction.save();

    res.json({ message: 'Stock added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding stock', error });
  }
});

// Stock Out (Remove Stock)
router.post('/stock/out', async (req, res) => {
  const { productId, customerId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock' });
    }

    product.stock -= quantity;
    await product.save();

    const transaction = new StockTransaction({
      type: 'out',
      product: productId,
      customer: customerId,
      quantity,
    });
    await transaction.save();

    res.json({ message: 'Stock removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing stock', error });
  }
});

module.exports = router;
