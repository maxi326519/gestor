import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import ClientCard from "./ClientCard/ClientCard";

import addSquare from "../../../../assets/svg/add-square.svg";
import logout from "../../../../assets/svg/logout.svg";
import "./ClientList.css";
import { logOut } from "../../../../redux/actions";

export default function ClientList({ handleAddClient, handleProfile }) {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDB);
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

  function handleLogOut() {
    swal({
      text: "¿Seguro que desea cerrar sesión?",
      icon: "warning",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(logOut())
          .then(() => {
            redirect("/login");
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    });
  }

  return (
    <div className="dashboardList">
      <div className="perfil">
        <h3>Listado de clientes</h3>
        <button
          className="btn btn-primary btn-sesion"
          type="button"
          onClick={handleLogOut}
        >
          <img src={logout} alt="logout" />
        </button>
        <button type="button" onClick={handleProfile}>
          <img src={user.EMP_LOGO} alt="logo" />
        </button>
      </div>
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
              <span>No hay clientes</span>
            </div>
          ) : (
            rows?.map((c) => <ClientCard key={c.CLI_CODIGO} client={c} />)
          )}
        </div>
      </div>
    </div>
  );
}
