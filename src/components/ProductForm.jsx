import React, { useState, useEffect } from 'react';
import './ProductForm.css';

const categories = ['Electronics', 'Grocery', 'Clothing', 'Furniture'];

const ProductForm = ({ onSubmit, onUpdate, editingProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
  });

  // If there's an editing product, populate the form fields with its data
  useEffect(() => {
    if (editingProduct) {
      setProduct({
        ...editingProduct,
        price: editingProduct.price.toString(), // Convert price to string for input
        stock: editingProduct.stock.toString(), // Convert stock to string for input
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
    };

    if (editingProduct) {
      // If we're editing, call the onUpdate prop to update the product
      onUpdate(updatedProduct);
    } else {
      // If we're adding a new product, call onSubmit prop to add the product
      onSubmit(updatedProduct);
    }

    setProduct({ name: '', sku: '', category: '', price: '', stock: '' }); // Reset form after submit
  };

  return (
    <div className="product-form-container">
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Name</label>
        <input name="name" value={product.name} onChange={handleChange} required />

        <label>SKU</label>
        <input name="sku" value={product.sku} onChange={handleChange} required />

        <label>Category</label>
        <select name="category" value={product.category} onChange={handleChange} required>
          <option value="">Select</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <label>Price</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />

        <label>Stock</label>
        <input type="number" name="stock" value={product.stock} onChange={handleChange} required />

        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
