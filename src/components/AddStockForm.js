import React, { useState } from 'react';

const AddStockForm = ({ productId }) => {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity <= 0) return alert('Quantity must be greater than zero');

    try {
      const response = await fetch(`/api/products/${productId}/add-stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Stock added successfully. New stock: ${data.stock}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error adding stock');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        placeholder="Quantity"
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default AddStockForm;
