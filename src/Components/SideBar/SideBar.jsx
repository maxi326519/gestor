import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

import dashboard from "../../assets/svg/dashboard.svg";
import arrowDown from "../../assets/svg/arrow-down.svg";
import account from "../../assets/svg/account.svg";
import profile from "../../assets/svg/profile.svg";
import logout from "../../assets/svg/logout.svg";
import users from "../../assets/svg/users.svg";
import products from "../../assets/svg/products.svg";
import invoices from "../../assets/svg/invoices.svg";
import list from "../../assets/svg/list.svg";
import addSquere from "../../assets/svg/add-square.svg";

import "./SideBar.css";

export default function SideBar({
  handleAddInvoice,
  handleAddProduct,
  handleAddClient,
}) {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const initialState = {
    user: false,
    invoices: false,
    products: false,
    clients: false,
  };
  const [accordion, setAccordion] = useState(initialState);

  function handleLogOut() {
    dispatch(logOut());
    redirect("/login");
  }

  function handleAccordion(name) {
    setAccordion({ ...initialState, [name]: !accordion[name] });
  }

  return (
    <div
      className="container__sideBar"
      onMouseLeave={() => {
        setAccordion(initialState);
      }}
    >
      <div className="sideBar">
        <div className="sideBar__title">
          <img src={dashboard} alt="dashboard" />
          <h1>Dashboard</h1>
        </div>

        {/* USER */}
        <button onClick={() => handleAccordion("user")}>
          <img className="sideBar__icon" src={account} alt="account" />
          <span name="user" className="sideBar__text">
            Cuenta
          </span>
          <img className="sideBar__down" src={arrowDown} alt="arrowDown" />
        </button>

        <div
          className="sideBar__accordion"
          style={accordion.user ? { display: "block" } : { display: "none" }}
        >
          <Link to="/dashboard/profile">
            <button>
              <img className="sideBar__icon" src={profile} alt="profile" />
              <span className="sideBar__text">Perfil</span>
            </button>
          </Link>

          <button onClick={handleLogOut}>
            <img className="sideBar__icon" src={logout} alt="logout" />
            <span name="user" className="sideBar__text">
              Cerrar sesión
            </span>
          </button>
        </div>

        {/* INVOICES */}
        <button onClick={() => handleAccordion("invoices")}>
          <img className="sideBar__icon" src={invoices} alt="invoices" />
          <span className="sideBar__text">Facturas</span>
          <img className="sideBar__down" src={arrowDown} alt="arrowDown" />
        </button>

        <div
          className="sideBar__accordion"
          style={
            accordion.invoices ? { display: "block" } : { display: "none" }
          }
        >
          <Link to="/dashboard/invoices">
            <button>
              <img className="sideBar__icon" src={list} alt="profile" />
              <span className="sideBar__text">Listado</span>
            </button>
          </Link>
          <Link to="/dashboard/invoices/add">
            <button>
              <img className="sideBar__icon" src={addSquere} alt="addSquere" />
              <span className="sideBar__text">Agregar factura</span>
            </button>
          </Link>
        </div>

        {/* PRODUCTS */}
        <button onClick={() => handleAccordion("products")}>
          <img className="sideBar__icon" src={products} alt="product" />
          <span className="sideBar__text">Productos</span>
          <img className="sideBar__down" src={arrowDown} alt="arrowDown" />
        </button>

        <div
          className="sideBar__accordion"
          style={
            accordion.products ? { display: "block" } : { display: "none" }
          }
        >
          <Link to="/dashboard/products">
            <button>
              <img className="sideBar__icon" src={list} alt="list" />
              <span className="sideBar__text">Listado</span>
            </button>
          </Link>
          <button onClick={handleAddProduct}>
            <img className="sideBar__icon" src={addSquere} alt="addSquere" />
            <span className="sideBar__text">Agregar producto</span>
          </button>
        </div>

        {/* CLIENTS */}
        <button onClick={() => handleAccordion("clients")}>
          <img className="sideBar__icon" src={users} alt="users" />
          <span className="sideBar__text">Clientes</span>
          <img className="sideBar__down" src={arrowDown} alt="arrowDown" />
        </button>

        <div
          className="sideBar__accordion"
          style={accordion.clients ? { display: "block" } : { display: "none" }}
        >
          <Link to="/dashboard/clients">
            <button>
              <img className="sideBar__icon" src={list} alt="list" />
              <span className="sideBar__text">Listado</span>
            </button>
          </Link>
          <button onClick={handleAddClient}>
            <img className="sideBar__icon" src={addSquere} alt="addSquere" />
            <span className="sideBar__text">Agregar cliente</span>
          </button>
        </div>
      </div>
    </div>
  );
}
