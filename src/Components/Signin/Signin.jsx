import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

export default function Signin() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const [user, setUser] = useState({
    ruc: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    ruc: null,
    email: null,
    password: null,
    confirmPassword: null,  
  });

  function handleChange(e){
    console.log(user);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(signin({
      ruc: user.ruc,
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
        {/* RUC */}
        <div className="form-floating mb-3 ">
          <input
            type="text"
            name="ruc"
            className={`form-control ${!error.ruc ? "" : "is-invalid"}`}
            id={error.ruc ? "floatingInputInvalid" : "floatingInput"}
            placeholder="name"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Ruc</label>
          {!error.ruc ? null : <small>{error.ruc}</small>}
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