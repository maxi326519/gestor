import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, GoogleSesion, openLoading, closeLoading, getUserData } from "../../redux/actions";
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
    handleValidation(e.target.name, e.target.value);
  }

  function handleGoogleSesion(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(GoogleSesion())
      .then(() => {
        handlVerifyRegister();
      })
      .catch((e) => {
        dispatch(closeLoading());
        console.log(e.message);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(login(user))
      .then(() => {
        handlVerifyRegister();
      })
      .catch((e) => {
        dispatch(closeLoading());
        if(e.message.includes("ruc")){
          setError({ ...error, ruc: "No existe ningun usuario con ese ruc" });
        }else if(e.message.includes("password")){
          setError({ ...error, password: "La contraseña es incorrecta" });
        }else{
          toast(e.message);
          console.log(e.message);
        }
      });
  }

  function handlVerifyRegister(){
    dispatch(getUserData()).then((d) => {
    if (!d.payload.complete) {
      dispatch(closeLoading());
      redirect("/signin/user");
    } else {
      dispatch(closeLoading());
      redirect("/dashboard/invoices/add");
    }
    });
  }

  function handleValidation(name, value) {
    if(name === "ruc"){
      if(value === ""){
        setError({ ...error, ruc: "Debes completar el campo"});
      } else{
        setError({ ...error, ruc: null});
      }
    }

    if(name === "password"){
      if(value === ""){
        setError({ ...error, password: "Debes completar el campo"});
      } else{
        setError({ ...error, password: null});
      }
    }
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
            required
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
            required
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