import { useState } from "react";
import styles from "./ResetPassword.module.css";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import swal from "sweetalert";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [send, setSend] = useState(false);

  function handleChange(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email);
    await sendPasswordResetEmail(email)
      .then(() => {
        setSend(true);
      })
      .catch((err) => {
        swal(
          "Error",
          "Hubo un error al enviar el correo de restauración, intentelo mas tarde",
          "error"
        );
        console.log(err);
      });
  }

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!send ? (
          <div className={styles.container}>
            <h4>Restaurar contraseña</h4>
            <div className="mb-3 form-floating">
              <input
                id="email"
                className="form-floating"
                type="email"
                value={email}
                onChange={handleChange}
                required
              />
              <label className="form-label" htmlFor="email">
                Correo
              </label>
            </div>
            <button className="btn btn-success" type="submit">
              Enviar
            </button>
            <Link to="/login">{"< Volver"}</Link>
          </div>
        ) : (
          <div className={styles.container}>
            <h4>Se mando un mail para restaurar la contraseña</h4>
            <Link to="/login">
              <button className="bnt btn-primary" type="button">
                Continuar
              </button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
