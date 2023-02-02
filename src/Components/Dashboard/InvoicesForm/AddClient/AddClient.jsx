import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import add from "../../../../assets/svg/add-square.svg";
import "./AddClient.css";

export default function AddClient({ handleFormClient, handleSelect }) {
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
        if (row.name.toLowerCase().includes(value.toLowerCase())) return true;
        if (row.dataType.toLowerCase().includes(value.toLowerCase())) return true;
        return false;
      })
    );
  }

  return (
    <div className="form__container">
      <form className="form">
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
          <input className="form-control" placeholder="Buscar un cliente..." onChange={handleChange}/>
        </div>
        <div className="product-list">
          <div className="invoice-product-card">
            <span>Ruc/Cedula/Pasaporte</span>
            <span>Nombre</span>
            <span>Agregar</span>
          </div>
          {rows?.map((c) => (
            <div className="invoice-product-card">
              <span>{`${c.type}: ${c.dataType}`}</span>
              <span>{c.name}</span>
              <span className="btn btn-primary"onClick={() => handleSelect(c)}>
                +
              </span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
