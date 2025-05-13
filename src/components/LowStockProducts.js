// components/LowStockProducts.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LowStockProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const response = await axios.get('/api/reports/low-stock');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching low stock products');
      }
    };

    fetchLowStockProducts();
  }, []);

  return (
    <div>
      <h2>Low Stock Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.stock} in stock
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockProducts;
