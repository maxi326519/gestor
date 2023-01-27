import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import { Link, useNavigate} from "react-router-dom";
import "./Login.css";

export default function Signin() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState({
    userName: null,
    password: null,
  });

  function handleChange(e){
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(login(user))
    .then(() => redirect('/dashboard/clients'))
    .catch((e) => {
      if(e.message.includes('usuario')) setError({ ...error, userName: e.message.split(':')[1]})
      else if(e.message.includes('contraseña')) setError({ ...error, password: e.message.split(':')[1]})
      console.log(e);
    })
  };

  return (
    <div className="sesion">
      <form onSubmit={handleSubmit} className="to-left">
        <h2>Iniciar sesion</h2>
        {/* USUARIO */}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="userName"
            className={`form-control ${!error.userName ? "" : "is-invalid"}`}
            id={error.userName ? "floatingInputInvalid" : "user"}
            placeholder="name"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Nombre de usuario</label>
          {!error.userName ? null : <small>{error.userName}</small>}
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
        <button className="btn btn-primary" type="submit">Iniciar sesion</button>

        <p>¿No tienes cuenta?</p>

        <Link to="/signin" className="btn btn-outline-primary">
          Registate
        </Link>
      </form>
    </div>
  );
}
