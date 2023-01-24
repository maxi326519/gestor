import React from 'react';

import SideBar from "../SideBar/SideBar";
import ProductForm from "./ProductForm/ProductForm";
import ProductList from "./ProductList/ProductList";

import './Products.css';

export default function Products() {
  return (
    <div className="products">
      <SideBar />
      <div className="products__container">
        <ProductList />
        <ProductForm />
      </div>
    </div>
  );
}
