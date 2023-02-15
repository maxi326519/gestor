import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ClientCard from "./ClientCard/ClientCard";

import addSquare from "../../../../assets/svg/add-square.svg";
import "./ClientList.css";

export default function ClientList({ handleAddClient }) {
  const clients = useSelector((state) => state.clients);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(clients);
  }, [clients]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      clients.filter((row) => {
        if (value === "") return true;
        if (row.CLI_IDENTIFICACION.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.CLI_NOMBRE.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.CLI_EMAIL.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.CLI_DIRECCION.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.CLI_TELEFONO.toLowerCase().includes(value.toLowerCase()))
          return true;
        return false;
      })
    );
  }

  return (
    <div className="dashboardList">
      <h3>Listado de clientes</h3>
      <div className="dashboardList__searchBar">
        <input
          className="form-control"
          placeholder="Buscar cliente"
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={handleAddClient}>
          <img src={addSquare} alt="export" />
          <span>Cliente</span>
        </button>
      </div>
      <div className="dashboardList__grid">
        <div className="client-card first-row">
          <span>Tipo</span>
          <span>Nombre</span>
          <span>Email</span>
          <span>Direccion</span>
          <span>Telefono</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay productos</span>
            </div>
          ) : (
            rows?.map((c) => <ClientCard key={c.id} client={c} />)
          )}
        </div>
      </div>
    </div>
  );
}
