import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeEmail, closeLoading, openLoading } from "../../redux/actions";
import swal from "sweetalert";

import styles from "./ResetEmail.module.css";

export default function ResetEmail() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleChangeEmail(event) {
    const correo = /^[\w.@]+$/;

    if (correo.test(event.target.value)) {
      setEmail(event.target.value);
      handleValidation(event.target.value);
    }
  }

  async function handleSubmitEmail(event) {
    event.preventDefault();
    if (!error) {
      dispatch(openLoading());
      dispatch(changeEmail(email, user.userDB.EMP_RUC))
        .then(() => {
          dispatch(closeLoading());
          swal("Actualizado", "Se cambio el correco con exito", "success").then(
            (res) => {
              if (res) {
                redirect("/dashboard/invoices");
              }
            }
          );
        })
        .catch((err) => {
          dispatch(closeLoading());
          if (err.message.includes("requires-recent-login")) {
            swal({
              titulo: "Error",
              text: "Se requiere que haya iniciado sesion recientemente, reinicie sesión para hacer el cambio",
              icon: "error",
              buttons: {
                iniciar: true,
                cancel: true,
              },
            }).then((res) => {
              if (res) {
                redirect("/login");
              } else {
                redirect("/dashboard/invoices");
              }
            });
          } else {
            swal(
              "Error",
              "Hubo un error al enviar el correo de restauración, intentelo mas tarde",
              "error"
            );
          }
          console.log(err);
        });
    }
  }

  function handleValidation(value) {
    const correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      setError("Debes completar el campo");
    } else if (!correo.test(value)) {
      setError("Formato de correo incorrecto");
    } else {
      setError(null);
    }
  }

  return (
    <div className={styles.background}>
      <form className={`to-left ${styles.form}`} onSubmit={handleSubmitEmail}>
        <div className={styles.container}>
          <h4>Cambiar correo</h4>
          <div className="form-floating">
            <input
              id={error ? "floatingInputInvalid" : "email"}
              name="email"
              type="email"
              className={`form-control ${!error ? "" : "is-invalid"}`}
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <label className="form-label" htmlFor="email">
              Escriba su nuevo correo
            </label>
            {error ? <small>{error}</small> : null}
          </div>
          <button className="btn btn-success" type="submit">
            cambiar
          </button>
          <Link to="/dashboard/invoices/add">{"< Volver"}</Link>
        </div>
      </form>
    </div>
  );
}
