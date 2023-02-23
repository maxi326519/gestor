import { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

import {
  deleteClient,
  openLoading,
  closeLoading,
  updateClient,
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
    swal({
      title: "¡Atencion!",
      text: "¿Seguro que quiere eliminar el cliente?",
      icon: "warning",
      buttons: {
        eliminar: true,
        cancel: true,
      },
    }).then((r) => {
      if (r) {
        dispatch(openLoading());
        dispatch(deleteClient(client.id))
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Eliminado",
              "Se elimino el cliente con exito",
              "success"
            );
          })
          .catch((e) => {
            swal(
              "Error",
              "Surgio un error desconocido al eliminar el cliente",
              "error"
            );
            console.log(e);
          });
      }
    });
  }

  function handleUpdate() {
    swal({
      text: "¿Seguro quiere guardar los datos del cliente?",
      buttons: {
        guardar: true,
        cancel: true,
      },
    }).then((r) => {
      if (r) {
        dispatch(openLoading());
        dispatch(updateClient(client.id, editClient))
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Actualizado",
              "Se actualizaron los datos del cliente con exito",
              "success"
            );
            setDisabled(true);
          })
          .catch((e) => {
            dispatch(closeLoading());
            swal(
              "Error",
              "Surgio un error desconocido al actualizar el cliente",
              "error"
            );
            console.log(e);
          });
      }
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
          onClick={disabled ? handleEdit : handleUpdate}
        >
          <img src={disabled ? edit : save} alt="edit" />
        </button>
        {disabled ? null : (
          <button className="btn btn-danger" onClick={handleEdit}>
            x
          </button>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleRemove}>
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
