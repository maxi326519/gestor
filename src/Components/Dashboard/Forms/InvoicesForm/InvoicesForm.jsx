import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddProduct from "./AddProduct/AddProduct";

import addSquare from "../../../../assets/svg/add-square.svg";
import "./InvoicesForm.css";

export default function InvoicesForm({ addInvoice, handleAddInvoice }) {
  const [formProduct, setFormproduct] = useState(false);
  const [total, setTotal] = useState(0);
  const [newProducts, setNewProduct] = useState([]);
  const initialState = {
    code: "",
    cost: "",
    amount: "",
    product: "",
    client: "",
    date: "",
  };

  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState(initialState);

  function handleChange(e) {
    console.log(invoice);
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleFormProduct() {
    setFormproduct(!formProduct);
  }

  function handleAdd(p) {
    if (!newProducts.find((pi) => pi.code === p.code)) {
      setNewProduct([
        ...newProducts,
        {
          code: p.code,
          name: p.name,
          unitPrice: p.price,
          amount: 0
        },
      ]);
    }
  }

  function setAmount(p, amount){
    setNewProduct([
      ...newProducts,
      {
        ...p,
        amount: amount
      }]);
  }

  useEffect(() => {
    let total = 0;

    newProducts.forEach((p) => {
      total += p.unitPrice * p.amount;
    });

    setTotal(total);
  }, [newProducts]);

  return (
    <div
      className="container__form"
      style={addInvoice ? null : { display: "none" }}
    >
      <form className="form-invoice to-left" onSubmit={handleSubmit}>
        <div className="form__close">
          <h2>Nueva Factura</h2>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleAddInvoice}
          ></button>
        </div>

        <div className="invoice-data">
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
          {/* Client*/}
          <div className="form-floating mb-3">
            <select className="form-select" name="pvp" onChange={handleChange}>
              <option>Seleccionar</option>
              {/*               {clients.map((c) => (
                <option>{c.name}</option>
              ))} */}
            </select>
            <label for="floatingInput">Cliente</label>
          </div>
          <button className="btn btn-primary" onClick={handleFormProduct}>
            <img src={addSquare} alt="add product" />
            <span>Producto</span>
          </button>
        </div>

        <div className="invoice-products">
          <div className="invoice-row invoice-first-row">
            <span>Producto/Servicio</span>
            <span>Precio unitario</span>
            <span>Cantidad</span>
            <span>Monto</span>
          </div>
          {newProducts?.map((p) => (
            <div className="invoice-row">
              <span>{p.name}</span>
              <span>{p.unitPrice}</span>
              <input className="amount" value={p.amount} onChange={e => setAmount(p, e.target.value)}/>
              <span>{p.unitPrice * p.amount}</span>
            </div>
          ))}
          <div className="invoice-total">
            <span>Subtotal</span>
            <span className="total">{total}</span>
          </div>
          <div className="invoice-total">
            <span>Impuesto</span>
            <span className="total">0</span>
          </div>
          <div className="invoice-total">
            <span>Total</span>
            <span className="total">{total}</span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar factura
        </button>
        {formProduct ? (
          <AddProduct handleFormProduct={handleFormProduct} handleAdd={handleAdd}/>
        ) : null}
      </form>
    </div>
  );
}
