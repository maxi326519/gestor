import { useState } from "react";
import { useDispatch } from "react-redux";
import { signin, openLoading, closeLoading } from "../../../redux/actions";
import { Link } from "react-router-dom";
import validation from "../../../functions/Ruc-Ci.ts";

import "./Sesion.css";
import swal from "sweetalert";

export default function Sesion() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    EMP_RUC: "",
    EMP_EMAIL: "",
    password: "",
    confirmPassword: "",
  });

  const expressions = {
    password: /^[\s\S]{8,18}$/, // 8 a 18 digitos.
    EMP_EMAIL: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    EMP_TELEFONO: /^[+]{0,1}[0-9]{0,}$/,
  };

  const [error, setError] = useState({
    EMP_RUC: null,
    EMP_EMAIL: null,
    password: null,
    confirmPassword: null,
  });

  const [isValid, setIsValid] = useState({
    EMP_RUC: "",
    EMP_EMAIL: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    handleVerification(e.target.name, e.target.value);
  }

  function handleVerification(name, value) {
    if (name === "EMP_RUC") {
      if (value !== "") {
        try {
          if (value.length !== 13)
            throw new Error("El formato del Ruc es incorrecto");

          let id = validation(value);

          // Si tenemos un error de parte de la validacion la devolvemos
          if (id.message !== "") throw new Error(id.message);

          setError({ ...error, EMP_RUC: null });
          setIsValid({ ...isValid, EMP_RUC: "is-valid" });
        } catch (err) {
          setError({ ...error, EMP_RUC: err.message });
          setIsValid({ ...isValid, EMP_RUC: "is-invalid" });
        }
      } else {
        setIsValid({ ...isValid, EMP_RUC: "" });
      }
    }

    if (name === "EMP_EMAIL") {
      if (value !== "") {
        if (!expressions.EMP_EMAIL.test(value.trim())) {
          setError({ ...error, EMP_EMAIL: "El correo no es valido" });
          setIsValid({ ...isValid, EMP_EMAIL: "" });
        } else {
          setError({ ...error, EMP_EMAIL: null });
          setIsValid({ ...isValid, EMP_EMAIL: "is-valid" });
        }
      } else {
        setError({ ...error, EMP_EMAIL: null });
        setIsValid({ ...isValid, EMP_EMAIL: "" });
      }
    }

    if (name === "password") {
      if (value !== "") {
        if (!expressions.password.test(value.trim())) {
          setError({
            ...error,
            password: "Debe contener entre 8 y 18 caracteres",
          });
          setIsValid({ ...isValid, password: "" });
        } else {
          setError({ ...error, password: null, confirmPassword: null });
          setIsValid({ ...isValid, password: "is-valid" });
        }
      } else {
        setError({ ...error, password: null });
        setIsValid({ ...isValid, password: "" });
      }
    }

    if (name === "confirmPassword") {
      if (value !== "") {
        if (user.password !== value) {
          setError({
            ...error,
            confirmPassword: "Las contraseñas no coinciden",
          });
          setIsValid({ ...isValid, confirmPassword: "" });
        } else {
          setError({ ...error, confirmPassword: null });
          setIsValid({ ...isValid, confirmPassword: "is-valid" });
        }
      } else {
        setError({ ...error, confirmPassword: null });
        setIsValid({ ...isValid, confirmPassword: "" });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (const data in user) {
      handleVerification(data, user[data]);
    }
    if (
      !error.EMP_RUC &&
      !error.EMP_EMAIL &&
      !error.password &&
      !error.confirmPassword
    ) {
      dispatch(openLoading());
      dispatch(
        signin({
          EMP_RUC: user.EMP_RUC,
          EMP_EMAIL: user.EMP_EMAIL,
          password: user.password,
        })
      )
        .then(() => {
          dispatch(closeLoading());
        })
        .catch((e) => {
          dispatch(closeLoading());
          if (e.message.includes("email-already-in-use")) {
            setError({ ...error, EMP_EMAIL: "El correo ya esta en uso" });
          } else if (e.message.includes("ruc")) {
            setError({ ...error, EMP_RUC: "El ruc ya esta en uso" });
          } else {
            swal(
              "Error",
              "Ocurrió un error desconocido, vuelva a intentar mas tarde",
              "error"
            );
            console.log(e.message);
          }
        });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="to-left">
      <h2>Registrate</h2>
      {/* RUC */}
      <div className="form-floating mb-3 ">
        <input
          type="text"
          name="EMP_RUC"
          className={`form-control ${
            !error.EMP_RUC ? isValid.EMP_RUC : "is-invalid"
          }`}
          id={error.EMP_RUC ? "floatingInputInvalid" : "floatingInput"}
          placeholder="name"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingInput">Ruc</label>
        {!error.EMP_RUC ? null : <small>{error.EMP_RUC}</small>}
      </div>

      {/* EMAIL */}
      <div className="form-floating mb-3">
        <input
          type="EMP_EMAIL"
          name="EMP_EMAIL"
          className={`form-control ${
            !error.EMP_EMAIL ? isValid.EMP_EMAIL : "is-invalid"
          }`}
          id={error.EMP_EMAIL ? "floatingInputInvalid" : "floatingInput"}
          placeholder="name@example.com"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingInput">Correo electronico</label>
        {!error.EMP_EMAIL ? null : <small>{error.EMP_EMAIL}</small>}
      </div>

      {/* CONTRASEÑA */}
      <div className="form-floating mb-3">
        <input
          type="password"
          name="password"
          className={`form-control ${
            error.password || error.confirmPassword
              ? "is-invalid"
              : isValid.password
          }`}
          id={
            error.password || error.confirmPassword
              ? `floatingInputInvalid ${
                  isValid.password.length > 0 ? "validationServer01" : null
                }`
              : "floatingInput"
          }
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingInput">Contraseña</label>
        {!error.password ? null : <small>{error.password}</small>}
      </div>

      {/* CONFIRMAR CONTRASEÑA */}
      <div className="form-floating mb-3">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          className={`form-control ${
            !error.confirmPassword ? isValid.confirmPassword : "is-invalid"
          }`}
          id={
            error.confirmPassword
              ? `floatingInputInvalid ${
                  isValid.confirmPassword.length > 0
                    ? "validationServer01"
                    : null
                }`
              : "floatingInput"
          }
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingInput">Confirmar contraseña</label>
        {!error.confirmPassword ? null : <small>{error.confirmPassword}</small>}
      </div>

      <button
        className="btn btn-primary"
        type="submit"
        disabled={
          error.EMP_RUC ||
          error.EMP_EMAIL ||
          error.password ||
          error.confirmPassword
        }
      >
        Registrarse
      </button>

      <p>¿Ya tienes cuenta?</p>

      <Link to="/login" className="btn btn-outline-primary">
        Iniciar sesion
      </Link>
    </form>
  );
}
