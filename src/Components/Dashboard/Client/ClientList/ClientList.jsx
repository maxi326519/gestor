import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClients } from "../../../../redux/actions";

import DataGrid from 'react-data-grid';

import 'react-data-grid/lib/styles.css';
import "./ClientList.css";

export default function ClientList() {

  const dispatch = useDispatch();
  const rows = useSelector((state) => state.clients.data);
  const [filterRows, setFilters] = useState(null);
  const columns = [
    { key: "name", name: "Nombre"},
    { key: "userName", name: "Usuario"},
    { key: "email", name: "Email"},
    { key: "address", name: "Direccion"},
    { key: "phone", name: "Telefono"},
  ]

  useEffect(()=>{
    if(rows.length <= 0)dispatch(getClients());
  })

  function handleChange(e){
    const value = e.target.value;

    setFilters(rows.filter(row => {
      if(value === '') return true;
      if(row.name.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.email.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.address.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.phone.toLowerCase().includes(value.toLowerCase())) return true;
      return false;
    }));
  }

  return (
    <div className="userList">
      <h3>Listado de clientes</h3>
      <div className="userList__searchBar">
        <input className="form-control" onChange={handleChange}/>
      </div>
      <DataGrid columns={columns} rows={filterRows ? filterRows : rows}/>
    </div>
  );
}