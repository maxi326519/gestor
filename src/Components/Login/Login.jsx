import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const handleSubmit = async (evt) => {
    evt.preventDefault();
  };
  const handleChange = (evt) => {};

  return (
    <div className="container-Login">
      <div className="container-form">
        <h3 className="title-login">Inicia Sesion</h3>
        <form onSubmit={handleSubmit} className="form-body">
          {/* EMAIL */}
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={handleChange}
            />
            <label for="floatingInput">Correo electronico</label>
          </div>

          {/* PASSWORD */}
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="name@example.com"
              onChange={handleChange}
            />
            <label for="floatingInput">Contraseña</label>
          </div>

          <div className="button-check-register">
            <Link to="/dashboard" className="btn btn-primary btn-color">
              Iniciar Sesion
            </Link>
          </div>
        </form>
        <button className="container-google">
          <img
            src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
            alt="google-logo"
            className="google-logo"
          />
          Registrarse con Google
        </button>
        <div className="register-link">
          <p className="text-form-register">¿No tienes cuenta?</p>
          <Link to="/signin" className="btn btn-outline-primary">
            Registarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
