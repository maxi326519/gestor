import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import InvoiceCard from "./InvoiceCard/InvoiceCard";
import PDF from "../../PDF/PDF";

import exportIcon from "../../../../assets/svg/export.svg";
import addSquare from "../../../../assets/svg/add-square.svg";

import "../../Dashboard.css";
import "./InvoicesList.css";

export default function InvoicesList({
  handleAddInvoice,
  handleExportInvoice,
}) {
  const [invoicePDF, setPDF] = useState(null);
  const invoices = useSelector((state) => state.invoices);
  const user = useSelector((state) => state.user.userDB);
  const [rows, setRows] = useState([]);
  const [dateFilter, setFilter] = useState({
    from: "",
    to: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [isCheked, setCheck] = useState([]);

  useEffect(() => {
    setRows(invoices);
    setCheck(invoices.map(() => {return{name: invoices.id, check: false }}));
  }, [invoices]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      invoices.filter((row) => {
        if (row.CLI_NOMBRE.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.CLI_IDENTIFICACION.toLowerCase().includes(value.toLowerCase()))
          if (
            new Date(row.VEN_FECHA) >= new Date(dateFilter.from) &&
            new Date(row.VEN_FECHA) <= new Date(dateFilter.to)
          )
            return true;
        return false;
      })
    );
  }

  function handleFilterDate(e) {
    const newDate = { ...dateFilter, [e.target.name]: e.target.value };

    setFilter(newDate);

    if (!(newDate.from === "") && !(newDate.to === "")) {
      setRows(
        invoices.filter((row) => {
          const rowDate = row.VEN_FECHA.split("-").reverse().join("-");
          if (
            new Date(rowDate) >= new Date(newDate.from) &&
            new Date(rowDate) <= new Date(newDate.to)
          ) {
            return true;
          }
          return false;
        })
      );
    }
  }

  function handleCheck() {
    setDisabled(!disabled);
  }

  function handleViewPDF(i) {
    setPDF(i);
  }

  function handleClosePDF(i) {
    setPDF(null);
  }

  return (
    <div className="dashboardList">
      {invoicePDF ? (
        <PDF invoice={invoicePDF} handleClosePDF={handleClosePDF}></PDF>
      ) : null}
      <h3>Listado de Facturas</h3>
      <div className="dashboardList__searchBar">
        <input
          className="form-control"
          placeholder="Buscar factura"
          onChange={handleChange}
        />
        <Link
          to="/dashboard/invoices/add"
          className="btn btn-primary invoicesList__export"
        >
          <img src={addSquare} alt="export" />
          <span>Factura</span>
        </Link>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleExportInvoice();
          }}
        >
          <img src={exportIcon} alt="export" />
          <span>Excel</span>
        </button>
        <button className="btn btn-primary" onClick={handleCheck}>
          Estado
        </button>
        <div className="form-floating mb-3 date">
          <input
            className="form-control"
            type="date"
            name="from"
            onChange={handleFilterDate}
          />
          <label htmlFor="floatingInput">Desde</label>
        </div>
        <div className="form-floating mb-3 date">
          <input
            className="form-control"
            type="date"
            name="to"
            onChange={handleFilterDate}
          />
          <label htmlFor="floatingInput">Hasta</label>
        </div>
      </div>
      <span className="limit">{`${user.EMP_SECUENCIAL} de 100 facturas`}</span>
      <div className="dashboardList__grid">
        <div className="invoice-card first-row">
          <span></span>
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
          <span>Ver en PDF</span>
          <span>Anular</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay Facturas</span>
            </div>
          ) : (
            rows?.map((i) => (
              <InvoiceCard
                key={i.id}
                invoice={i}
                viewPDF={() => {
                  handleViewPDF(i);
                }}
                disabled={disabled}
                isCheked={isCheked}
                setCheck={setCheck}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
