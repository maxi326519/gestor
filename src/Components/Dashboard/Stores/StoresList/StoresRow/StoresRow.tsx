import { useState } from "react";
import { Establecimiento } from "../../../../../models/establecimientos";

import "./StoresRow.css";
import edit from "../../../../../assets/svg/edit.svg";
import removeIcon from "../../../../../assets/svg/remove.svg";
import save from "../../../../../assets/svg/save.svg";

interface Props {
  establecimiento: Establecimiento;
  handleUpdate: (establecimiento: Establecimiento) => void;
  handleRemove: (establecimientoId: string) => void;
}

export default function StoresRow({
  establecimiento,
  handleUpdate,
  handleRemove,
}: Props) {
  const [establecimientoEditable, setEstablecimiento] =
    useState(establecimiento);
  const [disabled, setDisabled] = useState(true);

  function handleEdit() {
    setDisabled(!disabled);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEstablecimiento({
      ...establecimientoEditable,
      [event.target.name]: event.target.value,
    });
  }

  function handleLocalUpdate() {
    handleUpdate(establecimientoEditable);
  }

  return (
    <div className="item-card">
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        value={establecimientoEditable.LOC_ESTABLECIMIENTO}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Establecimiento"
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        value={establecimientoEditable.LOC_ESTADO}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Estado"
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        value={establecimientoEditable.LOC_NOMBRE}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Nombre"
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        value={establecimientoEditable.LOC_NUMERO}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Numero"
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        value={establecimientoEditable.LOC_PTOEMISION}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Punto de emisión"
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        value={establecimientoEditable.LOC_TELEFONO}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Telefono"
        required
      />
      <div className="edit-buttons">
        <button
          className={`btn ${disabled ? "btn-primary" : "btn-success"}`}
          type="button"
          onClick={disabled ? handleEdit : handleLocalUpdate}
        >
          <img src={disabled ? edit : save} alt="edit" />
        </button>
        {disabled ? null : (
          <button className="btn btn-danger" type="button" onClick={handleEdit}>
            x
          </button>
        )}
      </div>
      <button
        className="btn btn-danger"
        onClick={() => handleRemove(establecimiento.LOC_ESTABLECIMIENTO)}
      >
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
