import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postClient } from "../../../../redux/actions";
import { toast } from "react-toastify";

import Loading from "../../../Loading/Loading";

import "../Form.css";
import { initializeApp } from "firebase/app";

export default function ClientForm({ addClient, handleAddClient }) {
  const userId = useSelector((state) => state.user.uid);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    email: "",
    type: "Tipo",
    dataType: "",
    address: "",
    phone: "",
  };
  const [client, setclient] = useState(initialState);

  function handleChange(e) {
    setclient({ ...client, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    dispatch(postClient(userId, client))
      .then((d) => {
        hanldeClose();
        setLoading(false);
        toast("Cliente agregado exitosamente");
      })
      .catch((e) => {
        setLoading(false);
        toast("Hubo un error al agregar al cliente");
      });
  }

  function hanldeClose() {
    handleAddClient();
    setclient(initialState);
  }

  return (
    <div
      className="container__form"
      style={addClient ? null : { display: "none" }}
    >
      <form className="form to-left" onSubmit={handleSubmit}>
        <div className="form__close">
          <h2>Nuevo Cliente</h2>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={hanldeClose}
          ></button>
        </div>

        {/* Name */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            value={client.name}
            name="name"
            onChange={handleChange}
          />
          <label className="form-label">Nombre</label>
        </div>

        {/* Type */}
        <div className="form-floating mb-3">
          <select className="form-select" name="type" onChange={handleChange}>
            <option value="Tipo">Seleccionar</option>
            <option value="Ruc">Ruc</option>
            <option value="Cedula">Cedula</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          <label>Tipo</label>
        </div>

        <div className="form-floating mb-3">
          <input
            disabled={client.type === "Tipo" ? true : false}
            className="form-control"
            name="dataType"
            value={client.dataType}
            onChange={handleChange}
          />
          <label className="form-label">{client.type}</label>
        </div>

        {/* Email*/}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="email"
            value={client.email}
            onChange={handleChange}
          />
          <label className="form-label">Email</label>
        </div>

        {/* Adress */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="address"
            value={client.address}
            onChange={handleChange}
          />
          <label className="form-label">Direccion</label>
        </div>

        {/* Phone */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="phone"
            value={client.phone}
            onChange={handleChange}
          />
          <label className="form-label">Telefono</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Cliente
        </button>
      </form>
      {loading ? <Loading /> : null}
    </div>
  );
}
