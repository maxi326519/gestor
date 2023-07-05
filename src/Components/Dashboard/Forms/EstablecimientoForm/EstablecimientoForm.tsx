import React, { useState } from "react";
import {
  initEstablecimiento,
  initErrorEstablecimiento,
  ErrorEstablecimiento,
} from "../../../../models/establecimientos";
import useEstablecimiento, {
  UseEstablecimiento,
} from "../../../../hooks/useEstablecimiento";
import swal from "sweetalert";

import "../Form.css";

interface Props {
  addEstablecimiento: () => void;
  handleAddEstablecimiento: () => void;
}

export default function EstablecimientoForm({
  handleAddEstablecimiento,
}: Props) {
  const { establecimientos, actions }: UseEstablecimiento =
    useEstablecimiento();
  const [establecimiento, setEstablecimiento] = useState({
    ...initEstablecimiento,
  });
  const [error, setError] = useState({ ...initErrorEstablecimiento });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEstablecimiento({
      ...establecimiento,
      [event.target.name]: event.target.value,
    });
  }

  function handleVerification(): boolean {
    const errors: ErrorEstablecimiento = { ...error };
    const value = true;

    return value;
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (handleVerification()) {
      actions.agregar(establecimiento).then(() => {
        hanldeClose();
        swal(
          "Agregado",
          "Se agrego el nuevo establecimientoe con exito",
          "success"
        );
      });
    }
  }

  function hanldeClose() {
    handleAddEstablecimiento();
    setEstablecimiento({ ...initEstablecimiento });
    setError({ ...initErrorEstablecimiento });
  }

  return (
    <div className="container__form">
      <form className="form to-left" onSubmit={handleSubmit}>
        <div className="form__close">
          <h2>Nuevo Establecimientoe</h2>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={hanldeClose}
          ></button>
        </div>

        {/* LOC_ESTABLECIMIENTO */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="LOC_ESTABLECIMIENTO"
            name="LOC_ESTABLECIMIENTO"
            value={establecimiento.LOC_ESTABLECIMIENTO}
            placeholder="Nro establecimiento"
            onChange={handleChange}
            required
          />
          <label htmlFor="LOC_ESTABLECIMIENTO" className="form-label">
            Nro de establecimiento:
          </label>
        </div>

        {/* LOC_NOMBRE */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="LOC_NOMBRE"
            name="LOC_NOMBRE"
            value={establecimiento.LOC_NOMBRE}
            placeholder="Nombre"
            onChange={handleChange}
            required
          />
          <label htmlFor="LOC_NOMBRE" className="form-label">
            Nombre
          </label>
        </div>

        {/* LOC_NUMERO */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="LOC_NUMERO"
            name="LOC_NUMERO"
            value={establecimiento.LOC_NUMERO}
            placeholder="Numero"
            onChange={handleChange}
            required
          />
          <label htmlFor="LOC_NUMERO" className="form-label">
            Numero
          </label>
        </div>

        {/* LOC_PTOEMISION */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="LOC_PTOEMISION"
            name="LOC_PTOEMISION"
            value={establecimiento.LOC_PTOEMISION}
            placeholder="Punto de emisión"
            onChange={handleChange}
            required
          />
          <label htmlFor="LOC_PTOEMISION" className="form-label">
            Punto de emisión
          </label>
        </div>

        {/* LOC_TELEFONO */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="LOC_TELEFONO"
            name="LOC_TELEFONO"
            value={establecimiento.LOC_TELEFONO}
            placeholder="Telefono"
            onChange={handleChange}
            required
          />
          <label htmlFor="LOC_TELEFONO" className="form-label">
            Telefono
          </label>
        </div>

        {/* LOC_ESTADO */}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="LOC_ESTADO"
            name="LOC_ESTADO"
            value={establecimiento.LOC_ESTADO}
            placeholder="Estado"
            onChange={handleChange}
            required
          />
          <label htmlFor="LOC_ESTADO" className="form-label">
            Estado
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Establecimiento
        </button>
      </form>
    </div>
  );
}
