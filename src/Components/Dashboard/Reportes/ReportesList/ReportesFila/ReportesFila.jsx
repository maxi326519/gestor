import { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

import {
  deleteProduct,
  updateProduct,
  openLoading,
  closeLoading,
} from "../../.././../../redux/actions";

import edit from "../../../../../assets/svg/edit.svg";
import removeIcon from "../../../../../assets/svg/remove.svg";
import save from "../../../../../assets/svg/save.svg";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [editProduct, setProduct] = useState(product);
  const [disabled, setDisabled] = useState(true);
  const type = [
    { value: 1, name: "Producto" },
    { value: 2, name: "Servicio" },
  ];

  function handleEdit() {
    setDisabled(!disabled);
  }

  function handleChange(e) {
    setProduct({ ...editProduct, [e.target.name]: e.target.value });
  }

  function handleRemove() {
    swal({
      title: "¡Atencion!",
      text: "¿Seguro que quiere eliminar el producto?",
      icon: "warning",
      buttons: {
        eliminar: true,
        cancel: true,
      },
    }).then((r) => {
      if (r) {
        dispatch(openLoading());
        dispatch(deleteProduct(product.ITE_CODIGO))
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Eliminado",
              "Su producto se elimino correctamente",
              "success"
            );
          })
          .catch((e) => {
            dispatch(closeLoading());
            swal(
              "Error",
              "Surgio un error desconocido al eliminar el producto",
              "error"
            );
            console.log(e.message);
          });
      }
    });
  }

  function handleUpdate() {
    swal({
      text: "¿Seguro quiere guardar los datos del producto?",
      buttons: {
        guardar: true,
        cancel: true,
      },
    }).then((r) => {
      if (r) {
        dispatch(openLoading());
        dispatch(updateProduct(editProduct))
          .then(() => {
            dispatch(closeLoading());
            swal(
              "Actualizado",
              "Se actualizaron los datos del producto con exito",
              "success"
            );
            setDisabled(true);
          })
          .catch((e) => {
            dispatch(closeLoading());
            swal(
              "Error",
              "Surgio un error desconocido al actualizar el producto",
              "error"
            );
            console.log(e.message);
          });
      }
    });
  }

  return (
    <div key={product.code} className="product-card">
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        value={editProduct.ITE_CODIGO}
        onChange={handleChange}
        disabled={true}
        required
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="ITE_DESCRIPCION"
        value={editProduct.ITE_DESCRIPCION}
        onChange={handleChange}
        disabled={disabled}
        required
      />
      <select
        className={disabled ? "form-control input-disabled " : "form-select"}
        name="ITE_TIPO"
        value={editProduct.ITE_TIPO}
        onChange={handleChange}
        disabled={disabled}
        required
      >
        {type.map((t, i) => (
          <option key={i} value={t.value}>
            {t.name}
          </option>
        ))}
      </select>
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="ITE_PVP"
        value={editProduct.ITE_PVP}
        onChange={handleChange}
        disabled={disabled}
        required
      />
      <select
        className={disabled ? "form-control input-disabled " : "form-select"}
        name="ITE_IMPUESTO"
        value={editProduct.ITE_IMPUESTO}
        onChange={handleChange}
        required
        disabled={disabled}
      >
        <option value="0">No</option>
        <option value="2">Si</option>
      </select>
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
