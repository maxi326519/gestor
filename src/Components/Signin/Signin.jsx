import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  signin,
  GoogleSesion,
  openLoading,
  closeLoading,
} from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Signin.css";

export default function Signin() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const [user, setUser] = useState({
    ruc: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const expressions = {
    password: /^[\s\S]{8,18}$/, // 8 a 18 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^[+]{0,1}[0-9]{0,}$/,
  };

  const [error, setError] = useState({
    ruc: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [isValid, setIsValid] = useState({
    ruc: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    handleVerification();
  }, [user]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    handleVerification(e.target.name, e.target.value);
  }

  function handleVerification(name, value) {
    if (name === "ruc") {
      if (value !== "") {
        setIsValid({ ...isValid, ruc: "is-valid" });
      } else {
        setIsValid({ ...isValid, ruc: "" });
      }
    }

    if (name === "email") {
      if (value !== "") {
        if (!expressions.email.test(value.trim())) {
          setError({ ...error, email: "El correo no es valido" });
          setIsValid({ ...isValid, email: "" });
        } else {
          setError({ ...error, email: null });
          setIsValid({ ...isValid, email: "is-valid" });
        }
      } else {
        setError({ ...error, email: null });
        setIsValid({ ...isValid, email: "" });
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

  function handleGoogleSesion(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(GoogleSesion())
      .then(() => {
        dispatch(closeLoading());
        redirect("/signin/user");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast(e);
        console.log(e);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    for (const data in user) {
      handleVerification(data, user[data]);
    }

    dispatch(openLoading());
    dispatch(
      signin({
        ruc: user.ruc,
        email: user.email,
        password: user.password,
      })
    )
      .then(() => {
        dispatch(closeLoading());
        redirect("/signin/user");
      })
      .catch((e) => {
        dispatch(closeLoading());
        if (e.message.includes("email-already-in-use")) {
          setError({ ...error, email: "El correo ya esta en uso" });
        } else {
          toast(e.message);
          console.log(e.message);
        }
        if (e.message.includes("ruc")) {
          setError({ ...error, ruc: "El ruc ya esta en uso" });
        } else {
          toast(e.message);
          console.log(e.message);
        }
      });
  }

  return (
    <div className="sesion">
      <form onSubmit={handleSubmit} className="to-left">
        <h2>Registrate</h2>
        {/* RUC */}
        <div className="form-floating mb-3 ">
          <input
            type="text"
            name="ruc"
            className={`form-control ${
              !error.ruc ? isValid.ruc : "is-invalid"
            }`}
            id={error.ruc ? "floatingInputInvalid" : "floatingInput"}
            placeholder="name"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Ruc</label>
          {!error.ruc ? null : <small>{error.ruc}</small>}
        </div>

        {/* EMAIL */}
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className={`form-control ${
              !error.email ? isValid.email : "is-invalid"
            }`}
            id={error.email ? "floatingInputInvalid" : "floatingInput"}
            placeholder="name@example.com"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Correo electronico</label>
          {!error.email ? null : <small>{error.email}</small>}
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
          {!error.confirmPassword ? null : (
            <small>{error.confirmPassword}</small>
          )}
        </div>

        <button className="btn btn-primary" type="submit">
          Registrarse
        </button>

        <button className="btn btn-primary" onClick={handleGoogleSesion}>
          Registrase con Google
        </button>

        <p>¿Ya tienes cuenta?</p>

        <Link to="/login" className="btn btn-outline-primary">
          Iniciar sesion
        </Link>
      </form>
    </div>
  );
}
