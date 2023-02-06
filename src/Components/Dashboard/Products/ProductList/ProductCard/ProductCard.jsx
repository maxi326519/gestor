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

  function handleEdit() {
    setDisabled(!disabled);
  }

  function handleChange(e) {
    setProduct({ ...editProduct, [e.target.name]: e.target.value });
  }

  function handleRemove() {
    dispatch(openLoading());
    dispatch(deleteProduct(userId, product.code))
      .then(() => {
        dispatch(closeLoading());
        toast("¡Producto eliminado exitosamente!");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast("Error al eliminar el producto");
        console.log(e);
      });
  }

  function handleUpdate() {
    dispatch(openLoading());
    dispatch(updateProduct(userId, editProduct))
      .then(() => {
        dispatch(closeLoading());
        toast("¡Producto actualizado exitosamente!");
        setDisabled(true);
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast("Error al actualizar el producto");
        console.log(e);
      });
  }

  return (
    <div key={product.code} className="product-card">
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        disabled={true}
        value={editProduct.code}
        onChange={handleChange}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="name"
        disabled={disabled}
        value={editProduct.name}
        onChange={handleChange}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="type"
        disabled={disabled}
        value={editProduct.type}
        onChange={handleChange}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="price"
        disabled={disabled}
        value={editProduct.price}
        onChange={handleChange}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="taxes"
        disabled={disabled}
        value={editProduct.taxes}
        onChange={handleChange}
      />
      <input
        className={`form-control ${disabled ? "input-disabled" : ""}`}
        name="description"
        disabled={disabled}
        value={editProduct.description}
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
            `Si elimina un producto tenga en cuanta que ciertos detalles de las facturas se elimina tambien`,
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