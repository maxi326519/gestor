import React from "react";
import { useSelector } from "react-redux";
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import "./UserList.css";

export default function UserList() {
  const rows = useSelector((state) => state.users.data);
  const columns = [
    { key: "name", name: "Nombre"},
    { key: "userName", name: "Usuario"},
    { key: "email", name: "Email"},
    { key: "adress", name: "Direccion"},
    { key: "phone", name: "Telefono"},
  ]

  return (
    <div className="userList">
      <h3>Listado de Usuarios</h3>
      <DataGrid columns={columns} rows={rows}/>
    </div>
  );
}