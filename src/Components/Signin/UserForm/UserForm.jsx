import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadUser, openLoading, closeLoading } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

import "./UserForm.css";

export default function Signin() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const userUID = useState((state) => user.uid);
  const [user, setUser] = useState({
    businessName: "",
    address: "",
    phone: "",
    tradeName: "",
    logo: "",
  });

  const [error, setError] = useState({
    businessName: false,
    address: false,
    phone: false,
    tradeName: false,
    logo: false,
  });

  function handleChange(e) {
    console.log(user);
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(uploadUser(userUID, user))
      .then(() => {
        dispatch(closeLoading());
        redirect("/signin/user");
      })
      .catch((e) => {
        dispatch(closeLoading());
        console.log(e);
      });
  }

  return (
    <div className="sesion">
      <form onSubmit={handleSubmit} className="to-left">
        <h2>Registrate</h2>
        {/* BUSINESS NAME */}
        <div className="form-floating mb-3 ">
          <input
            type="text"
            name="businessName"
            className={`form-control ${
              !error.businessName ? "" : "is-invalid"
            }`}
            id={error.businessName ? "floatingInputInvalid" : "floatingInput"}
            placeholder="name"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Razón Social</label>
          {!error.businessName ? null : <small>{error.businessName}</small>}
        </div>

        {/* ADDRESS */}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="address"
            className={`form-control ${!error.address ? "" : "is-invalid"}`}
            id={error.address ? "floatingInputInvalid" : "floatingInput"}
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Dirección</label>
          {!error.address ? null : <small>{error.address}</small>}
        </div>

        {/* PHONE */}
        <div className="form-floating mb-3">
          <input
            type="tel"
            name="phone"
            className={`form-control ${!error.phone ? "" : "is-invalid"}`}
            id={error.phone ? "floatingInputInvalid" : "floatingInput"}
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Teléfono</label>
          {!error.phone ? null : <small>{error.phone}</small>}
        </div>

        {/* TRADE NAME */}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="tradeName"
            placeholder="Confirmar Contraseña"
            className={`form-control ${!error.tradeName ? "" : "is-invalid"}`}
            id={error.tradeName ? "floatingInputInvalid" : "floatingInput"}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Nombre Comercial</label>
          {!error.tradeName ? null : <small>{error.tradeName}</small>}
        </div>

        <button className="btn btn-primary" type="submit">
          Agregar datos
        </button>
      </form>
    </div>
  );
}
