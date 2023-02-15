import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SearchProduct.css";

export default function SearchProduct({ handleSelect }) {
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
        if (p.description.toLowerCase().includes(value.toLowerCase())) return true;
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
        <label for="floatingInput">Buscar product</label>
      </div>
      <div className="product-name">
        {rows?.map((p) => (
          <span onClick={() => handleSelect(p)}>{p.name}</span>
        ))}
      </div>
    </div>
  );
}
