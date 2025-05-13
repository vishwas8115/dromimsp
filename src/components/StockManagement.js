// StockManagement.jsx
import React, { useState, useEffect } from 'react';

const StockManagement = ({ products, customers, fetchProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleTransaction = async (type) => {
    const transactionData = {
      productId: selectedProduct,
      customerId: selectedCustomer,
      quantity: Number(quantity),
    };

    const response = await fetch(`/api/stock/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();
    if (response.ok) {
      fetchProducts(); // Re-fetch the products to update stock
      alert(`${type === 'in' ? 'Stock Added' : 'Stock Removed'} Successfully!`);
    } else {
      alert(data.message || 'Error in transaction');
    }
  };

  return (
    <div>
      <h2>Stock Management</h2>
      <div>
        <label>Product:</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Customer:</label>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div>
        <button onClick={() => handleTransaction('in')}>Add Stock</button>
        <button onClick={() => handleTransaction('out')}>Remove Stock</button>
      </div>
    </div>
  );
};

export default StockManagement;
