// routes/transactions.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Transaction = require('../models/Transaction');

// Add stock (purchase)
router.post('/add-stock', async (req, res) => {
  const { productId, customerId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    const customer = await Customer.findById(customerId);

    if (!product || !customer) {
      return res.status(404).json({ message: 'Product or Customer not found' });
    }

    product.stock += quantity;
    await product.save();

    const transaction = new Transaction({
      product: productId,
      customer: customerId,
      quantityChange: quantity,
      transactionType: 'purchase',
    });

    await transaction.save();

    res.status(201).json({ message: 'Stock added successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Remove stock (sale)
router.post('/remove-stock', async (req, res) => {
  const { productId, customerId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    const customer = await Customer.findById(customerId);

    if (!product || !customer) {
      return res.status(404).json({ message: 'Product or Customer not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    product.stock -= quantity;
    await product.save();

    const transactionSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['add', 'remove'], required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

    await transaction.save();

    res.status(201).json({ message: 'Stock removed successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get transaction history (last 50 actions)
router.get('/history', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ timestamp: -1 })
      .limit(50)
      .populate('product customer', 'name sku category price');

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
