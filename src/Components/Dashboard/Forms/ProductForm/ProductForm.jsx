import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postProduct } from "../../../../redux/actions";

import Loading from "../../../Loading/Loading";

import "../Form.css";

export default function ProductForm({ addProduct, handleAddProduct }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const [product, setProduct] = useState({
    code: "",
    type: "",
    price: "",
    taxesBoolean: false,
    taxes: "",
    description: "",
  });

  function handleChange(e) {
    console.log(product);
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const newProduct = {
      code: product.code,
      type: product.type,
      price: product.price,
      taxes: product.taxes,
      description: product.description,
    };

    dispatch(postProduct(userId, newProduct))
    .then(d => {
      setLoading(false);
      handleAddProduct();
      toast("¡Producto agregado exitosamente!");
    })
    .catch(e => {
      toast("Hubo un error al agregar el producto");
      console.log(e);
    })
  }

  return (
    <div
      className="container__form"
      style={addProduct ? null : { display: "none" }}
    >
      <form className="form to-left" onSubmit={handleSubmit}>
        <div className="form__close">
          <h2>Nuevo Producto</h2>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleAddProduct}
          ></button>
        </div>

        {/* Code */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            name="code"
            onChange={handleChange}
          />
          <label htmFor="floatingInput">Codigo</label>
        </div>

        {/* Type */}
        <div className="form-floating mb-3">
          <select className="form-select" name="type" onChange={handleChange}>
            <option>Seleccione un tipo</option>
            <option>Producto</option>
            <option>Servicio</option>
          </select>
          <label htmFor="floatingInput">Tipo</label>
        </div>

        {/* Price */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            name="price"
            onChange={handleChange}
          />
          <label htmFor="floatingInput">Precio</label>
        </div>

        {/* Impuesto */}
        <div className="form-floating mb-3">
          <select
            className="form-select select-input"
            id="floatingInput"
            name="taxesBoolean"
            onChange={handleChange}
          >
            <option value={false}>No</option>
            <option value={true}>Si</option>
          </select>
          <label htmFor="floatingInput">Seleccione si paga inpuestos</label>
        </div>

        {product.taxesBoolean === "true" ? (
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput"
              name="taxes"
              onChange={handleChange}
            />
            <label htmFor="floatingInput">Impuesto</label>
          </div>
        ) : null}

        {/* Description */}
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="floatingInput"
            name="description"
            onChange={handleChange}
          />
          <label htmFor="floatingInput">Descripcion</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar producto
        </button>
      </form>
      {loading ? <Loading /> : null}
    </div>
  );
}
