import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import exportIcon from '../../../../assets/svg/export.svg';
import addSquare from '../../../../assets/svg/add-square.svg';

import "./InvoicesList.css";

export default function InvoicesList({ handleAddInvoice, handleExportInvoice }) {
/* 
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.products); */

  function handleChange(e){
/*     const value = e.target.value; */
  }

  return (
    <div className="dashboardList">
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
        <div>
          <span>Codigo</span>
          <span>Codigo</span>
        </div>
        {

        }
      </div>
    </div>
  );
}