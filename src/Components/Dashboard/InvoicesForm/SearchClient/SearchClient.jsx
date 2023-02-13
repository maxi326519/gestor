import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SearchClient.css";

export default function SearchClient({ handleSelect }) {
  const clients = useSelector((state) => state.clients);
  const [rows, setRows] = useState();

  useEffect(() => {
    setRows(clients);
  }, [clients]);

  function handleSearch(e) {
    const value = e.target.value;
    console.log(value);
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
        <label for="floatingInput">Buscar cliente</label>
      </div>
      <div className="client-name">
        {rows?.map((c) => (
          <div className="search-client-row" onClick={() => handleSelect(c)}>
            <span>{`${c.type}: ${c.dataType}`}</span>
            <span>{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
