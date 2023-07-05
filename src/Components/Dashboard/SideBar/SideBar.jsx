import { useState } from "react";
import { Link } from "react-router-dom";

import "./SideBar.css";
import dashboard from "../../../assets/img/facturador.png";
import arrowDown from "../../../assets/svg/arrow-down.svg";
import users from "../../../assets/svg/users.svg";
import products from "../../../assets/svg/products.svg";
import invoices from "../../../assets/svg/invoices.svg";
import list from "../../../assets/svg/list.svg";
import addSquere from "../../../assets/svg/add-square.svg";
import options from "../../../assets/svg/options.svg";
import stores from "../../../assets/svg/stores.svg";
import movements from "../../../assets/svg/movements.svg";
import reports from "../../../assets/svg/reports.svg";

export default function SideBar({
  handleAddProduct,
  handleAddClient,
  handleAddEstablecimiento,
}) {
  const initialState = {
    user: false,
    invoices: false,
    products: false,
    clients: false,
    stores: false,
    movements: false,
  };
  const [accordion, setAccordion] = useState(initialState);
  const [isOpen, setOpen] = useState(false);

  const sideItems = [
    {
      label: "Facturas",
      acordion: {
        name: "invoices",
        value: accordion.invoices,
      },
      icon: { svg: invoices, alt: "invoices" },
      subItems: [
        {
          type: "Link",
          value: "list",
          label: "Listado",
          icon: { svg: list, alt: "list" },
          to: "/dashboard/invoices",
        },
        {
          type: "Link",
          value: "add invoice",
          label: "Agregar factura",
          icon: { svg: addSquere, alt: "addSquere" },
          to: "/dashboard/invoices/add",
        },
      ],
    },
    {
      label: "Productos",
      acordion: {
        name: "products",
        value: accordion.products,
      },
      icon: { svg: products, alt: "products" },
      subItems: [
        {
          type: "Link",
          value: "list",
          label: "Listado",
          icon: { svg: list, alt: "list" },
          to: "/dashboard/products",
        },
        {
          type: "Button",
          value: "add products",
          label: "Agregar producto",
          icon: { svg: addSquere, alt: "addSquere" },
          handler: () => {
            handleAddProduct();
            handleOpen();
          },
        },
      ],
    },
    {
      label: "Clientes",
      acordion: {
        name: "clients",
        value: accordion.clients,
      },
      icon: { svg: users, alt: "users" },
      subItems: [
        {
          type: "Link",
          value: "list",
          label: "Listado",
          icon: { svg: list, alt: "list" },
          to: "/dashboard/clients",
        },
        {
          type: "Button",
          value: "add client",
          label: "Agregar cliente",
          icon: { svg: addSquere, alt: "addSquere" },
          handler: () => {
            handleAddClient();
            handleOpen();
          },
        },
      ],
    },
    {
      label: "Establecimientos",
      acordion: {
        name: "stores",
        value: accordion.stores,
      },
      icon: { svg: stores, alt: "stores" },
      subItems: [
        {
          type: "Link",
          value: "list",
          label: "Listado",
          icon: { svg: list, alt: "list" },
          to: "/dashboard/stores",
        },
        {
          type: "Button",
          value: "add store",
          label: "Agregar establecimiento",
          icon: { svg: addSquere, alt: "addSquere" },
          handler: () => {
            handleAddEstablecimiento();
            handleOpen();
          },
        },
      ],
    },
    {
      label: "Movimientos",
      acordion: {
        name: "movements",
        value: accordion.movements,
      },
      icon: { svg: movements, alt: "movements" },
      subItems: [
        {
          type: "Link",
          value: "list",
          label: "Listado",
          icon: { svg: list, alt: "list" },
          to: "/dashboard/movements",
        },
      ],
    },
  ];

  function handleAccordion(name) {
    setAccordion({ ...initialState, [name]: !accordion[name] });
  }

  function handleOpen() {
    setOpen(!isOpen);
  }

  return (
    <div
      className={`container__sideBar ${isOpen ? "open__sidebar" : ""}`}
      onMouseLeave={() => {
        setAccordion(initialState);
      }}
    >
      <div className="sideBar">
        <div className="sideBar__title">
          <img src={dashboard} alt="dashboard" />
          <h1>Factureo</h1>
          <div className="options">
            <img src={options} alt="options" onClick={handleOpen} />
          </div>
        </div>
        {sideItems.map((item) => (
          <div>
            <button onClick={() => handleAccordion(item.acordion.name)}>
              <img
                className="sideBar__icon"
                src={item.icon.svg}
                alt={item.icon.alt}
              />
              <span className="sideBar__text">{item.label}</span>
              <img className="sideBar__down" src={arrowDown} alt="arrowDown" />
            </button>

            <div
              className="sideBar__accordion"
              style={
                item.acordion.value ? { display: "block" } : { display: "none" }
              }
            >
              {item.subItems.map((subItem) =>
                subItem.type === "Link" ? (
                  <Link to={subItem.to}>
                    <button>
                      <img
                        className="sideBar__icon"
                        src={subItem.icon.svg}
                        alt={subItem.icon.alt}
                      />
                      <span className="sideBar__text">{subItem.label}</span>
                    </button>
                  </Link>
                ) : (
                  subItem.type === "Button" && (
                    <button onClick={subItem.handler}>
                      <img
                        className="sideBar__icon"
                        src={subItem.icon.svg}
                        alt={subItem.icon.alt}
                      />
                      <span className="sideBar__text">{subItem.label}</span>
                    </button>
                  )
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
