import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import square from "../../../../assets/svg/add-square.svg";
import "./AddProduct.css";

export default function AddProduct({
  handleFormProduct,
  handleProduct,
  handleRemove,
  handleAddProduct,
}) {
  const products = useSelector((state) => state.products);
  const [isAdded, setAdded] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products.filter((product) => product.ITE_CANTIDAD > 0));
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
        if (!row.ITE_CANTIDAD || row.ITE_CANTIDAD <= 0) return false;
        if (value === "") return true;
        if (row.ITE_CODIGO.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.ITE_DESCRIPCION.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false;
      })
    );
  }

  return (
    <div className="form__container">
      <div className="form">
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
          <button
            className="btn btn-primary add"
            onClick={() => {
              handleAddProduct();
              handleFormProduct();
            }}
          >
            <img src={square} alt="add client" />
            Crear
          </button>
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
                    handleProduct(p);
                  }}
                >
                  +
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
