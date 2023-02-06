import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const userId = useSelector((state) => state.user.uid);
  const [editClient, setProduct] = useState(client);
  const [disabled, setDisabled] = useState(true);

  function handleEdit() {
    setDisabled(!disabled);
  }

  function handleChange(e) {
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
    setProduct({ ...editClient, [e.target.name]: e.target.value });
  }

  function handleRemove() {
    dispatch(openLoading());
    dispatch(deleteClient(userId, client.id))
      .then(() => {
        dispatch(closeLoading());
        toast("¡Cliente eliminado exitosamente!");
      })
      .catch((e) => {
        toast("Error al eliminar el cliente");
        console.log(e);
      });
  }

  function handleUpdate() {
    dispatch(openLoading());
    dispatch(updateClient(userId, client.id, editClient))
      .then(() => {
        dispatch(closeLoading());
        toast("¡Cliente actualizado exitosamente!");
        setDisabled(true);
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast("Error al actualizar el cliente");
        console.log(e);
      });
  }

  return (
    <div key={client.id} className="client-card">
      {console.log(client)}
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="name"
        disabled={disabled}
        value={editClient.name}
        onChange={handleChange}
      />
      <div className="input-group mb-3">
        <select
          class="input-group-text"
          name="type"
          value={editClient.type}
          disabled={disabled}
          onChange={handleChange}
        >
          <option value="Ruc">Ruc</option>
          <option value="Cedula">Cedula</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>
        <input
          className={`form-control ${disabled ? "input-disabled" : ""}`}
          name="dataType"
          disabled={disabled}
          value={editClient.dataType}
          onChange={handleChange}
        />
      </div>
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="email"
        disabled={disabled}
        value={editClient.email}
        onChange={handleChange}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="address"
        disabled={disabled}
        value={editClient.address}
        onChange={handleChange}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="phone"
        disabled={disabled}
        value={editClient.phone}
        onChange={handleChange}
      />
      <button
        className={`btn ${disabled ? "btn-primary" : "btn-success"}`}
        onClick={
          disabled
            ? handleEdit
            : () => {
                dispatch(
                  Alert("¿Seguro que desea guardar los cambios?", handleUpdate)
                );
              }
        }
      >
        <img src={disabled ? edit : save} alt="edit" />
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(
            Alert(
              `Si elimina un cliente tenga en cuanta que ciertos detalles de las facturas se eliminaran tambien`,
              handleRemove
            )
          );
        }}
      >
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
