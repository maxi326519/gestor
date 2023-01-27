import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

export default function Signin() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    name: null,
    userName: null,
    email: null,
    password: null,
    confirmPassword: null,  
  });

  function handleChange(e){
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(signin({
      name: user.name,
      userName: user.userName,
      email: user.email,
      password: user.password,
    }))
    .then(() => redirect('/dashboard/clients'))
    .catch((e) => setError({ ...error, email: e.message.split(':')[1]}))
  };

  return (
    <div className="sesion">
      <form onSubmit={handleSubmit} className="to-left">
        <h2>Registrate</h2>
        {/* NOMBRE */}
        <div className="form-floating mb-3 ">
          <input
            type="text"
            name="name"
            className={`form-control ${!error.name ? "" : "is-invalid"}`}
            id={error.name ? "floatingInputInvalid" : "floatingInput"}
            placeholder="name"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Nombre</label>
          {!error.name ? null : <small>{error.name}</small>}
        </div>

        {/* USUARIO */}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="userName"
            className={`form-control ${!error.userName ? "" : "is-invalid"}`}
            id={error.userName ? "floatingInputInvalid" : "floatingInput"}
            placeholder="name"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Nombre de usuario</label>
          {!error.userName ? null : <small>{error.userName}</small>}
        </div>

        {/* EMAIL */}
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className={`form-control ${!error.email ? "" : "is-invalid"}`}
            id={error.email ? "floatingInputInvalid" : "floatingInput"}
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
          {!error.email ? null : <small>{error.email}</small>}
        </div>

        {/* CONTRASEÑA */}
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className={`form-control ${!error.password ? "" : "is-invalid"}`}
            id={error.password ? "floatingInputInvalid" : "floatingInput"}
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Contraseña</label>
          {!error.password ? null : <small>{error.password}</small>}
        </div>

        {/* CONFIRMAR CONTRASEÑA */}
        <div className="form-floating mb-3">
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirmar Contraseña"
            className={`form-control ${
              !error.confirmPassword ? "" : "is-invalid"
            }`}
            id={
              error.confirmPassword ? "floatingInputInvalid" : "floatingInput"
            }
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Confirmar contraseña</label>
          {!error.confirmPassword ? null : <small>{error.confirmPassword}</small>}
        </div>

        <button className="btn btn-primary" type="submit">Registrarse</button>

        <p>¿Ya tienes cuenta?</p>

        <Link to="/login" className="btn btn-outline-primary">
          Iniciar sesion
        </Link>
      </form>
    </div>
  );
}