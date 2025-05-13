// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET all
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// POST new
router.post('/', async (req, res) => {
  try {
    const cust = new Customer(req.body);
    const saved = await cust.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
