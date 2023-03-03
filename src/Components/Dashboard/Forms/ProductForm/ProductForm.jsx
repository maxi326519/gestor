import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  postProduct,
  openLoading,
  closeLoading,
} from "../../../../redux/actions";

import "../Form.css";

export default function ProductForm({ addProduct, handleAddProduct }) {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const initialState = {
    ITE_BARRAS: "",
    ITE_CODIGO: "",
    ITE_DESCRIPCION: "",
    ITE_ESTADO: 1,
    ITE_ICE: 0,
    ITE_IMPUESTO: "0",
    ITE_PVP: "",
    ITE_TIPO: 0,
    LOC_CODIGO: 0,
    USU_KEY: "",
    VED_CANTIDAD: 0,
  };
  const [product, setProduct] = useState(initialState);
  const [error, setError] = useState({
    ITE_CODIGO: null,
  });

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value.replace(/[^a-zA-Z0-9]/g, '') });
    if (e.target.name === "ITE_CODIGO") {
      if (products.find((p) => p.ITE_CODIGO === e.target.value)) {
        setError({ ITE_CODIGO: "Este codigo ya existe" });
      } else {
        setError({ ITE_CODIGO: null });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!error.ITE_CODIGO) {
      dispatch(openLoading());
      dispatch(postProduct(product))
        .then((d) => {
          dispatch(closeLoading());
          handleClose();
          swal("Agregado", "Se agrego el nuevo producto con exito", "success");
        })
        .catch((e) => {
          dispatch(closeLoading());
          swal(
            "Error",
            "No se pudo agregar el producto por un error desconocido",
            "error"
          );
          console.log(e);
        });
    }
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

        {/* Code */}
        <div className="form-floating mb-3">
          <input
            className={`form-control ${error.ITE_CODIGO ? "is-invalid" : ""}`}
            id={error.ITE_CODIGO ? "floatingInputInvalid" : "floatingInput"}
            name="ITE_CODIGO"
            placeholder="C001"
            value={product.ITE_CODIGO}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Codigo</label>
          <small>{error.ITE_CODIGO}</small>
        </div>

        {/* DESCRIPCION */}
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="floatingInput"
            name="ITE_DESCRIPCION"
            placeholder="Mesa"
            value={product.ITE_DESCRIPCION}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Descripcion</label>
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
          <label htmlFor="floatingInput">Tipo</label>
        </div>

        {/* Price */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="number"
            id="floatingInput"
            name="ITE_PVP"
            value={product.ITE_PVP}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Precio</label>
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
          <label htmlFor="floatingInput">Seleccione si paga inpuestos</label>
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
            <label htmlFor="floatingInput">Impuesto</label>
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary">
          Agregar producto
        </button>
      </form>
    </div>
  );
}
