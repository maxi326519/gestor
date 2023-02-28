import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  postClient,
  openLoading,
  closeLoading,
} from "../../../../redux/actions";

import validaDocumento from "../../../../functions/Ruc-Ci.js";

import "../Form.css";

const initialState = {
  CLI_DIRECCION: "",
  CLI_EMAIL: "-",
  CLI_IDENTIFICACION: "",
  CLI_NOMBRE: "",
  CLI_TELEFONO: "-",
  CLI_TIPOIDE: "04",
};

const type = [
  { value: "04", name: "Ruc" },
  { value: "05", name: "Cedula" },
  { value: "06", name: "Pasaporte" },
];

export default function ClientForm({ addClient, handleAddClient }) {
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [client, setclient] = useState(initialState);
  const [error, setError] = useState({
    CLI_IDENTIFICACION: null,
    CLI_EMAIL: null,
  });

  function handleChange(e) {
    setclient({ ...client, [e.target.name]: e.target.value });
    if (e.target.name === "CLI_IDENTIFICACION") handleVerification(e);
  }

  function handleVerification(e) {
    try {
      const value = e.target.value;
      if (clients.find((c) => c.CLI_IDENTIFICACION === e.target.value))
        throw new Error("Este codigo ya existe");

      if (client.CLI_TIPOIDE === "04" || client.CLI_TIPOIDE === "05") {
        let mensaje = validaDocumento(e.target.value).mensaje;

        /* Verificamos la cedula */
        if (mensaje === "ruc") {
          if (value.length !== 13)
            throw new Error("El ruc tiene un formato incorrecto");
        } else if (mensaje === "cedula") {
          if (value.length !== 10)
            throw new Error("La cedula tiene un formato incorrecto");
        } else if (!mensaje.includes("ruc") && !mensaje.includes("cedula")) {
          setError({
            ...error,
            CLI_IDENTIFICACION: mensaje,
          });
        } else {
          setError({
            ...error,
            CLI_IDENTIFICACION: null,
          });
        }
      }
    } catch (err) {
      setError({ CLI_IDENTIFICACION: err.message });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (error.CLI_IDENTIFICACION === null) {
      dispatch(openLoading());
      dispatch(postClient(client))
        .then((d) => {
          hanldeClose();
          dispatch(closeLoading());
          swal("Agregado", "Se agrego el nuevo cliente con exito", "success");
        })
        .catch((e) => {
          dispatch(closeLoading());
          swal(
            "Error",
            "No se pudo agregar al cliente por un error desconocido",
            "error"
          );
          console.log(e);
        });
    }
  }

  function hanldeClose() {
    handleAddClient();
    setclient(initialState);
    setError({
      CLI_IDENTIFICACION: null,
    });
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

        {/* Type */}
        <div className="form-floating mb-3">
          <select
            className="form-select"
            name="CLI_TIPOIDE"
            onChange={handleChange}
            required
          >
            <option value="04">Ruc</option>
            <option value="05">Cedula</option>
            <option value="06">Pasaporte</option>
          </select>
          <label>Tipo</label>
        </div>

        <div className="form-floating mb-3">
          <input
            disabled={client.type === "Tipo" ? true : false}
            name="CLI_IDENTIFICACION"
            className={`form-control ${
              !error.CLI_IDENTIFICACION ? null : "is-invalid"
            }`}
            id={
              error.CLI_IDENTIFICACION
                ? "floatingInputInvalid"
                : "floatingInput"
            }
            value={client.CLI_IDENTIFICACION}
            onChange={handleChange}
            required
          />
          <label className="form-label">
            {`${type.find((t) => t.value === client.CLI_TIPOIDE)?.name}`}
          </label>
          {error.CLI_IDENTIFICACION ? (
            <small>{error.CLI_IDENTIFICACION}</small>
          ) : null}
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

        {/* Email*/}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="CLI_EMAIL"
            value={client.CLI_EMAIL}
            onChange={handleChange}
          />
          <label className="form-label">Correo electronico</label>
        </div>

        {/* Phone */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="CLI_TELEFONO"
            value={client.CLI_TELEFONO}
            onChange={handleChange}
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
