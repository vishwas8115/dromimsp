import React, { useEffect, useState } from 'react';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
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
        {transactions.map((transaction) => (
          <tr key={transaction._id}>
            <td>{transaction.product.name}</td>
            <td>{transaction.customer.name}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.type}</td>
            <td>{new Date(transaction.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionHistory;
