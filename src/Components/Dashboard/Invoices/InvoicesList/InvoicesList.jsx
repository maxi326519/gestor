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

  useEffect(() => {
    setRows(invoices);
  }, [invoices]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      invoices.filter((row) => {
        if (row.CLI_NOMBRE.toLowerCase().includes(value.toLowerCase()))
        return true;
        if (row.CLI_IDENTIFICACION.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false;
      })
    );
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
      </div>
      <span className="limit">{`${user.EMP_SECUENCIAL} de 100 facturas`}</span>
      <div className="dashboardList__grid">
        <div className="invoice-card first-row">
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
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
