import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClients } from "../../../../redux/actions";

import DataGrid from 'react-data-grid';

import 'react-data-grid/lib/styles.css';
import "./ClientList.css";
import { toast } from "react-toastify";

export default function ClientList() {

  const dispatch = useDispatch();
  const rows = useSelector((state) => state.clients);
  const userId = useSelector((state) => state.user.id);
  const [filterRows, setFilters] = useState(null);
  const columns = [
    { key: "name", name: "Nombre"},
    { key: "email", name: "Email"},
    { key: "address", name: "Direccion"},
    { key: "phone", name: "Telefono"}
  ]

  useEffect(()=>{
    if(rows.length <= 0){
      dispatch(getClients(userId))
      .catch(e => toast(e.message.split(':')[1]))
    }
  },[userId])

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
    <div className="clientList">
      <h3>Listado de clientes</h3>
      <div className="clientList__searchBar">
        <input className="form-control" placeholder="Buscar cliente" onChange={handleChange}/>
        <button className='btn btn-success'>Exportar</button>
      </div>
      <DataGrid columns={columns} rows={filterRows ? filterRows : rows}/>
    </div>
  );
}