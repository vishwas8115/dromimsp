const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Customer = require('../models/Customer');
const StockTransaction = require('../models/StockTransaction');

// Unified Report Endpoint
router.get('/', async (req, res) => {
  try {
    // 1. Total Inventory Value
    const products = await Product.find().populate('category');
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

    // 2. Category-wise Pie Chart
    const categoryMap = {};
    products.forEach(product => {
      const categoryName = product.category?.name || 'Uncategorized';
      categoryMap[categoryName] = (categoryMap[categoryName] || 0) + product.stock;
    });
    const categoryData = Object.entries(categoryMap).map(([category, value]) => ({ category, value }));

    // 3. Low Stock Products (≤ 5)
    const lowStockProducts = products.filter(product => product.stock <= 5);

    // 4. Customer Purchase/Sale Report
    const transactions = await StockTransaction.find().populate('customer');
    const customerMap = {};

    transactions.forEach(tx => {
      if (!tx.customer) return; // skip if customer info is missing
      const id = tx.customer._id.toString();
      if (!customerMap[id]) {
        customerMap[id] = {
          _id: id,
          name: tx.customer.name,
          totalPurchased: 0,
          totalSold: 0,
        };
      }
      if (tx.type === 'in') {
        customerMap[id].totalPurchased += tx.quantity;
      } else if (tx.type === 'out') {
        customerMap[id].totalSold += tx.quantity;
      }
    });

    const customerReport = Object.values(customerMap);

    // Final Response
    res.json({
      totalValue,
      categoryData,
      lowStockProducts,
      customerReport
    });

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report', error });
  }
});

module.exports = router;
