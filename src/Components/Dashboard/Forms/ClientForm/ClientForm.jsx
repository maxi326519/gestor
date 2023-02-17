import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  postClient,
  openLoading,
  closeLoading,
} from "../../../../redux/actions";
import { toast } from "react-toastify";

import validaDocumento from "../../../../Validations/Ruc-Ci.js";

import "../Form.css";

const initialState = {
  CLI_DIRECCION: "",
  CLI_EMAIL: "",
  CLI_IDENTIFICACION: "",
  CLI_NOMBRE: "",
  CLI_TELEFONO: "",
  CLI_TIPOIDE: "0",
};

const type = [
  { value: "04", name: "Ruc" },
  { value: "05", name: "Cedula" },
  { value: "06", name: "Pasaporte" },
];

export default function ClientForm({ addClient, handleAddClient }) {
  const dispatch = useDispatch();
  const [client, setclient] = useState(initialState);
  const [error, setError] = useState({
    CLI_IDENTIFICACION: null
  });

  function handleChange(e) {
    setclient({ ...client, [e.target.name]: e.target.value });

    if((e.target.name === "CLI_IDENTIFICACION") && ((client.CLI_TIPOIDE === "04") || (client.CLI_TIPOIDE === "05"))){
      let mensaje = validaDocumento(e.target.value).mensaje;
      if( mensaje !== "ruc" && mensaje !== "cedula"){
        setError({
          ...error,
          CLI_IDENTIFICACION: mensaje
        });
      }else{
        setError({
          ...error,
          CLI_IDENTIFICACION: null
        });
      }
    }
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
            <option value="0">Seleccionar</option>
            <option value="04">Ruc</option>
            <option value="05">Cedula</option>
            <option value="06">Pasaporte</option>
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
            { error.CLI_IDENTIFICACION ? <small>{ error.CLI_IDENTIFICACION }</small> : null}
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