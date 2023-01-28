import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addClient } from "../../../../redux/actions";

import "./ClientForm.css";

export default function ClientForm({ addClient, handleAddClient }) {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const [client, setclient] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  function handleChange(e) {
    setclient({ ...client, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addClient(userId, client));
  }

  return (
    <div
      className="container__invoicesForm"
      style={addClient ? null : { display: "none" }}
    >
      <form className="clientForm" onSubmit={handleSubmit}>
      <div className="invoicesForm__close">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleAddClient}
          ></button>
        </div>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" name="name" onChange={handleChange} />
        </div>

        {/* Type */}
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select className="form-control" name="type" onChange={handleChange}>
            <option>Seleccione el tipo de usuario</option>
            <option>Ruc</option>
            <option>Cedula</option>
            <option>Pasaporte</option>
          </select>
          <input className="form-control" name="name" onChange={handleChange} />
        </div>

        {/* Email*/}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            name="email"
            onChange={handleChange}
          />
        </div>

        {/* Adress */}
        <div className="mb-3">
          <label className="form-label">Direccion</label>
          <input
            className="form-control"
            name="address"
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Telefono</label>
          <input
            className="form-control"
            name="phone"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Agregar Cliente
        </button>
      </form>
    </div>
  );
}
