import React from "react";

import SideBar from "../SideBar/SideBar";
import ProductList from "./ProductList/ProductList";

import "../Dashboard.css";

export default function Products({
  handleAddProduct,
  handleAddStock,
  handleAddClient,
  handleProfile,
  handleAddEstablecimiento,
}) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddProduct={handleAddProduct}
        handleAddStock={handleAddStock}
        handleAddClient={handleAddClient}
        handleAddEstablecimiento={handleAddEstablecimiento}
      />
      <div className="dashboard__container to-left">
        <ProductList
          handleAddProduct={handleAddProduct}
          handleProfile={handleProfile}
          handleAddStock={handleAddStock}
        />
      </div>
    </div>
  );
}
