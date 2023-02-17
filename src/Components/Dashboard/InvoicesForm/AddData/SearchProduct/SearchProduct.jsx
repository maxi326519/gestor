import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SearchProduct.css";

export default function SearchProduct({ handleProduct }) {
  const products = useSelector((state) => state.products);
  const [rows, setRows] = useState();

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleSearch(e) {
    const value = e.target.value;
    setRows(
      products.filter((p) => {
        if (p.code.toLowerCase().includes(value.toLowerCase())) return true;
        if (p.description.toLowerCase().includes(value.toLowerCase()))
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
        <label htmlFor="floatingInput">Buscar product</label>
      </div>
      <div className="product-name">
        <div className="head search-product-row">
          <span>Codigo</span>
          <span>Descripcion</span>
          <span>Precio</span>
          <span>Impuesto</span>
        </div>
        <div className="list">
          {rows?.map((p) => (
            <div key={p.ITE_CODIGO} className="search-product-row" onClick={() => handleProduct(p)}>
              <span>{p.ITE_CODIGO}</span>
              <span>{p.ITE_DESCRIPCION}</span>
              <span>{p.ITE_PVP}</span>
              <span>{p.ITE_IMPUESTO ? "Si" : "No"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
