import React, { useState, useEffect } from 'react';
import './StockManagement.css';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Fetch products, customers, and transaction history
    fetchProducts();
    fetchCustomers();
    fetchTransactionHistory();
  }, []);

  const fetchProducts = async () => {
    // Replace with your API endpoint
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchCustomers = async () => {
    // Replace with your API endpoint
    const response = await fetch('http://localhost:5000/api/customers');
    const data = await response.json();
    setCustomers(data);
  };

  const fetchTransactionHistory = async () => {
    // Replace with your API endpoint
    const response = await fetch('http://localhost:5000/api/transactions');
    const data = await response.json();
    setTransactionHistory(data);
  };

  const handleAddStock = async () => {
    // Add stock logic
    const response = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: selectedProduct,
        customerId: selectedCustomer,
        quantity,
        type: 'add',
      }),
    });
    const data = await response.json();
    if (data.success) {
      fetchProducts();
      fetchTransactionHistory();
    } else {
      alert('Failed to add stock');
    }
  };

  const handleRemoveStock = async () => {
    // Remove stock logic
    const response = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: selectedProduct,
        customerId: selectedCustomer,
        quantity,
        type: 'remove',
      }),
    });
    const data = await response.json();
    if (data.success) {
      fetchProducts();
      fetchTransactionHistory();
    } else {
      alert('Failed to remove stock');
    }
  };

  return (
    <div className="stock-management">
      <div className="form-container">
        <h2>Add Stock</h2>
        <form onSubmit={e => e.preventDefault()}>
          <select
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCustomer}
            onChange={e => setSelectedCustomer(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            min="1"
          />
          <button type="button" onClick={handleAddStock}>
            Add Stock
          </button>
        </form>
      </div>

      <div className="form-container">
        <h2>Remove Stock</h2>
        <form onSubmit={e => e.preventDefault()}>
          <select
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCustomer}
            onChange={e => setSelectedCustomer(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            min="1"
          />
          <button type="button" onClick={handleRemoveStock}>
            Remove Stock
          </button>
        </form>
      </div>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction.product.name}</td>
                <td>{transaction.customer.name}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.type}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockManagement;
