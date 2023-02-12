import { useState } from "react";
import { confirmObligaciones } from "../../../../redux/actions";

import "./Obligations.css";

export default function Obligations() {
  const initialState = {
    EMP_REGIMEN: 0,
    EMP_SOCIEDAD: false,
    EMP_AGENTE_RETENCION: false,
    EMP_INCLUYEIVA: false,
  };

  const [obligaciones, setObligaciones] = useState(initialState);

  function handleChange(e) {
    console.log(initialState);
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(e.target.checked);
    setObligaciones({
      ...obligaciones,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(){

  }

  return (
    <form className="obligations">
      <h5>Obligaciones</h5>
      <div className="form-floating mb-3">
        <select
          className="form-select select-input"
          id="floatingInput"
          name="EMP_REGIMEN"
          onChange={handleChange}
          required
        >
          <option value="1">General</option>
          <option value="2">Emprendedor</option>
        </select>
        <label htmFor="floatingInput">Regimen</label>
      </div>
      <div className="check-container">
        <label>
          <input
            name="EMP_SOCIEDAD"
            type="checkbox"
            onChange={handleChange}
          />
          Obligado a llevar contabilidad
        </label>
        <label>
          <input
            name="EMP_AGENTE_RETENCION"
            type="checkbox"
            onChange={handleChange}
          />
          Agente de retención
        </label>
        <label>
          <input
            name="EMP_INCLUYEIVA"
            type="checkbox"
            onChange={handleChange}
          />
          Incluir IVA
        </label>
      </div>
      <button className="btn btn-primary" onSubmit={handleSubmit}>Guardar datos</button>
    </form>
  );
}
