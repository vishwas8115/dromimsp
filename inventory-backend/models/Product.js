// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
}, { timestamps: true });


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
