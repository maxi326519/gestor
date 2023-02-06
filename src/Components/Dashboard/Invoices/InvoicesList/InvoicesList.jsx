import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import InvoiceCard from "./InvoiceCard/InvoiceCard";
import PDF from "./PDF/PDF";

import exportIcon from "../../../../assets/svg/export.svg";
import addSquare from "../../../../assets/svg/add-square.svg";

import "../../Dashboard.css";

export default function InvoicesList({
  handleAddInvoice,
  handleExportInvoice,
}) {
  const [invoicePDF, setPDF] = useState(null);
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices);
  const clients = useSelector((state) => state.clients);
  const userId = useSelector((state) => state.user.id);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(invoices);
  }, [invoices]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      invoices.filter((row) => {
        if (value === "") return true;
        /*         if (row.client.toLowerCase().includes(value.toLowerCase())) return true;
        return true; */
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
      {invoicePDF ? <PDF invoice={invoicePDF} handleClosePDF={handleClosePDF}></PDF> : null}
      <h3>Listado de Facturas</h3>
      <div className="dashboardList__searchBar">
        <input
          className="form-control"
          placeholder="Buscar factura"
          onChange={handleChange}
        />
        <button
          className="btn btn-primary invoicesList__export"
          onClick={handleAddInvoice}
        >
          <img src={addSquare} alt="export" />
          <span>Factura</span>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            console.log("asd");
            handleExportInvoice();
          }}
        >
          <img src={exportIcon} alt="export" />
          <span>Excel</span>
        </button>
      </div>
      <div className="dashboardList__grid">
        <div className="invoice-card first-row">
          <span>Fecha</span>
          <span>Nombre\Cliente</span>
          <span>Cant\Products</span>
          <span>Cant\Unitario</span>
          <span>total</span>
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