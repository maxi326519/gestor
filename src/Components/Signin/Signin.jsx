import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signin.css";
const INITIAL_STATE = {
  name: "",
  userName: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
  wallet: 0,
  isActive: true,
  isAdmin: false,
};

const CreateUserForm = () => {
  const [register, setRegister] = useState(INITIAL_STATE);
  const [validateRegister, setValidateRegister] = useState({
    name: true,
    email: true,
    password: true,
    equalsPassword: true,
  });

  const handleChange = (evt) => {};
  const handleSubmitRegister = async (evt) => {};

  return (
    <div className="container-register">
      <div className="container-form-body">
        <h3 className="title-form">Registrate</h3>
        <form onSubmit={handleSubmitRegister} className="form-body">
          {/* NOMBRE */}
          <div className="form-floating mb-3 ">
            <input
              type="text"
              name="name"
              className={`form-control ${
                validateRegister.name ? "" : "is-invalid"
              }`}
              id={
                validateRegister.name ? "floatingInputInvalid" : "floatingInput"
              }
              placeholder="name"
              onChange={handleChange}
            />
            <label for="floatingInput">Nombre</label>
          </div>
          {validateRegister.name ? null : (
            <span className="span-form">
              El nombre no puede contener numeros y menos de 5 letras
            </span>
          )}

          {/* USUARIO */}
          <div className="form-floating mb-3">
            <input
              type="text"
              name="userName"
              className="form-control"
              id="floatingInput"
              placeholder="name"
              onChange={handleChange}
            />
            <label for="floatingInput">Nombre de usuario</label>
          </div>

          {/* EMAIL */}
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className={`form-control ${
                validateRegister.email ? "" : "is-invalid"
              }`}
              id={
                validateRegister.email
                  ? "floatingInputInvalid"
                  : "floatingInput"
              }
              placeholder="name@example.com"
              onChange={handleChange}
            />
            <label for="floatingInput">Email address</label>
          </div>
          {validateRegister.email ? null : (
            <span className="span-form">
              El correo electronico no es valido
            </span>
          )}

          {/* CONTRASEÑA */}
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingInput"
              placeholder="Contraseña"
              value={register.password}
              onChange={handleChange}
            />
            <label for="floatingInput">Contraseña</label>
          </div>

          {/* CONFIRMAR CONTRASEÑA */}
          <div className="form-floating mb-3">
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirmar Contraseña"
              className={`form-control ${
                validateRegister.password ? "" : "is-invalid"
              }`}
              id={
                validateRegister.password
                  ? "floatingInputInvalid"
                  : "floatingInput"
              }
              value={register.confirm_password}
              onChange={handleChange}
            />
            <label for="floatingInput">Confirmar contraseña</label>
          </div>
          {validateRegister.password ? null : (
            <span className="span-form">
              La contraseña tiene que contener minimo 8 caracteres
            </span>
          )}
          {register.password !== register.confirm_password &&
          register.password.length >= 8 ? (
            <span className="span-form">Las contraseñas no coinciden</span>
          ) : null}

          {/* TELEFONO */}
          <div className="form-floating mb-3">
            <input
              type="text"
              name="phone"
              placeholder="Telefono"
              className="form-control"
              id="floatingInput"
              value={register.phone}
              onChange={handleChange}
            />
            <label for="floatingInput">Telefono</label>
          </div>

          {/* BOTON DE REGISTRO */}
          <div className="button-check-register">
            <Link to="/dashboard" className="btn btn-primary">Registrarse</Link>
          </div>

          {/* Auth0 de 3ros */}
          <button className="container-google">
            <img
              src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
              alt="google-logo"
              className="google-logo"
            />
            Iniciar con Google
          </button>
        </form>
        <div className="register-link">
          <p className="text-form-register">¿Ya tienes cuenta?</p>
          <Link to="/login" className="btn btn-outline-primary">
            Iniciar sesion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
