import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";

import clave2 from "../../../../functions/Clave.ts";

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

export default function InvoiceData({ invoice, handleChange, handleSetGuia }) {
  const user = useSelector((state) => state.user.userDB);
  const [guia, setGuia] = useState(false);
  const [guiaData, setGuiaData] = useState({
    GUIA_ESTABLECIMIENTO: 1,
    GUIA_PTEMISION: 1,
    GUIA_SECUENCIAL: 1,
  });
  const [dateFormat, setFormat] = useState("");
  const [clave, setClave] = useState(0);

  useEffect(() => {
    const dateSplit = invoice.VEN_FECHA.split("-");
    setFormat(
      `${dateSplit[2]}-${("0" + dateSplit[1]).slice(-2)}-${dateSplit[0]}`
    );
  }, [invoice]);

  useEffect(() => {
    setClave(
      clave2(
        user ? user.EMP_RUC : null,
        invoice.VEN_FECHA.split("/").join(""),
        invoice.VEN_NUMERO,
        invoice.VEN_ESTABLECIMIENTO,
        invoice.VEN_PTOEMISION
      )
    );
  }, [invoice, setClave, user]);

  useEffect(() => {
    setGuiaData({
      GUIA_ESTABLECIMIENTO: Number(user.EMP_ESTABLECIMIENTO),
      GUIA_PTEMISION: Number(user.EMP_PTOEMISION),
      GUIA_SECUENCIAL: Number(user.EMP_SECUENCIAL + 1),
    });
  }, [user]);

  useEffect(() => {
    if (guia) {
      const value = `${`00${guiaData.GUIA_ESTABLECIMIENTO}`.slice(
        -3
      )}-${`00${guiaData.GUIA_PTEMISION}`.slice(
        -3
      )}-${`00000000${guiaData.GUIA_SECUENCIAL}`.slice(-9)}`;

      handleSetGuia(value);
    } else {
      handleSetGuia("-");
    }
  }, [guiaData, guia]);

  function handleActive(e) {
    setGuia(e.target.checked);
  }

  function handleChangeGuia(e) {
    if (
      (e.target.name === "GUIA_ESTABLECIMIENTO" && e.target.value <= 999) ||
      (e.target.name === "GUIA_PTEMISION" && e.target.value <= 999) ||
      (e.target.name === "GUIA_SECUENCIAL" && e.target.value <= 999999999)
    ) {
      setGuiaData({ ...guiaData, [e.target.name]: e.target.value });
    }
  }

  function dateValidation(e) {
    const newDate = new Date(e.target.value.split("-").join("/"));
    const dateSplit = new Date().toLocaleDateString().split("/");
    const toDay = new Date(
      `${dateSplit[2]}/${("0" + dateSplit[1]).slice(-2)}/${dateSplit[0]}`
    );

    if (newDate <= toDay) {
      handleChange({
        ...e,
        target: {
          name: "VEN_FECHA",
          value: e.target.value.split("-").reverse().join("-"),
        },
      });
    } else {
      swal("Error", "No se pueden agregar fechas futuras", "error");
    }
  }

  return (
    <div className="buscadores">
      <h2>Factura</h2>
      <span className="invoice-clave">{clave}</span>
      <div className="invoice-data">
        {/* DATE */}
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            name="VEN_FECHA"
            value={dateFormat}
            onChange={dateValidation}
            required
          />
          <label htmlFor="floatingInput">Fecha de emisión</label>
        </div>

        {/* NUMERO DE LA FACTURA*/}
        <div className="invoice-number">
          <label htmlFor="floatingInput">Numero de Factura</label>
          {user ? (
            <span>{`${user.EMP_ESTABLECIMIENTO} - ${
              user.EMP_PTOEMISION
            } - ${`000000000${invoice.VEN_NUMERO}`.slice(-9)}`}</span>
          ) : null}
        </div>
      </div>

      {/* GUIA DE EMISION */}
      <div>
        <div className="guia-de-emision">
          <label>
            <input type="checkbox" checked={guia} onChange={handleActive} />
            Guia de remision
          </label>
          {guia ? (
            <div className="guia">
              <div className="">
                <input
                  className="form-control"
                  type="number"
                  name="GUIA_ESTABLECIMIENTO"
                  value={guiaData.GUIA_ESTABLECIMIENTO}
                  min={1}
                  max={999}
                  onChange={handleChangeGuia}
                  required
                />
              </div>
              <div>
                <input
                  className="form-control"
                  type="number"
                  name="GUIA_PTEMISION"
                  value={guiaData.GUIA_PTEMISION}
                  onChange={handleChangeGuia}
                  required
                />
              </div>
              <div>
                <input
                  className="form-control"
                  type="number"
                  name="GUIA_SECUENCIAL"
                  value={guiaData.GUIA_SECUENCIAL}
                  onChange={handleChangeGuia}
                  required
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* FORMAS DE PAGO */}
        <div className="form-floating mb-3">
          <select
            className="form-select"
            name="VEN_FPAGO"
            value={invoice.VEN_FPAGO}
            onChange={handleChange}
            required
          >
            {formasDePago.map((f) => (
              <option key={f.value} value={f.value}>
                {f.name}
              </option>
            ))}
          </select>
          <label>Forma de pago</label>
        </div>
      </div>
    </div>
  );
}
