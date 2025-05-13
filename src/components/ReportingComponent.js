// ReportingComponent.js

import React, { useState, useEffect } from 'react';

const ReportingComponent = () => {
  const [customerReport, setCustomerReport] = useState([]);

  useEffect(() => {
    fetch('/api/reports/customer-report')
      .then(res => res.json())
      .then(data => setCustomerReport(data))
      .catch(err => console.error('Error fetching customer report:', err));
  }, []);

  return (
    <div>
      <h3>Customer Sales/Purchase Report</h3>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {customerReport.map(report => (
            <tr key={report._id}>
              <td>{report.customer.name}</td>
              <td>{report.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportingComponent;
