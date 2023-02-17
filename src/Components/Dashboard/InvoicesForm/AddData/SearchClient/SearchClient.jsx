import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SearchClient.css";

export default function SearchClient({ handleAddClient }) {
  const clients = useSelector((state) => state.clients);
  const [rows, setRows] = useState();

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
        {rows?.map((c) => (
          <div key={c.id} className="search-client-row" onClick={() => handleAddClient(c)}>
            <span>{`${c.CLI_TIPOIDE}: ${c.CLI_IDENTIFICACION}`}</span>
            <span>{c.CLI_NOMBRE}</span>
          </div>
        ))}
      </div>
    </div>
  );
}