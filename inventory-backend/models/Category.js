const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

// Prevent OverwriteModelError in development
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
