import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteClient,
  openLoading,
  closeLoading,
  updateClient,
  Alert,
} from "../../.././../../redux/actions";

import edit from "../../../../../assets/svg/edit.svg";
import removeIcon from "../../../../../assets/svg/remove.svg";
import save from "../../../../../assets/svg/save.svg";

import "./ClientCard.css";

export default function ClientCard({ client }) {
  const dispatch = useDispatch();
  const [editClient, setProduct] = useState(client);
  const [disabled, setDisabled] = useState(true);

  function handleEdit() {
    setDisabled(!disabled);
  }

  function handleChange(e) {
    console.log(editClient);
    setProduct({ ...editClient, [e.target.name]: e.target.value });
  }

  function handleRemove() {
    dispatch(openLoading());
    dispatch(deleteClient(client.id))
      .then(() => {
        dispatch(closeLoading());
        toast.success("¡Cliente eliminado exitosamente!");
      })
      .catch((e) => {
        toast.error("Error al eliminar el cliente");
        console.log(e);
      });
  }

  function handleUpdate() {
    dispatch(openLoading());
    dispatch(updateClient(client.id, editClient))
      .then(() => {
        dispatch(closeLoading());
        toast.success("¡Cliente actualizado exitosamente!");
        setDisabled(true);
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error("Error al actualizar el cliente");
        console.log(e);
      });
  }

  return (
    <div key={client.id} className="client-card">
      <div className="input-group mb-3">
        <select
          className="form-control"
          name="CLI_TIPOIDE"
          value={editClient.CLI_TIPOIDE}
          onChange={handleChange}
          disabled={true}
          required
        >
          <option value="04">Ruc</option>
          <option value="05">Cedula</option>
          <option value="06">Pasaporte</option>
        </select>
        <input
          className={`form-control ${disabled ? "input-disabled" : ""}`}
          name="CLI_IDENTIFICACION"
          value={editClient.CLI_IDENTIFICACION}
          onChange={handleChange}
          disabled={true}
          required
        />
      </div>
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="CLI_NOMBRE"
        value={editClient.CLI_NOMBRE}
        onChange={handleChange}
        disabled={disabled}
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="CLI_EMAIL"
        value={editClient.CLI_EMAIL}
        onChange={handleChange}
        disabled={disabled}
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="CLI_DIRECCION"
        value={editClient.CLI_DIRECCION}
        onChange={handleChange}
        disabled={disabled}
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="CLI_TELEFONO"
        value={editClient.CLI_TELEFONO}
        onChange={handleChange}
        disabled={disabled}
        required
      />
      <div className="edit-buttons">
        <button
          className={`btn ${disabled ? "btn-primary" : "btn-success"}`}
          onClick={
            disabled
              ? handleEdit
              : () => {
                  dispatch(
                    Alert(
                      "¿Seguro que desea guardar los cambios?",
                      handleUpdate
                    )
                  );
                }
          }
        >
          <img src={disabled ? edit : save} alt="edit" />
        </button>
        {disabled ? null : <button className="btn btn-danger" onClick={handleEdit}>x</button>}
      </div>
      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(
            Alert(`¿Seguro que quiere eliminar este cliente?`, handleRemove)
          );
        }}
      >
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
