// models/Customer.js

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
}, { timestamps: true });

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

module.exports = Customer;
