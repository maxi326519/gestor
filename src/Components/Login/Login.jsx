import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, GoogleSesion, openLoading, closeLoading } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.css";

export default function Signin() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    ruc: "",
    password: "",
  });

  const [error, setError] = useState({
    ruc: null,
    password: null,
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleGoogleSesion(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(GoogleSesion())
      .then(() => {
        dispatch(closeLoading());
        redirect("/dashboard/invoices/add");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast(e);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(login(user))
      .then(() => {
        dispatch(closeLoading());
        redirect("/dashboard/invoices/add");
      })
      .catch((e) => {
        dispatch(closeLoading());
        console.log(e);
      });
  }

  return (
    <div className="sesion">
      <form className="to-left">
        <h2>Iniciar sesion</h2>
        {/* Ruc */}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="ruc"
            className={`form-control ${!error.ruc ? "" : "is-invalid"}`}
            id={error.ruc ? "floatingInputInvalid" : "user"}
            placeholder="name"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Ruc</label>
          {!error.ruc ? null : <small>{error.ruc}</small>}
        </div>

        {/* CONTRASEÑA */}
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className={`form-control ${!error.password ? "" : "is-invalid"}`}
            id={error.password ? "floatingInputInvalid" : "pass"}
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Contraseña</label>
          {!error.password ? null : <small>{error.password}</small>}
        </div>

        {/* BOTON DE REGISTRO */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Iniciar sesion
        </button>

        <button className="btn btn-primary" onClick={handleGoogleSesion}>
          Registrase con Google
        </button>

        <p>¿No tienes cuenta?</p>

        <Link to="/signin" className="btn btn-outline-primary">
          Registate
        </Link>
      </form>
    </div>
  );
}
