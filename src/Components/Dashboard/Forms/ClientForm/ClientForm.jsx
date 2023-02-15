import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postClient,
  openLoading,
  closeLoading,
} from "../../../../redux/actions";
import { toast } from "react-toastify";

import "../Form.css";

export default function ClientForm({ addClient, handleAddClient }) {
  const userId = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const initialState = {
    CLI_DIRECCION: "",
    CLI_EMAIL: "",
    CLI_IDENTIFICACION: "",
    CLI_NOMBRE: "",
    CLI_TELEFONO: "",
    CLI_TIPOIDE: "0",
  };
  const [client, setclient] = useState(initialState);
  const type = [
    { value: 4, name: "Ruc" },
    { value: 5, name: "Cedula" },
    { value: 6, name: "Pasaporte" },
  ];

  function handleChange(e) {
    console.log(client);
    setclient({ ...client, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(postClient(client))
      .then((d) => {
        hanldeClose();
        dispatch(closeLoading());
        toast.success("¡Cliente agregado exitosamente!");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error("Error al agregar el cliente");
        console.log(e);
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
            name="CLI_NOMBRE"
            value={client.CLI_NOMBRE}
            onChange={handleChange}
            required
          />
          <label className="form-label">Nombre</label>
        </div>

        {/* Type */}
        <div className="form-floating mb-3">
          <select
            className="form-select"
            name="CLI_TIPOIDE"
            onChange={handleChange}
            required
          >
            <option value={0}>Seleccionar</option>
            {type.map((t) => (
              <option key={t.value} value={t.value}>
                {t.name}
              </option>
            ))}
          </select>
          <label>Tipo</label>
        </div>

        {client.CLI_TIPOIDE !== '0' ? (
          <div className="form-floating mb-3">
            <input
              disabled={client.type === "Tipo" ? true : false}
              className="form-control"
              name="CLI_IDENTIFICACION"
              value={client.CLI_IDENTIFICACION}
              onChange={handleChange}
              required
            />
            <label className="form-label">
              {`${type.find((t) => t.value === Number(client.CLI_TIPOIDE)).name}`}
            </label>
          </div>
        ) : null}

        {/* Email*/}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="CLI_EMAIL"
            value={client.CLI_EMAIL}
            onChange={handleChange}
            required
          />
          <label className="form-label">Correo electronico</label>
        </div>

        {/* Adress */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="CLI_DIRECCION"
            value={client.CLI_DIRECCION}
            onChange={handleChange}
            required
          />
          <label className="form-label">Direccion</label>
        </div>

        {/* Phone */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="CLI_TELEFONO"
            value={client.CLI_TELEFONO}
            onChange={handleChange}
            required
          />
          <label className="form-label">Telefono</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Cliente
        </button>
      </form>
    </div>
  );
}