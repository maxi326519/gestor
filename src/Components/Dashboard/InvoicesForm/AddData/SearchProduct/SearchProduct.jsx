import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SearchProduct.css";

export default function SearchProduct({ handleProduct, handleFormProduct }) {
  const products = useSelector((state) => state.products);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products.filter((product) => product.ITE_CANTIDAD > 0));
  }, [products]);

  function handleSearch(e) {
    const value = e.target.value;
    setRows(
      products.filter((p) => {
        if (!p.ITE_CANTIDAD || p.ITE_CANTIDAD <= 0) return false;
        if (p.ITE_CODIGO.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (p.ITE_DESCRIPCION.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false;
      })
    );
  }

  return (
    <div className="search-container">
      <div className="form-floating mb-3">
        <input
          type="search"
          className="form-control"
          name="newProduct"
          onChange={handleSearch}
        />
        <label htmlFor="floatingInput">Buscar producto</label>
      </div>
      <div className="product-name">
        <div className="head search-product-row">
          <span>Codigo</span>
          <span>Descripcion</span>
          <span>Precio</span>
          <span>Impuesto</span>
        </div>
        <div className="list">
          {rows.length > 0 ? (
            rows?.map((p) => (
              <div
                key={p.ITE_CODIGO}
                className="search-product-row"
                onClick={() => handleProduct(p)}
              >
                <span>{p.ITE_CODIGO}</span>
                <span>{p.ITE_DESCRIPCION}</span>
                <span>{p.ITE_PVP}</span>
                <span>{p.ITE_IMPUESTO ? "Si" : "No"}</span>
              </div>
            ))
          ) : (
            <div className="search-list-empty">
              <span>¿No encuentra el producto?</span>
              <button className="btn btn-primary" onClick={handleFormProduct}>
                Agregar Producto
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
