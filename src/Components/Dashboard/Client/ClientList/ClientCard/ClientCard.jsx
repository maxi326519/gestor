import { useState } from "react";

import edit from "../../../../../assets/svg/edit.svg";
import removeIcon from "../../../../../assets/svg/remove.svg";
import save from "../../../../../assets/svg/save.svg";
import "./ClientCard.css";

export default function ClientCard({ client }) {
  const [disabled, setDisabled] = useState(true);
  const [remove, setRemove] = useState(true);

  function handleEdit() {
    setDisabled(!disabled);
  }

  function handleRemove() {
    setRemove(!remove);
  }

  return (
    <div key={client.id} className="client-card">
      {console.log(client)}
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={client.name}
      />
      <div className="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">{client.type}</span>
        <input
          className={`form-control ${disabled ? "input-disabled" : ""}`}
          disabled={disabled}
          value={client.dataType}
        />
      </div>
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={client.email}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={client.address}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        value={client.phone}
      />
      <button
        className={`btn ${disabled ? "btn-primary" : "btn-success"}`}
        onClick={handleEdit}
      >
        <img src={disabled ? edit : save} alt="edit" />
      </button>
      <button
        className={`btn ${remove ? "btn-danger" : "btn-secondary"}`}
        onClick={handleRemove}
      >
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
