import { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import {
  confirmData,
  openLoading,
  closeLoading,
  uploadFile,
} from "../../../../redux/actions";

import "./OtherData.css";

const initialState = {
  EMP_REGIMEN: 1,
  EMP_SOCIEDAD: false,
  EMP_AGENTE_RETENCION: false,
  EMP_INCLUYEIVA: false,
  EMP_ESTABLECIMIENTO: "001",
  EMP_PTOEMISION: "001",
  EMP_NUMERO: 1,
  EMP_PRECISION: 2,
  EMP_ARCHIVO: "",
  EMP_KEY: "",
};

export default function OtherData() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [data, setData] = useState(initialState);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheck(e) {
    setData({
      ...data,
      [e.target.name]: e.target.checked,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(uploadFile(file))
      .then((fileUrl) => {
        dispatch(
          confirmData({
            ...data,
            EMP_ARCHIVO: fileUrl.payload,
          })
        )
          .then(() => {
            dispatch(closeLoading());
          })
          .catch((err) => {
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error desconocido, vuelva a intentar mas tarde",
              "error"
            );
            console.log(err);
          });
      })
      .catch((err) => {
        dispatch(closeLoading());
        swal(
          "Error",
          "Ocurrió un error desconocido al cargar el archivo, vuelva a intentar mas tarde",
          "error"
        );
        console.log(err);
      });
  }

  return (
    <form className="form-otherData to-left" onSubmit={handleSubmit}>
      <div className="ohterData-container">
        <div>
          <hr></hr>
          <h5>Obligaciones</h5>
          <div className="form-floating mb-3">
            <select
              className="form-select select-input"
              id="floatingInput"
              name="EMP_REGIMEN"
              value={data.EMP_REGIMEN}
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
                type="checkbox"
                name="EMP_SOCIEDAD"
                value={data.EMP_AGENTE_RETENCION}
                onChange={handleCheck}
              />
              Obligado a llevar contabilidad
            </label>
            <label>
              <input
                name="EMP_AGENTE_RETENCION"
                value={data.EMP_AGENTE_RETENCION}
                type="checkbox"
                onChange={handleCheck}
              />
              Agente de retención
            </label>
            <label>
              <input
                type="checkbox"
                name="EMP_INCLUYEIVA"
                value={data.EMP_INCLUYEIVA}
                onChange={handleCheck}
              />
              Incluir IVA
            </label>
          </div>
        </div>

        <div>
          <hr></hr>
          <h5>Factura electronica</h5>
          <div className="container_invoice_n">
            <div className="factura-container">
              {/* ESTABLECIMIENTO */}
              <div className="form-floating mb-3 ">
                <input
                  className="form-control"
                  type="number"
                  name="EMP_ESTABLECIMIENTO"
                  value={data.EMP_ESTABLECIMIENTO}
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
                  value={data.EMP_PTOEMISION}
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
                value={data.EMP_NUMERO}
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
                value={data.EMP_PRECISION}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Subir Firma electronica</label>
          <input
            type="file"
            name="file"
            accept=".p12"
            className="form-control"
            onChange={(e) => setFile(e.target.files?.[0])}
            required
          />

          {/* CLAVE DE LA FIRMA */}
          <div className="form-floating mb-3 ">
            <input
              type="password"
              className="form-control"
              name="EMP_KEY"
              value={data.EMP_KEY}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Clave de la firma</label>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onSubmit={handleSubmit}>
        Guardar datos
      </button>
    </form>
  );
}
