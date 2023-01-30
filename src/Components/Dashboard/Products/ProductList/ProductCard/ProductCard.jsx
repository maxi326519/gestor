import { useState } from "react";

import edit from "../../../../../assets/svg/edit.svg";
import removeIcon from "../../../../../assets/svg/remove.svg";
import save from "../../../../../assets/svg/save.svg";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const [disabled, setDisabled] = useState(true);
  const [remove, setRemove] = useState(true);

  function handleEdit(){
    setDisabled(!disabled);
  }
  
  function handleRemove(){
    setRemove(!remove);
  }

  return (
    <div key={product.code} className="product-card">
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={product.code}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={product.type}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={product.price}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={product.taxes}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={product.description}
      />
      <button className={`btn ${ disabled ? "btn-primary" : "btn-success"}`} onClick={handleEdit}>
        <img src={disabled ? edit : save} alt="edit" />
      </button>
      <button className={`btn ${ remove ? "btn-danger" : "btn-secondary"}`} onClick={handleRemove}>
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}