// ReportsPage.jsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ReportsPage = () => {
  const [inventoryValue, setInventoryValue] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [customerReport, setCustomerReport] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const inventoryRes = await fetch('/api/reports/inventory-value');
      const inventoryData = await inventoryRes.json();
      setInventoryValue(inventoryData.totalValue);

      const categoryRes = await fetch('/api/reports/category-pie');
      const categoryData = await categoryRes.json();
      setCategoryData(categoryData);

      const lowStockRes = await fetch('/api/reports/low-stock');
      const lowStockData = await lowStockRes.json();
      setLowStockProducts(lowStockData);

      const customerReportRes = await fetch('/api/reports/customer-report');
      const customerReportData = await customerReportRes.json();
      setCustomerReport(customerReportData);
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <div>
        <h3>Total Inventory Value: ${inventoryValue}</h3>
      </div>

      <div>
        <h3>Category-wise Stock</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={Object.entries(categoryData).map(([name, value]) => ({
                name,
                value,
              }))}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {Object.keys(categoryData).map((_, index) => (
                <Cell key={index} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3>Low Stock Products</h3>
        <ul>
          {lowStockProducts.map((product) => (
            <li key={product._id}>
              {product.name} - {product.stock} in stock
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Customer Report</h3>
        <ul>
          {customerReport.map((report) => (
            <li key={report.customer}>
              {report.customer}: {report.purchases} Purchases, {report.sales} Sales
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportsPage;
