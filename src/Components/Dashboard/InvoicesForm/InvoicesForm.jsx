import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import AddProduct from "./AddProduct/AddProduct";
import AddClient from "./AddClient/AddClient";
import SideBar from "../SideBar/SideBar";

import addSquare from "../../../assets/svg/add-square.svg";
import arrowChange from "../../../assets/svg/arrow-change.svg";
import "./InvoicesForm.css";

export default function InvoicesForm({ addInvoice, handleAddInvoice }) {
  const [formProduct, setFormproduct] = useState(false);
  const [formClient, setFormClient] = useState(false);
  const [newProducts, setNewProduct] = useState([]);
  const [client, setClient] = useState(null);
  const [total, setTotal] = useState(0);

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

  function handleFormClient() {
    setFormClient(!formClient);
  }

  function handleAdd(p) {
    if (!newProducts.find((pi) => pi.code === p.code)) {
      setNewProduct([
        ...newProducts,
        {
          code: p.code,
          name: p.name,
          unitPrice: p.price,
          amount: 0,
        },
      ]);
    }
  }

  function handleSelect(client) {
    setClient(client);
    setFormClient(false);
  }

  function setAmount(p, amount) {
    setNewProduct([
      ...newProducts,
      {
        ...p,
        amount: amount,
      },
    ]);
  }

  useEffect(() => {
    let total = 0;

    newProducts.forEach((p) => {
      total += p.unitPrice * p.amount;
    });

    setTotal(total);
  }, [newProducts]);

  return (
    <div className="dashboard">
      <SideBar
      /*         handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient} */
      />
      <form className="dashboard__invoice to-left" onSubmit={handleSubmit}>
        <h2>Nueva Factura</h2>
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

          {/* Client */}
          {client ? (
            <div class="invoice-data__client">
              <div class="invoice-data__client-data">
                <span>Nombre</span>
                <span>{client.name}</span>
                <span>{client.type}</span>
                <span>{client.dataType}</span>
              </div>
              <button className="btn btn-primary" onClick={handleFormClient}>
                <img src={arrowChange} alt="change client" />
                <span>Cambiar</span>
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleFormClient}>
              <img src={addSquare} alt="add client" />
              <span>Cliente</span>
            </button>
          )}

          {/* Product */}
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
              <input
                className="amount"
                value={p.amount}
                onChange={(e) => setAmount(p, e.target.value)}
              />
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
        {/* Add product form */}
        {formProduct ? (
          <AddProduct
            handleFormProduct={handleFormProduct}
            handleAdd={handleAdd}
          />
        ) : null}
        {/* Add client form */}
        {formClient ? (
          <AddClient
            handleFormClient={handleFormClient}
            handleSelect={handleSelect}
          />
        ) : null}
      </form>
    </div>
  );
}
