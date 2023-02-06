import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postInvoice,
  openLoading,
  closeLoading,
} from "../../../redux/actions";

import AddProduct from "./AddProduct/AddProduct";
import AddClient from "./AddClient/AddClient";
import SideBar from "../SideBar/SideBar";

import addSquare from "../../../assets/svg/add-square.svg";
import arrowChange from "../../../assets/svg/arrow-change.svg";
import "./InvoicesForm.css";
import { toast } from "react-toastify";

export default function InvoicesForm({ addInvoice, handleAddInvoice, handleAddProduct, handleAddClient }) {
  const userId = useSelector((state) => state.user.uid);
  const [formProduct, setFormproduct] = useState(false);
  const [formClient, setFormClient] = useState(false);
  const [newProducts, setNewProduct] = useState([]);
  const [client, setClient] = useState(null);
  const [total, setTotal] = useState(0);

  const initialState = {
    product: [],
    client: {},
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
    dispatch(openLoading());

    const newInvoice = {
      ...invoice,
      product: newProducts,
      client: client.id,
    };

    console.log(newInvoice);

    dispatch(postInvoice(userId, newInvoice))
      .then((d) => {
        dispatch(closeLoading());
        toast("Factura agregada exitosamente!");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast("Hubo un error al agregar el producto");
        console.log(e);
      });
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

  function handleRemove(p) {
    setNewProduct(newProducts.filter((pf) => pf.code !== p.code));
  }

  function handleSelect(client) {
    setClient(client);
    setFormClient(false);
  }

  function setAmount(amount, code) {
    setNewProduct(
      newProducts.map((p) => {
        if (p.code === code) {
          return {
            ...p,
            amount: amount,
          };
        }
        return p;
      })
    );
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
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <div className="dashboard__invoice to-left">
        <h2>Nueva Factura</h2>
        <div className="invoice-data">
          {/* Date*/}
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              name="date"
              onChange={handleChange}
              required
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
                type="number"
                value={p.amount}
                onChange={(e) => setAmount(e.target.value, p.code)}
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

        <button className="btn btn-primary" onClick={handleSubmit}>
          Agregar factura
        </button>
        {/* Add product form */}
        {formProduct ? (
          <AddProduct
            handleFormProduct={handleFormProduct}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
          />
        ) : null}
        {/* Add client form */}
        {formClient ? (
          <AddClient
            handleFormClient={handleFormClient}
            handleSelect={handleSelect}
          />
        ) : null}
      </div>
    </div>
  );
}
