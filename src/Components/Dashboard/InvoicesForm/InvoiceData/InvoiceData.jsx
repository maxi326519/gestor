import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import clave2 from "../../../../Validations/Clave.ts";

import "./InvoiceData.css";

const formasDePago = [
  { value: "01", name: "SIN UTILIZACION DEL SISTEMA FINANCIERO" },
  { value: "15", name: "COMPENSACIÓN DE DEUDAS" },
  { value: "16", name: "TARJETA DE DÉBITO" },
  { value: "17", name: "DINERO ELECTRÓNICO" },
  { value: "18", name: "TARJETA PREPAGO" },
  { value: "19", name: "TARJETA DE CRÉDITO" },
  { value: "20", name: "OTROS CON UTILIZACIÓN DEL SISTEMA FINANCIERO" },
  { value: "21", name: "ENDOSO DE TÍTULOS" },
];

function addZero(number) {
  return `00000000${number}`;
}

export default function InvoiceData({ invoice, handleChange }) {
  const user = useSelector((state) => state.user.userDB);
  const [guia, setGuia] = useState(false);
  const [dateFormat, setFormat] = useState("");

  useEffect(() => {
    const dateSplit = invoice.VEN_FECHA.split("/");
    const date = `${dateSplit[2]}-${(0 + dateSplit[1]).slice(-3)}-${dateSplit[0]}`;
    setFormat(date);
  }, [invoice])

  function handleActive(e) {
    setGuia(e.target.checked);
    handleChange();
  }

  return (
    <div className="buscadores">
      <h2>Factura</h2>
      <span>{clave2("1003223185001", "16-2-2023", "1", "001", "001")}</span>
      <div className="invoice-data">
        {/* DATE */}
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            name="VEN_FECHA"
            value={dateFormat}
            onChange={e => console.log(e)}
            required
          />
          <label htmlFor="floatingInput">Fecha de emisión</label>
        </div>

        {/* NUMERO DE LA FACTURA*/}
        <div className="invoice-number">
          <label htmlFor="floatingInput">Numero de Factura</label>
          {user ? <span>{`${user.EMP_ESTABLECIMIENTO} - ${
            user.EMP_PTOEMISION
          } - ${addZero(user.EMP_NUMERO)}`}</span> : null}
        </div>
      </div>

      {/* GUIA DE EMISION */}
      <div>
        <div className="guia-de-emision">
          <label>
            <input
              type="checkbox"
              checked={invoice.VEN_GUIA}
              onChange={handleActive}
            />
            Guia de remision
          </label>
          {guia ? (
            <div className="formas-de-pago">
              <input
                className="form-control"
                type="text"
                name="EMP_ESTABLECIMIENTO"
                value={invoice.VEN_ESTABLECIMIENTO}
                onChange={handleChange}
                required
              />
              <input
                className="form-control"
                type="text"
                name="EMP_PTOEMISION"
                value={invoice.VEN_PTOEMISION}
                onChange={handleChange}
                required
              />
              <input
                className="form-control"
                type="text"
                name="EMP_NUMERO"
                value={invoice.VEN_NUMERO}
                onChange={handleChange}
                required
              />
            </div>
          ) : null}
        </div>

        {/* FORMAS DE PAGO */}
        <div className="form-floating mb-3">
          <select
            className="form-select"
            name="type"
            onChange={handleChange}
            required
          >
            {formasDePago.map((f) => (
              <option value={f.value}>{f.name}</option>
            ))}
          </select>
          <label>Forma de pago</label>
        </div>
      </div>
    </div>
  );
}
