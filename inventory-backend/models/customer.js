// models/Customer.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  sales: [transactionSchema],
  purchases: [transactionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
