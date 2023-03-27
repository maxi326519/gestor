import "./Obligations.css";

export default function Obligations({
  disabled,
  userData,
  handleChange,
  handleSelect,
}) {
  return (
    <div className="profile-obligations">
      <hr></hr>
      <h5>Obligaciones</h5>
      {/* Impuesto */}
      <div className="form-floating mb-3">
        <select
          className="form-select select-input"
          id="taxes"
          name="EMP_REGIMEN"
          value={userData.EMP_REGIMEN}
          onChange={handleSelect}
          disabled={disabled}
          required
        >
          <option value="1">General</option>
          <option value="2">Emprendedor</option>
        </select>
        <label htmlFor="taxes">Regimen</label>
      </div>
      <div className="obligations-check">
        <label>
          <input
            type="checkbox"
            name="EMP_SOCIEDAD"
            checked={userData.EMP_SOCIEDAD}
            onChange={handleChange}
            disabled={disabled}
          />
          Obligado a llevar contabilidad
        </label>
        <label>
          <input
            type="checkbox"
            name="EMP_AGENTE_RETENCION"
            checked={userData.EMP_AGENTE_RETENCION}
            onChange={handleChange}
            disabled={disabled}
          />
          Agente de retención
        </label>
        <label>
          <input
            type="checkbox"
            name="EMP_INCLUYEIVA"
            checked={userData.EMP_INCLUYEIVA}
            onChange={handleChange}
            disabled={disabled}
          />
          Incluir IVA
        </label>
      </div>
    </div>
  );
}
