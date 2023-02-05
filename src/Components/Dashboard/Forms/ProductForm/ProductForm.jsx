import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postProduct, openLoading, closeLoading } from "../../../../redux/actions";

import Loading from "../../../Loading/Loading";

import "../Form.css";

export default function ProductForm({ addProduct, handleAddProduct }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.uid);
  const initialState = useState({
    name: "",
    code: "",
    type: "",
    price: "",
    taxesBoolean: false,
    taxes: "0",
    description: "",
  });
  const [product, setProduct] = useState(initialState);

  function handleChange(e) {
    console.log(product);
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());

    const newProduct = {
      name: product.name,
      code: product.code,
      type: product.type,
      price: product.price,
      description: product.description,
    };

    console.log(newProduct);

    dispatch(postProduct(6, newProduct))
      .then((d) => {
        dispatch(closeLoading());
        handleClose();
        toast("¡Producto agregado exitosamente!");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast("Hubo un error al agregar el producto");
        console.log(e);
      });
  }

  function handleClose() {
    console.log(initialState);
    handleAddProduct();
    setProduct(initialState);
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
            onClick={handleClose}
          ></button>
        </div>

        {/* Name */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <label htmFor="floatingInput">Nombre</label>
        </div>

        {/* Code */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            name="code"
            value={product.code}
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
            value={product.price}
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
              value={product.taxes}
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
            value={product.description}
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
