import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { logOut } from "../../../../redux/actions";

import clave2 from "../../../../functions/Clave";
import logout from "../../../../assets/svg/logout.svg";

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

export default function InvoiceData({
  invoice,
  handleChange,
  handleSetGuia,
  handleProfile,
}) {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDB);
  const [guia, setGuia] = useState(false);
  const [guiaData, setGuiaData] = useState({
    GUIA_ESTABLECIMIENTO: 1,
    GUIA_PTEMISION: 1,
    GUIA_SECUENCIAL: 1,
  });
  const [dateFormat, setFormat] = useState(invoice.VEN_FECHA);
  const [clave, setClave] = useState(0);

  useEffect(() => {
    const clave = clave2(
      user.EMP_RUC,
      invoice.VEN_FECHA.split("-").reverse().join("-"),
      `00000000${invoice.VEN_NUMERO}`.slice(-9),
      `00${invoice.VEN_ESTABLECIMIENTO}`.slice(-3),
      `00${invoice.VEN_PTOEMISION}`.slice(-3),
      Number(user.EMP_CODIGO)
    );
    setClave(clave);
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

    const date = e.target.value.split("-");
    const format = `${date[0]}-${("0" + date[1]).slice(-2)}-${(
      "0" + date[2]
    ).slice(-2)}`;

    if (newDate <= toDay) {
      setFormat(format);
      handleChange({
        ...e,
        target: {
          name: "VEN_FECHA",
          value: format,
        },
      });
    } else {
      swal("Error", "No se pueden agregar fechas futuras", "error");
    }
  }

  function handleLogOut() {
    swal({
      text: "¿Seguro que desea cerrar sesión?",
      icon: "warning",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(logOut())
          .then(() => {
            redirect("/login");
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    });
  }

  return (
    <div className="buscadores">
      <div className="perfil">
        <h2>Factura</h2>{" "}
        <button
          className="btn btn-primary btn-sesion"
          type="button"
          onClick={handleLogOut}
        >
          <img src={logout} alt="logout" />
        </button>
        <button type="button" onClick={handleProfile}>
          <img src={user.EMP_LOGO} alt="logo" />
        </button>
      </div>
      <span className="invoice-clave">{clave}</span>
      <div className="invoice-data">
        {/* DATE */}
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            name="VEN_FECHA"
            max={new Date().toISOString().split("T")[0]}
            value={invoice.VEN_FECHA}
            onChange={dateValidation}
            required
          />
          <label htmlFor="floatingInput">Fecha de emisión</label>
        </div>

        {/* NUMERO DE LA FACTURA*/}
        <div className="invoice-number">
          <label htmlFor="floatingInput">Numero de Factura</label>
          {user ? (
            <span>{`
            ${`00${invoice.VEN_ESTABLECIMIENTO}`.slice(-3)} - 
            ${`00${invoice.VEN_PTOEMISION}`.slice(-3)} - 
            ${`000000000${invoice.VEN_NUMERO}`.slice(-9)}`}</span>
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
