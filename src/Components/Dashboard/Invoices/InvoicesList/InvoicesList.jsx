import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usePDF } from "../../PDF/usePDF";
import {
  closeLoading,
  openLoading,
  updateInvoice,
  getInvoices,
  logOut,
} from "../../../../redux/actions";
import swal from "sweetalert";

import InvoiceCard from "./InvoiceCard/InvoiceCard";
import Excel from "../Excel/Excel";

import addSquare from "../../../../assets/svg/add-square.svg";
import logout from "../../../../assets/svg/logout.svg";

import "../../Dashboard.css";
import "./InvoicesList.css";

export default function InvoicesList({ handleProfile }) {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const pdf = usePDF();
  const invoices = useSelector((state) => state.invoices);
  const user = useSelector((state) => state.user.userDB);
  const [rows, setRows] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [isChecked, setCheck] = useState([]);
  const [checkAll, setAll] = useState(false);
  const [years, setYears] = useState([]);
  const [days, setDays] = useState([]);
  const [consolidado, setConsolidado] = useState(false);
  const [filter, setFilter] = useState({
    year: new Date().toLocaleDateString().split("/")[2],
    month: `0${new Date().toLocaleDateString().split("/")[1]}`.slice(-2),
    day: "00",
  });

  useEffect(() => {
    setRows(invoices);
    let years = [];
    let date = new Date().toLocaleDateString().split("/");
    let toYear = Number(date[2]);
    let toMonth = date[1];
    var days = new Date(toYear, toMonth, 0).getDate();
    let dayArr = [];

    for (let i = 10; i >= 0; i--) {
      years.push(toYear);
      toYear--;
    }

    for (let i = 1; i <= days; i++) {
      dayArr.push(i);
    }

    setYears(years);
    setDays(dayArr);
  }, [invoices]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      invoices.filter((row) => {
        if (row.CLI_NOMBRE.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.CLI_IDENTIFICACION === value) return true;
        if (row.VEN_NUMERO === value) return true;
        return false;
      })
    );
  }

  function handleCheckAll() {
    if (checkAll) {
      setCheck([]);
      setAll(false);
    } else {
      setCheck(
        rows
          .filter((i) => i.VEN_ESTADO === 1)
          .map((i) => {
            return i.VEN_CODIGO;
          })
      );
      setAll(true);
    }
  }

  function handleAuth() {
    if (isChecked.length > 0) {
      swal({
        text: `¿Seguro que quiere autorizar ${isChecked.length} facturas?`,
        icon: "info",
        buttons: { confirm: true, cancel: true },
      })
        .then(async (r) => {
          if (r) {
            dispatch(openLoading());
            for (let i = 0; i < isChecked.length; i++) {
              const invoiceAuth = rows.find(
                (invoice) => invoice.VEN_CODIGO === isChecked[i]
              );

              await dispatch(
                updateInvoice(isChecked[i], {
                  ...invoiceAuth,
                  VEN_ESTADO: 3,
                })
              );
            }

            dispatch(closeLoading());
            setAll(false);
            setCheck([]);
            handleCheck();
          }
        })
        .catch((e) => {
          dispatch(closeLoading());
          swal(
            "Error",
            `Hubo un error al intentar autorizar una factura, intentelo mas tarde`,
            "error"
          );
          console.log(e);
        });
    } else {
      handleCheck();
    }
  }

  function handleCheck() {
    setDisabled(!disabled);
  }

  function handleFilterDate() {
    let { year, month, day } = filter;

    if (day === "00") day = null;
    if (month === "00") month = null;

    dispatch(openLoading());
    dispatch(getInvoices(year, month, day))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch((e) => {
        dispatch(closeLoading());
        console.log(e);
        swal(
          "Error",
          `Surgio un error al intentar traer las facturas`,
          "error"
        );
      });
  }

  function handleChangeFilter(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value });
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
    <div className="dashboardList">
      <div className="perfil">
        <h3>Listado de Facturas</h3>
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
      <div className="dashboardList__searchBar">
        <input
          className="form-control"
          placeholder="Buscar factura"
          onChange={handleChange}
        />
        <div className="controls">
          <Link
            to="/dashboard/invoices/add"
            className="btn btn-primary invoicesList__export"
          >
            <img src={addSquare} alt="export" />
            <span>Factura</span>
          </Link>
          <Excel invoices={rows} />
          <button
            className={`btn btn-${disabled ? "primary" : "success"}`}
            onClick={disabled ? handleCheck : handleAuth}
          >
            Autorizar
          </button>
        </div>
        <div className="dateFilter">
          <div className="form-floating mb-3 date">
            <select
              className="form-select"
              name="year"
              value={filter.year}
              onChange={handleChangeFilter}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <label htmlFor="floatingInput">Año</label>
          </div>
          <div className="form-floating mb-3 date">
            <select
              className="form-select"
              name="month"
              value={filter.month}
              onChange={handleChangeFilter}
            >
              <option value="00">Todos</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            <label htmlFor="floatingInput">Mes</label>
          </div>
          <div className="form-floating mb-3 date">
            <select
              className="form-select"
              name="day"
              value={filter.day}
              onChange={handleChangeFilter}
            >
              <option value="00">Todos</option>
              {days.map((day) => (
                <option key={day} value={`0${day}`.slice(-2)}>
                  {`0${day}`.slice(-2)}
                </option>
              ))}
            </select>
            <label htmlFor="floatingInput">Dia</label>
          </div>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleFilterDate}
          >
            Aplicar
          </button>
        </div>
      </div>
      <div className="consolidado">
        <span className="limit">{`${user.EMP_SECUENCIAL} de 100 facturas`}</span>
        <input
          id="consolidado"
          type="checkbox"
          checked={consolidado}
          onChange={() => setConsolidado(!consolidado)}
        />
        <label htmlFor="consolidado">Consolidado</label>
      </div>
      <div className="dashboardList__grid">
        <div className="invoice-card first-row">
          <input
            type="checkbox"
            name="checkAll"
            checked={checkAll}
            onChange={handleCheckAll}
            disabled={disabled}
          />
          <span>Fecha</span>
          <span>Nro</span>
          <span>Ruc / Cedula / Pasaporte</span>
          <span>Nombre cliente</span>
          <span>Descueto %</span>
          <span>Subtotal</span>
          <span>Subtotal 0%</span>
          <span>Subtotal IVA</span>
          <span>IVA</span>
          <span>Total</span>
          <span>Estado</span>
          <span>PDF</span>
          <span>Anular</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay Facturas</span>
            </div>
          ) : (
            rows?.map((invoice, i) => (
              <InvoiceCard
                key={invoice.VEN_CODIGO}
                invoice={invoice}
                viewPDF={() => pdf.openInvoicePDF(invoice)}
                disabled={disabled}
                isChecked={isChecked}
                setCheck={setCheck}
                setAll={setAll}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
