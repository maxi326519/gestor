import { Link } from "react-router-dom";

import users from "../../../assets/users.svg";
import products from "../../../assets/products.svg";
import invoices from "../../../assets/invoices.svg";
import "./SideBar.css";

export default function SideBar() {
  return (
    <div className="sideBar">
      <h1 className="sideBar__title">Dashboard</h1>
      <Link to="/dashboard/products">
        <img className="sideBar__icon" src={products} alt="users" />
        <span className="sideBar__text">Productos</span>
      </Link>
      <Link to="/dashboard/clients">
        <img className="sideBar__icon" src={users} alt="products" />
        <span className="sideBar__text">Clientes</span>
      </Link>
      <Link to="/dashboard/invoices">
        <img className="sideBar__icon" src={invoices} alt="invoices" />
        <span className="sideBar__text">Facturas</span>
      </Link>
    </div>
  );
}
