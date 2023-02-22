import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import add from "../../../../assets/svg/add-square.svg";
import "./AddProduct.css";

export default function AddProduct({
  handleFormProduct,
  handleAdd,
  handleRemove,
  newProducts
}) {
  const products = useSelector((state) => state.products);
  const [productInvoice, setProduct] = useState([]);
  const [isAdded, setAdded] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products);
    setAdded(
      products.map((p) => {
        return {
          code: p.code,
          added: false,
        };
      })
    );
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
          <input
            className="form-control"
            placeholder="Buscar un producto..."
            onChange={handleChange}
          />
        </div>
        <div className="product-list">
          <div className="invoice-product-card">
            <span>Codigo</span>
            <span>Descripcion</span>
            <span>Tipo</span>
            <span>Precio</span>
            <span>Impuesto</span>
            <span>Agregar</span>
          </div>
          {rows?.map((p, i) => (
            <div key={i} className="invoice-product-card">
              <span>{p.ITE_CODIGO}</span>
              <span>{p.ITE_DESCRIPCION}</span>
              <span>{p.ITE_TIPO === 0 ? "Producto" : "Servicio"}</span>
              <span>{p.ITE_PVP}</span>
              <span>{p.ITE_IMPUESTO === "0" ? "NO" : "SI"}</span>
              {isAdded[i] && isAdded[i].added ? (
                <span
                  key={i}
                  className="btn btn-danger"
                  onClick={() => {
                    isAdded[i].added = false;
                    handleRemove(p);
                  }}
                >
                  -
                </span>
              ) : (
                <span
                  key={i}
                  className="btn btn-primary"
                  onClick={() => {
                    isAdded[i].added = true;
                    handleAdd(p);
                  }}
                >
                  +
                </span>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
