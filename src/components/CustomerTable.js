import React from 'react';

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  return (
    <div className="customer-table-container">
      <h2>Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Sales/Purchases</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.mobile}</td>
                <td>{customer.address}</td>
                <td>
                  Sales: {customer.sales.length} | Purchases: {customer.purchases.length}
                </td>
                <td>
                  <button onClick={() => onEdit(customer)}>Edit</button>
                  <button onClick={() => onDelete(customer._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerTable;
