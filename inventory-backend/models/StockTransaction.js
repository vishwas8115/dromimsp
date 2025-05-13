// models/StockTransaction.js
const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: { // 'in' for stock purchase, 'out' for stock sale
    type: String,
    enum: ['in', 'out'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const StockTransaction = mongoose.models.StockTransaction || mongoose.model('StockTransaction', stockTransactionSchema);

module.exports = StockTransaction;
