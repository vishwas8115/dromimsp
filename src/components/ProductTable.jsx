import React from 'react';
import './ProductTable.css';

const ProductTable = ({ products = [], onEdit, onDelete }) => {
  const lowStockThreshold = 10;

  // Group products by category
  const grouped = products.reduce((acc, prod) => {
    if (!acc[prod.category]) acc[prod.category] = [];
    acc[prod.category].push(prod);
    return acc;
  }, {});

  return (
    <div className="product-table-container">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        Object.keys(grouped).map((category, catIndex) => (
          <div key={catIndex} className="category-group">
            <h3>{category}</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Price (₹)</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {grouped[category].map((prod) => (
                  <tr
                    key={prod._id} // Use unique identifier for the key
                    className={prod.stock < lowStockThreshold ? 'low-stock' : ''}
                  >
                    <td>{prod.name}</td>
                    <td>{prod.sku}</td>
                    <td>{prod.price}</td>
                    <td>{prod.stock}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => onEdit(prod)} // Pass the entire product object
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(prod._id)} // Pass the product id for delete
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductTable;
