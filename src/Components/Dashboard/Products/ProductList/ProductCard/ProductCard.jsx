import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  updateProduct,
  openLoading,
  closeLoading,
  Alert,
} from "../../.././../../redux/actions";

import edit from "../../../../../assets/svg/edit.svg";
import removeIcon from "../../../../../assets/svg/remove.svg";
import save from "../../../../../assets/svg/save.svg";
import "./ProductCard.css";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.uid);
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
    dispatch(openLoading());
    dispatch(deleteProduct(product.ITE_CODIGO))
      .then(() => {
        dispatch(closeLoading());
        toast.success("¡Producto eliminado exitosamente!");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error("Error al eliminar el producto");
        console.log(e.message);
      });
  }

  function handleUpdate() {
    dispatch(openLoading());
    dispatch(updateProduct(editProduct))
      .then(() => {
        dispatch(closeLoading());
        toast.success("¡Producto actualizado exitosamente!");
        setDisabled(true);
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error("Error al actualizar el producto");
        console.log(e.message);
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
        <option value={true}>Si</option>
        <option value={false}>No</option>
      </select>
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
        {disabled ? null : (
          <button className="btn btn-danger" onClick={handleEdit}>
            x
          </button>
        )}
      </div>
      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(
            Alert(`¿Seguro que quiere eliminar el producto?`, handleRemove)
          );
        }}
      >
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
