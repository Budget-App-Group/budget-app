import React from "react";
import { Link } from "react-router-dom";
import "./adminDashboard.scss";


function AdminDashboard() {
  return (
    <div className="admin-dash-main">
      Admin Dash Comp
      <div className="link-kid-register">
        <Link to="/kidregister">Register a Kid</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
