import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import square from "../../../../assets/svg/add-square.svg";
import "./AddClient.css";

export default function AddClient({
  handleFormClient,
  handleClient,
  handleAddClient,
}) {
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
          if (row.CLI_DIRECCION.toLowerCase().includes(value.toLowerCase()))
            if (row.CLI_TELEFONO.toLowerCase().includes(value.toLowerCase()))
              return true;
        return false;
      })
    );
  }

  return (
    <div className="form__container">
      <div className="form">
        <div className="form__close">
          <h4>Agregar Cliente</h4>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleFormClient}
          ></button>
        </div>
        <div className="Search-product">
          <input
            className="form-control"
            placeholder="Buscar un cliente..."
            onChange={handleChange}
          />
          <button
            className="btn btn-primary add"
            onClick={() => {
              handleAddClient();
              handleFormClient();
            }}
          >
            <img src={square} alt="add client" />
            Crear
          </button>
        </div>
        <div className="product-list">
          <div className="invoice-product-card">
            <span>Identificacion</span>
            <span>Nombre</span>
            <span>Email</span>
            <span>Direccion</span>
            <span>Telefono</span>
            <span>Agregar</span>
          </div>
          {rows?.map((c, i) => (
            <div key={i} className="invoice-product-card">
              <span>{`${c.CLI_TIPOIDE}: ${c.CLI_IDENTIFICACION}`}</span>
              <span>{c.CLI_NOMBRE}</span>
              <span>{c.CLI_EMAIL}</span>
              <span>{c.CLI_DIRECCION}</span>
              <span>{c.CLI_TELEFONO}</span>
              <span className="btn btn-primary" onClick={() => handleClient(c)}>
                +
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
