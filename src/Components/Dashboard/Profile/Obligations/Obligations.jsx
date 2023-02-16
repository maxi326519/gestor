import { useState } from "react";

import "./Obligations.css";

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
    <div className="profile-obligations">
      <hr></hr>
      <h5>Obligaciones</h5>
      {/* Impuesto */}
      <div className="form-floating mb-3">
        <select
          className="form-select select-input"
          id="floatingInput"
          name="taxesBoolean"
          value={userData.EMP_REGIMEN}
          onChange={handleChange}
          required
        >
          <option value="1">General</option>
          <option value="2">Emprendedor</option>
        </select>
        <label htmFor="floatingInput">Regimen</label>
      </div>
      <div className="obligations-check">
        <label>
          <input type="checkbox" checked={userData.EMP_SOCIEDAD} />
          Obligado a llevar contabilidad
        </label>
        <label>
          <input type="checkbox" checked={userData.EMP_AGENTE_RETENCION} />
          Agente de retención
        </label>
        <label>
          <input type="checkbox" checked={userData.EMP_INCLUYEIVA} />
          Incluir IVA
        </label>
      </div>
    </div>
  );
}
