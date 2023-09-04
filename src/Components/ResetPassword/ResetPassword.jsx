import { closeLoading, openLoading } from "../../redux/actions";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { auth } from "../../firebase";
import swal from "sweetalert";

import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const correo = /^[\w.@]+$/;

    if (correo.test(event.target.value)) {
      setEmail(event.target.value);
      handleValidation(event.target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!error) {
      dispatch(openLoading());
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          dispatch(closeLoading());
          swal({
            title: "Enviado",
            text: "Ya se envio un correo para reestablecer la contraseña",
            icon: "success",
            buttons: {
              aceptar: true,
            },
          }).then((res) => {
            redirect("/login");
          });
        })
        .catch((err) => {
          dispatch(closeLoading());
          if (err.message.includes("user-not-found")) {
            setError("No existe un ususario con ese correo");
          } else if (err.message.includes("invalid-email")) {
            setError("El mail no es valido");
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
      <form className={`to-left ${styles.form}`} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <h4>Restaurar contraseña</h4>
          <div className="form-floating">
            <input
              id={error ? "floatingInputInvalid" : "email"}
              name="email"
              type="email"
              className={`form-control ${!error ? "" : "is-invalid"}`}
              value={email}
              onChange={handleChange}
              required
            />
            <label className="form-label" htmlFor="email">
              Escriba su correo
            </label>
            {error ? <small>{error}</small> : null}
          </div>
          <button className="btn btn-success" type="submit">
            Enviar
          </button>
          <Link to="/login">{"< Volver"}</Link>
        </div>
      </form>
    </div>
  );
}
