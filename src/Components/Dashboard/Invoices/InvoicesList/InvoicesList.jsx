import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../../redux/actions";

import DataGrid from 'react-data-grid';

import 'react-data-grid/lib/styles.css';
import "./InvoicesList.css";

export default function InvoicesList() {

  const dispatch = useDispatch();
  const rows = useSelector((state) => state.products);
  const [filterRows, setFilters] = useState(null);
  const columns = [
    { key: "cost", name: "Valor"},
    { key: "amount", name: "Cantidad"},
    { key: "discount", name: "Descueto"},
    { key: "product", name: "Producto"},
    { key: "client", name: "Cliente"},
    { key: "date", name: "Fecha"}
  ]

  useEffect(()=>{
    if(rows.length <= 0)dispatch(getProducts());
  })

  function handleChange(e){
    const value = e.target.value;

    setFilters(rows.filter(row => {
      if(value === '') return true;
      if(row.bars.toLowerCase().includes(value.toLowerCase())) return true;
      return false;
    }));
  }

  return (
    <div className="invoicesList">
      <h3>Listado de Facturas</h3>
      <div className="invoicesList__searchBar">
        <input className="form-control" placeholder="Buscar factura" onChange={handleChange}/>
        <button className='btn btn-success'>Ver en PDF</button>
        <button className='btn btn-success'>Descargar en Excel</button>
      </div>
      <DataGrid columns={columns} rows={filterRows ? filterRows : rows}/>
    </div>
  );
}