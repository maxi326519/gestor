import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import add from "../../../../assets/svg/add-square.svg";
import "./AddProduct.css";

export default function AddProduct({ handleFormProduct, handleAdd }) {
  const products = useSelector((state) => state.products);
  const [productInvoice, setProduct] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      products.filter((row) => {
        if (value === "") return true;
        if (row.name.toLowerCase().includes(value.toLowerCase())) return true;
        if (row.code.toLowerCase().includes(value.toLowerCase())) return true;
        return false;
      })
    );
  }

  return (
    <div className="form__container">
      <form className="form">
        <div className="form__close">
          <h4>Agregar Productos</h4>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleFormProduct}
          ></button>
        </div>
        <div className="Search-product">
          <input className="form-control" placeholder="Buscar un producto..." onChange={handleChange}/>
        </div>
        <div className="product-list">
          <div className="invoice-product-card">
            <span>Codigo</span>
            <span>Nombre</span>
            <span>Agregar</span>
          </div>
          {rows?.map((p) => (
            <div className="invoice-product-card">
              <span>{p.code}</span>
              <span>{p.name}</span>
              <span className="btn btn-primary"onClick={() => handleAdd(p)}>
                +
              </span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
