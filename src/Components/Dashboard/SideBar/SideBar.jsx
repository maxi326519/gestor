import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/actions';
import { Link, useNavigate } from "react-router-dom";

import users from "../../../assets/svg/users.svg";
import products from "../../../assets/svg/products.svg";
import invoices from "../../../assets/svg/invoices.svg";
import "./SideBar.css";

export default function SideBar() {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  function handleLogOut(){
    dispatch(logOut());
    redirect('/login');
  }

  return (
    <div className="sideBar">
      <h1 className="sideBar__title">Dashboard</h1>
      <button>Perfil</button>
      <button onClick={handleLogOut}>Cerrar sesion</button>
      <Link to="/dashboard">
        <img className="sideBar__icon" src={null} alt="users" />
        <span className="sideBar__text">Home</span>
      </Link>
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