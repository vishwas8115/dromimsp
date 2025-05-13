import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/products">Product Management</Link>
        </li>
        <li>
          <Link to="/customers">Customer Management</Link>
        </li>
        <li>
          <Link to="/stock">Stock In/Out</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link> {/* NEW */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
