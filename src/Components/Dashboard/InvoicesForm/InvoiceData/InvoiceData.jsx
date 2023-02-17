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

export default function InvoiceData({ invoice, handleChange }) {
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
            name="date"
            values={invoice.VEN_FECHA}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Fecha de emisión</label>
        </div>

        {/* NUMERO DE LA FACTURA*/}
        <div>
          <label htmlFor="floatingInput">Numero de Factura</label>
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
        </div>

        {/* GUIA DE EMISION */}
        <label>
          <input type="checkbox" checked={invoice.VEN_GUIA} />
          Guia de remision
        </label>

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
