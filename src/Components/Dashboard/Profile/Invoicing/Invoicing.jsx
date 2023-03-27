import "./Invoicing.css";

export default function Invoicing({
  disabled,
  userData,
  handleChange,
  type,
  handleShowPassword,
  handleFile,
}) {
  return (
    <div className="invoicing">
      <hr></hr>
      <h5>Facturacion electronica</h5>

      <div className="invoice_number">
        <div className="form-floating mb-3 number">
          <input
            type="number"
            className="form-control"
            name="EMP_ESTABLECIMIENTO"
            disabled={disabled}
            value={userData.EMP_ESTABLECIMIENTO}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Establecimiento</label>
        </div>

        <div className="form-floating mb-3 number">
          <input
            type="number"
            className="form-control"
            name="EMP_PTOEMISION"
            disabled={disabled}
            value={userData.EMP_PTOEMISION}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Emisión</label>
        </div>

        <div className="form-floating mb-3 serial">
          <input
            type="number"
            className="form-control"
            name="EMP_NUMERO"
            disabled={disabled}
            value={userData.EMP_NUMERO}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Numero secuencial</label>
        </div>

        <div className="form-floating mb-3 number">
          <input
            type="number"
            className="form-control"
            name="EMP_PRECISION"
            disabled={disabled}
            value={userData.EMP_PRECISION}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Decimales</label>
        </div>
      </div>

      <div className="firma">
        <span>Subir Firma electronica</span>
        <input
          type="file"
          name="file"
          accept="image/*"
          className="form-control"
          disabled={disabled}
          onChange={handleFile}
        />

        {/* CLAVE DE LA FIRMA */}
        <div className="form-floating mb-3 ">
          <input
            type={type}
            className="form-control"
            name="EMP_KEY"
            disabled={disabled}
            value={userData.EMP_KEY}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Clave de la firma</label>
        </div>
        {disabled ? null : (
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleShowPassword}
          >
            Ver clave
          </button>
        )}
      </div>
    </div>
  );
}
