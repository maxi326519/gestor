import { useState } from "react";

export default function Obligations({ disabled, userData, handleChange }) {
  const [file, setFile] = useState(null);

  function handleFile(e) {
    /*         if (e.target.files.length > 0) {w
          setFile(e.target.files[0]);
          const url = URL.createObjectURL(e.target.files[0]);
          setUser({ ...userData, logo: url });
        } */
  }

  return (
    <div className="dahsboard__logo">
      <hr></hr>
      <h5>Obligaciones</h5>
      {/* Impuesto */}
      <div className="form-floating mb-3">
        <select
          className="form-select select-input"
          id="floatingInput"
          name="taxesBoolean"
          onChange={handleChange}
          required
        >
          <option value="General">General</option>
          <option value="Emprendedor">Emprendedor</option>
        </select>
        <label htmFor="floatingInput">Regimen</label>
      </div>
      <label>
        <input type="checkbox" value="hola" />
        Obligado a llevar contabilidad
      </label>
      <label>
        <input type="checkbox" value="hola" />
        Agente de retención
      </label>
      <label>
        <input type="checkbox" value="hola" />
        Incluir IVA
      </label>

      
    </div>
  );
}
