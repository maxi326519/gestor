import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../Form.css";

export default function InvoicesForm({ addInvoice, handleAddInvoice }) {
  const clients = useSelector((state) => state.clients);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState({
    id: "",
    cost: "",
    amount: "",
    discount: "",
    product: "",
    client: "",
    date: "",
  });

  function handleChange(e) {
    console.log(invoice);
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
/*     dispatch(addProduct(invoice)); */
  }

  return (
    <div className="container__form" style={ addInvoice ? null : {display:'none'}}>
      <form className="form to-left" onSubmit={handleSubmit}>
        <div className="form__close">
          <button type="button" className="btn-close" aria-label="Close" onClick={handleAddInvoice}></button>
        </div>

        {/* Cost */}
        <div className="mb-3">
          <label className="form-label">Valor</label>
          <input
            type="number"
            className="form-control"
            name="cost"
            onChange={handleChange}
          />
        </div>

        {/* Amount */}
        <div className="mb-3">
          <label className="form-label">Monto</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            onChange={handleChange}
          />
        </div>

        {/* Discount */}
        <div className="mb-3">
          <label className="form-label">Descuento</label>
          <input
            type="text"
            className="form-control"
            name="descuento"
            onChange={handleChange}
          />
        </div>

        {/* Product*/}
        <div className="mb-3">
          <label className="form-label">Impuesto</label>
          <select className="form-control" name="taxes" onChange={handleChange}>
            <option>Seleccione un producto</option>
            {products.map((c) => (
              <option>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Client*/}
        <div className="mb-3">
          <label className="form-label">Clientes</label>
          <select className="form-control" name="pvp" onChange={handleChange}>
            <option>Seleccione un cliente</option>
            {clients.map((c) => (
              <option>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Date*/}
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            name="type"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar factura
        </button>
      </form>
    </div>
  );
}