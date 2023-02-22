import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SearchClient.css";

export default function SearchClient({ handleClient, handleFormClient }) {
  const clients = useSelector((state) => state.clients);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(clients);
  }, [clients]);

  function handleSearch(e) {
    const value = e.target.value;
    setRows(
      clients.filter((c) => {
        if (c.dataType.toLowerCase().includes(value.toLowerCase())) return true;
        return false;
      })
    );
  }

  return (
    <div className="search-container">
      <div className="form-floating mb-3">
        <input
          type="search"
          className="form-control"
          name="newClient"
          onChange={handleSearch}
        />
        <label htmlFor="floatingInput">Buscar cliente</label>
      </div>
      <div className="client-name">
        <div className="head search-client-row">
              <span>Id</span>
              <span>Nombre</span>
              <span>Email</span>
              <span>Direccion</span>
        </div>
        <div className="list">
          {rows.length > 0 ? rows?.map((c) => (
            <div
              key={c.id}
              className="search-client-row"
              onClick={() => handleClient(c)}
            >
              <span>{`${c.CLI_TIPOIDE}: ${c.CLI_IDENTIFICACION}`}</span>
              <span>{c.CLI_NOMBRE}</span>
              <span>{c.CLI_EMAIL}</span>
              <span>{c.CLI_DIRECCION}</span>
            </div>
          )):
          <div>
              <span>¿No encuentra al cliente?</span>
            <button className="btn btn-primary"onClick={handleFormClient}>Agregar cliente</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
