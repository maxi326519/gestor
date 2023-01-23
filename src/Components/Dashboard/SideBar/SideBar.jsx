import { Link } from "react-router-dom";

import users from "../../../assets/users.svg";
import products from "../../../assets/products.svg";
import invoices from "../../../assets/invoices.svg";
import "./SideBar.css";

export default function SideBar() {
  return (
    <div className="sideBar">
      <h1 className="sideBar__title">Dashboard</h1>
      <Link>
        <img className="sideBar__icon" src={users} alt="users" />
        <span className="sideBar__text">Productos</span>
      </Link>
      <Link>
        <img className="sideBar__icon" src={products} alt="products" />
        <span className="sideBar__text">Usuarios</span>
      </Link>
      <Link>
        <img className="sideBar__icon" src={invoices} alt="invoices" />
        <span className="sideBar__text">Facturas</span>
      </Link>
    </div>
  );
}
