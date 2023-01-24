import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../../redux/actions";

import DataGrid from 'react-data-grid';

import 'react-data-grid/lib/styles.css';
import "./ProductList.css";

export default function ProductList() {

  const dispatch = useDispatch();
  const rows = useSelector((state) => state.products.data);
  const [filterRows, setFilters] = useState(null);
  const columns = [
    { key: "bars", name: "Barras"},
    { key: "code", name: "Codigo"},
    { key: "state", name: "Estado"},
    { key: "ice", name: "ice"},
    { key: "taxes", name: "Impuesto"},
    { key: "pvp", name: "PVP"},
    { key: "type", name: "tipo"},
    { key: "locCode", name: "Loc Codigo"},
    { key: "amount", name: "Cantidad"},
    { key: "description", name: "description"}
  ]

  useEffect(()=>{
    if(rows.length <= 0)dispatch(getProducts());
  })

  function handleChange(e){
    const value = e.target.value;

    setFilters(rows.filter(row => {
      if(value === '') return true;
      if(row.bars.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.code.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.state.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.ice.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.taxes.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.pvp.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.type.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.locCode.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.amount.toLowerCase().includes(value.toLowerCase())) return true;
      return false;
    }));
  }

  return (
    <div className="userList">
      <h3>Listado de Productos</h3>
      <div className="userList__searchBar">
        <input className="form-control" onChange={handleChange}/>
      </div>
      <DataGrid columns={columns} rows={filterRows ? filterRows : rows}/>
    </div>
  );
}