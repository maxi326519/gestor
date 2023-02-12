import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../../redux/actions";
import { toast } from "react-toastify";

import ProductCard from "./ProductCard/ProductCard";

import addSquare from "../../../../assets/svg/add-square.svg";

export default function ProductList({ handleAddProduct }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const userId = useSelector((state) => state.user.uid);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      products.filter((p) => {
        if (value === "") return true;
        if (p.code.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.name.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.description.toLowerCase().includes(value.toLowerCase()))
          return true;
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
      <div className="form-floating mb-3" style={{ width: "300px"}}>
        <input className="form-control" value={userId} />
        <label for="floatingInput">Id usuario</label>
      </div>
      <div className="dashboardList__grid">
        <div className="product-card first-row">
          <span>Codigo</span>
          <span>Nombre</span>
          <span>Tipo</span>
          <span>Precio</span>
          <span>Impuesto</span>
          <span>Descripcion</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay productos</span>
            </div>
          ) : (
            rows?.map((p) => <ProductCard product={p} />)
          )}
        </div>
      </div>
    </div>
  );
}
