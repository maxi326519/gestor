import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  confirmFacturaElectronica,
  openLoading,
  closeLoading,
} from "../../../../redux/actions";
import "./ElectronicInvoice.css";

export default function ElectronicInvoice() {
  const dispatch = useDispatch();
  const initialState = {
    EMP_ESTABLECIMIENTO: "001",
    EMP_PTOEMISION: "001",
    EMP_NUMERO: 1,
    EMP_PRECISION: 2,
    EMP_ARCHIVO: "",
    EMP_KEY: "",
  };

  const [facturacion, setFacturacion] = useState(initialState);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(confirmFacturaElectronica(facturacion))
    .then(() => {
      dispatch(closeLoading);
    })
    .catch(() => {
      dispatch(closeLoading);
    })
  }

  function handleChange(e) {
    setFacturacion({
      ...facturacion,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className="electronicInvoice" onSubmit={handleSubmit}>
      <hr></hr>
      <h5>Facturacion electronica</h5>

      <div className="container_invoice_n">
        <div className="factura-container">
          {/* ESTABLECIMIENTO */}
          <div className="form-floating mb-3 ">
            <input
              className="form-control"
              type="number"
              name="EMP_ESTABLECIMIENTO"
              value={facturacion.EMP_ESTABLECIMIENTO}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Establecimiento</label>
          </div>

          {/* PTO EMISION */}
          <div className="form-floating mb-3 ">
            <input
              className="form-control"
              type="number"
              name="EMP_PTOEMISION"
              value={facturacion.EMP_PTOEMISION}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Pto Emisión</label>
          </div>
        </div>
        <div className="form-floating mb-3 number">
          <input
            className="form-control"
            type="number"
            name="EMP_NUMERO"
            value={facturacion.EMP_NUMERO}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Numero secuencial</label>
        </div>
        <div>
          <span>Decimales:</span>
          <input
            className="form-control"
            type="number"
            name="EMP_PRECISION"
            value={facturacion.EMP_PRECISION}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <label>Subir Firma electronica</label>
      <input
        type="file"
        name="file"
        accept="image/*"
        className="form-control"
        onChange={handleChange}
        required
      />

      {/* CLAVE DE LA FIRMA */}
      <div className="form-floating mb-3 ">
        <input
          type="password"
          className="form-control"
          name="EMP_KEY"
          value={facturacion.EMP_KEY}
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingInput">Clave de la firma</label>
      </div>

      <button className="btn btn-primary">Guardar datos de facturacion</button>
    </form>
  );
}
