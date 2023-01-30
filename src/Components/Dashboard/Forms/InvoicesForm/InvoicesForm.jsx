import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../Form.css";

export default function InvoicesForm({ addInvoice, handleAddInvoice }) {
  const clients = useSelector((state) => state.clients);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const initialState = {
    id: "",
    cost: "",
    amount: "",
    discount: "",
    product: "",
    client: "",
    date: "",
  }
  const [invoice, setInvoice] = useState(initialState);

  function handleChange(e) {
    console.log(invoice);
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    /*     dispatch(addProduct(invoice)); */
  }

  return (
    <div
      className="container__form"
      style={addInvoice ? null : { display: "none" }}
    >
      <form className="form to-left" onSubmit={handleSubmit}>
        <div className="form__close">
          <h2>Nueva Factura</h2>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleAddInvoice}
          ></button>
        </div>

        {/* Cost */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            name="cost"
            onChange={handleChange}
          />
          <label for="floatingInput">Valor</label>
        </div>

        {/* Amount */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="amount"
            onChange={handleChange}
          />
          <label for="floatingInput">Monto</label>
        </div>

        {/* Discount */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="descuento"
            onChange={handleChange}
          />
          <label for="floatingInput">Descuento</label>
        </div>

        {/* Product*/}
        <div className="form-floating mb-3">
          <select className="form-select" name="taxes" onChange={handleChange}>
            <option>Seleccionar</option>
            {products.map((c) => (
              <option>{c.name}</option>
            ))}
          </select>
          <label for="floatingInput">Productos</label>
        </div>

        {/* Client*/}
        <div className="form-floating mb-3">
          <select className="form-select" name="pvp" onChange={handleChange}>
            <option>Seleccionar</option>
            {clients.map((c) => (
              <option>{c.name}</option>
            ))}
          </select>
          <label for="floatingInput">Clientes</label>
        </div>

        {/* Date*/}
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            name="type"
            onChange={handleChange}
          />
          <label for="floatingInput">Fecha</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar factura
        </button>
      </form>
    </div>
  );
}
