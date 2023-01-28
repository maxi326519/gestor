import React from "react";

import SideBar from "../SideBar/SideBar";
import ProductList from "./ProductList/ProductList";

import "../Dashboard.css";

export default function Products({
  handleAddInvoice,
  handleAddProduct,
  handleAddClient,
}) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <div className="dashboard__container to-left">
        <ProductList handleAddProduct={handleAddProduct}/>
      </div>
    </div>
  );
}
