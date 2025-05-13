// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import CustomerManagement from './components/CustomerManagement';
import StockManagement from './components/StockManagement';
import ReportsPage from './components/ReportsPage'; // Import ReportsPage
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/customers');
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => [...prev, data]);
      } else {
        alert(data.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Server error while adding product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${updatedProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p._id === data._id ? data : p))
        );
        setEditingProduct(null);
        alert('Product updated successfully!');
      } else {
        alert(data.message || 'Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Server error while updating product.');
    }
  };

  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route
            path="/products"
            element={
              <>
                <ProductForm
                  onSubmit={handleAddProduct}
                  onUpdate={handleUpdateProduct}
                  editingProduct={editingProduct}
                />
                <ProductTable
                  products={products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            }
          />
          <Route
            path="/customers"
            element={
              <CustomerManagement
                customers={customers}
                fetchCustomers={fetchCustomers}
              />
            }
          />
          <Route
            path="/stock"
            element={
              <StockManagement
                products={products}
                customers={customers}
                refreshProducts={fetchProducts}
              />
            }
          />
          <Route path="/reports" element={<ReportsPage />} /> {/* Reports route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
