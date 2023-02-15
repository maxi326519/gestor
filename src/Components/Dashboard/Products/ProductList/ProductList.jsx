import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard/ProductCard";

import addSquare from "../../../../assets/svg/add-square.svg";

export default function ProductList({ handleAddProduct }) {
  const products = useSelector((state) => state.products);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      products.filter((p) => {
        if (value === "") return true;
        if (p.ITE_CODIGO.toLowerCase().includes(value.toLowerCase())) {
          console.log("Code", p.ITE_CODIGO);
          return true;
        }
        if (p.ITE_DESCRIPCION.toLowerCase().includes(value.toLowerCase())) {
          console.log("Description", p.ITE_DESCRIPCION);
          return true;
        }
        return false;
      })
    );
  }

  return (
    <div className="dashboardList">
      <h3>Listado de Productos</h3>
      <div className="dashboardList__searchBar">
        <input
          className="form-control"
          placeholder="Buscar producto"
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={handleAddProduct}>
          <img src={addSquare} alt="add product" />
          <span>Producto</span>
        </button>
      </div>
      <div className="dashboardList__grid">
        <div className="product-card first-row">
          <span>Codigo</span>
          <span>Descripcion</span>
          <span>Tipo</span>
          <span>Precio</span>
          <span>Impuesto</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay productos</span>
            </div>
          ) : (
            rows?.map(p => <ProductCard key={p.ITE_CODIGO} product={p} />)
          )}
        </div>
      </div>
    </div>
  );
}
