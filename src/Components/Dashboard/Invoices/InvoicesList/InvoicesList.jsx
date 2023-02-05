import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPDF from '@react-pdf/renderer';

import InvoiceCard from "./InvoiceCard/InvoiceCard";
import PDF from "./PDF/PDF";

import exportIcon from '../../../../assets/svg/export.svg';
import addSquare from '../../../../assets/svg/add-square.svg';

import "./InvoicesList.css";

export default function InvoicesList({ handleAddInvoice, handleExportInvoice }) {
  
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices);
  const userId = useSelector((state) => state.user.id);
  const [rows, setRows] = useState([]);

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
  
  return (
    <div className="dashboardList">
      { invoices.length > 0 ? <PDF invoice={invoices[0]}></PDF> : null}
      <h3>Listado de Facturas</h3>
      <div className="dashboardList__searchBar">
        <input className="form-control" placeholder="Buscar factura" onChange={handleChange}/>
        <button className='btn btn-primary invoicesList__export' onClick={handleAddInvoice}>
          <img src={addSquare} alt='export'/>
          <span>Factura</span>
        </button>
        <button className='btn btn-primary' onClick={()=>{console.log('asd');handleExportInvoice();}}>
          <img src={exportIcon} alt='export'/>
          <span>Excel</span>
        </button>
      </div>
      <div className="dashboardList__contentCard">
        <div className="product-card first-row">
          <span>Codigo</span>
          <span>Codigo</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty"><span>No hay Factura</span></div>
          ) : (
            rows?.map((p) => <InvoiceCard product={p} />)
          )}
        </div>
        </div>
    </div>
  );
}