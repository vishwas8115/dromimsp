import React, { useState, useEffect } from 'react';
import './ProductTable.css';

const CustomerManagement = ({ customers, fetchCustomers }) => {
  const [form, setForm] = useState({ name: '', mobile: '', address: '' });
  const [editingId, setEditingId] = useState(null);

  // Reset form whenever the customer list changes
  useEffect(() => {
    setForm({ name: '', mobile: '', address: '' });
    setEditingId(null);
  }, [customers]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/api/customers/${editingId}`
        : 'http://localhost:5000/api/customers';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // Read raw text, then attempt JSON parse
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); }
      catch { data = text; }

      if (!res.ok) {
        console.error(`Error ${method} ${url}:`, res.status, data);
        alert(`Error ${res.status}: ${JSON.stringify(data)}`);
        return;
      }

      // Success: refresh list from server
      await fetchCustomers();
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error saving customer');
    }
  };

  const startEdit = cust => {
    setForm({ name: cust.name, mobile: cust.mobile, address: cust.address });
    setEditingId(cust._id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this customer?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error(`Delete failed: ${res.status}`, errText);
        alert(`Delete error ${res.status}: ${errText}`);
        return;
      }
      await fetchCustomers();
    } catch (err) {
      console.error('Network error on delete:', err);
      alert('Network error deleting customer');
    }
  };

  return (
    <div className="product-table-container">
      <h2>Customer Management</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Mobile</th><th>Address</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(cust => (
            <tr key={cust._id}>
              <td>{cust.name}</td>
              <td>{cust.mobile}</td>
              <td>{cust.address}</td>
              <td>
                <button className="edit-btn" onClick={() => startEdit(cust)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(cust._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
