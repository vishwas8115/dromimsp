// models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  quantityChange: { type: Number, required: true },
  transactionType: { type: String, enum: ['purchase', 'sale'], required: true },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
