import React, { useState } from 'react';

const RemoveStockForm = ({ productId }) => {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity <= 0) return alert('Quantity must be greater than zero');

    try {
      const response = await fetch(`/api/products/${productId}/remove-stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Stock removed successfully. New stock: ${data.stock}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error removing stock');
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
      <button type="submit">Remove Stock</button>
    </form>
  );
};

export default RemoveStockForm;
