// components/ReportsPage.js

import React, { useState, useEffect } from 'react';
import './ReportsPage.css';

const ReportsPage = () => {
  const [reports, setReports] = useState({
    inventoryValue: 0,
    lowStockProducts: [],
    customerReports: [],
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const inventoryRes = await fetch('http://localhost:5000/api/reports/inventory-value');
        const inventoryData = await inventoryRes.json();

        const lowStockRes = await fetch('http://localhost:5000/api/reports/low-stock');
        const lowStockData = await lowStockRes.json();

        const customerRes = await fetch('http://localhost:5000/api/reports/customer-sales');
        const customerData = await customerRes.json();

        setReports({
          inventoryValue: inventoryData.totalValue,
          lowStockProducts: lowStockData,
          customerReports: customerData,
        });
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="reports-page">
      <h2 className="reports-page__title">Reports</h2>
      <section className="reports-page__section">
        <h3>Total Inventory Value</h3>
        <p className="reports-page__value">{reports.inventoryValue}</p>
      </section>
      <section className="reports-page__section">
        <h3>Low Stock Products</h3>
        <div className="reports-page__grid">
          {reports.lowStockProducts.map((product) => (
            <div key={product._id} className="reports-page__card">
              <h4>{product.name}</h4>
              <p>{product.stock} units left</p>
            </div>
          ))}
        </div>
      </section>
      <section className="reports-page__section">
        <h3>Customer Sales Report</h3>
        <table className="reports-page__table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {reports.customerReports.map((report) => (
              <tr key={report._id}>
                <td>{report.customer.name}</td>
                <td>{report.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ReportsPage;
