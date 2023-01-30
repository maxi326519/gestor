import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClients } from "../../../../redux/actions";
import { toast } from "react-toastify";

import ClientCard from "./ClientCard/ClientCard";

import addSquare from "../../../../assets/svg/add-square.svg";
import "./ClientList.css";

export default function ClientList({ handleAddClient }) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const userId = useSelector((state) => state.user.id);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (clients.length <= 0) {
      dispatch(getClients(userId)).catch((e) => toast(e.message.split(":")[1]));
    }
  }, [userId]);

  useEffect(() => {
    setRows(clients);
  }, [clients]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      clients.filter((row) => {
        if (value === "") return true;
        if (row.name.toLowerCase().includes(value.toLowerCase())) return true;
        if (row.dataType.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.email.toLowerCase().includes(value.toLowerCase())) return true;
        if (row.address.toLowerCase().includes(value.toLowerCase()))
          return true;
        if (row.phone.toLowerCase().includes(value.toLowerCase())) return true;
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
          <span>Nombre</span>
          <span>Tipo</span>
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
            rows?.map((c) => <ClientCard client={c} />)
          )}
        </div>
      </div>
    </div>
  );
}
