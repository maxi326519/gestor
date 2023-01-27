import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../../redux/actions";
import { toast } from "react-toastify";

import DataGrid from 'react-data-grid';

import 'react-data-grid/lib/styles.css';
import "./ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.products);
  const userId = useSelector((state) => state.user.id);
  const [filterRows, setFilters] = useState(null);
  const columns = [
    { key: "name", name: "Nombre"},
    { key: "price", name: "Precio"},
    { key: "taxes", name: "Impuesto"},
    { key: "type", name: "tipo"},
    { key: "code", name: "Codigo"},
    { key: "stock", name: "Stock"},
    { key: "state", name: "Estado"},
    { key: "description", name: "description"}
  ]

  useEffect(()=>{
    if(rows.length <= 0){
      dispatch(getProducts(userId))
      .catch(e => toast(e.message.split(':')[1]))
    }
  },[userId])

  function handleChange(e){
    const value = e.target.value;

    setFilters(rows.filter(row => {
      if(value === '') return true;
      if(row.name.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.code.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.taxes.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.type.toLowerCase().includes(value.toLowerCase())) return true;
      return false;
    }));
  }

  return (
    <div className="userList">
      <h3>Listado de Productos</h3>
      <div className="userList__searchBar">
        <input className="form-control" placeholder="Buscar producto" onChange={handleChange}/>
      </div>
      <DataGrid columns={columns} rows={filterRows ? filterRows : rows}/>
    </div>
  );
}