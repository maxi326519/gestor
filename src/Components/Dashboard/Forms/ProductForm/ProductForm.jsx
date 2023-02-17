import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  postProduct,
  openLoading,
  closeLoading
} from "../../../../redux/actions";

import "../Form.css";

export default function ProductForm({ addProduct, handleAddProduct }) {
  const dispatch = useDispatch();
  const initialState = {
    ITE_CODIGO: "",
    ITE_DESCRIPCION: "",
    ITE_TIPO: 0,
    ITE_IMPUESTO: 0,
    ITE_PVP: "",
  };
  const [product, setProduct] = useState(initialState);

  function handleChange(e) {
    console.log(product);
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());

    dispatch(postProduct(product))
      .then((d) => {
        dispatch(closeLoading());
        handleClose();
        toast.success("¡Producto agregado exitosamente!");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error("Error al agregar el producto");
        console.log(e);
      });
  }

  function handleClose() {
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

        {/* DESCRIPCION */}
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="floatingInput"
            name="ITE_DESCRIPCION"
            value={product.ITE_DESCRIPCION}
            onChange={handleChange}
            required
          />
          <label htmFor="floatingInput">Descripcion</label>
        </div>

        {/* Code */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            name="ITE_CODIGO"
            value={product.ITE_CODIGO}
            onChange={handleChange}
            required
          />
          <label htmFor="floatingInput">Codigo</label>
        </div>

        {/* Type */}
        <div className="form-floating mb-3">
          <select
            className="form-select"
            name="ITE_TIPO"
            value={product.ITE_TIPO}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value={0}>Producto</option>
            <option value={1}>Servicio</option>
          </select>
          <label htmFor="floatingInput">Tipo</label>
        </div>

        {/* Price */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            name="ITE_PVP"
            value={product.ITE_PVP}
            onChange={handleChange}
            required
          />
          <label htmFor="floatingInput">Precio</label>
        </div>

        {/* Impuesto */}
        <div className="form-floating mb-3">
          <select
            className="form-select select-input"
            id="floatingInput"
            name="ITE_IMPUESTO"
            value={product.ITE_IMPUESTO}
            onChange={handleChange}
            required
          >
            <option value={0}>No</option>
            <option value={2}>Si</option>
          </select>
          <label htmFor="floatingInput">Seleccione si paga inpuestos</label>
        </div>

        {product.ITE_IMPUESTO === "true" ? (
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput"
              value="12%"
              disabled={true}
              onChange={handleChange}
              required
            />
            <label htmFor="floatingInput">Impuesto</label>
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary">
          Agregar producto
        </button>
      </form>
    </div>
  );
}
