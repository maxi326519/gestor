import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoading,
  closeLoading,
  confirmRegister,
  uploadLogo,
} from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

import "./UserForm.css";
import { toast } from "react-toastify";

export default function Signin() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const userData = useSelector((state) => state.user);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    businessName: "",
    address: "",
    phone: "",
    tradeName: "",
    logo: "",
  });

  const [error, setError] = useState({
    businessName: null,
    address: null,
    phone: null,
    tradeName: null,
    logo: null,
    complete: true,
  });

  const [isValid, setIsValid] = useState({
    businessName: "",
    address: "",
    phone: "",
    tradeName: "",
    logo: "",
    complete: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    handleValidation(e.target.name, e.target.value);
  }

  function handleFile(e) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  }

  function handleValidation(name, value) {
    if (value === "") {
      setError({ ...error, [name]: "Debes completar este campo" });
      setIsValid({ ...isValid, [name]: "" });
    } else {
      setError({ ...error, [name]: null });
      setIsValid({ ...isValid, [name]: "is-valid" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    for (const data in user) {
      if (data === "logo") continue;
      handleValidation(data, user[data]);
    }

    if (
      !error.businessName &&
      !error.address &&
      !error.phone &&
      !error.tradeName
    ) {
/*       dispatch(uploadLogo(userData.uid, file)).then(() => { */
        dispatch(openLoading());
        dispatch(confirmRegister(user))
          .then(() => {
            dispatch(closeLoading());
            redirect("/dashboard/invoices/add");
            toast.success("Registro exitoso");
          })
          .catch((e) => {
            dispatch(closeLoading());
            toast.error(e.message);
            console.log(e);
          });
/*       }); */
    }
  }

  useEffect(() => {
    if (user.complete) {
      redirect("/dashboard/invoices/add");
    }
  }, [userData]);

  return (
    <div className="sesion">
      <form onSubmit={handleSubmit} className="to-left">
        <h4>Complete sus datos personales</h4>
        <div className="logo-container">
          {file ? (
            <img src={imageUrl} alt="your-logo" />
          ) : (
            <span>Seleccione una imagen</span>
          )}
        </div>
        <input
          type="file"
          name="file"
          accept="image/*"
          className={`form-control ${
            !error.logo ? isValid.logo : "is-invalid"
          }`}
          id={
            error.logo
              ? `floatingInputInvalid ${
                  isValid.logo.length > 0 ? "validationServer01" : null
                }`
              : "floatingInput"
          }
          onChange={handleFile}
          require
        />
        <hr></hr>
        {/* BUSINESS NAME */}
        <div className="form-floating mb-3 ">
          <input
            type="text"
            name="businessName"
            className={`form-control ${
              !error.businessName ? isValid.businessName : "is-invalid"
            }`}
            id={
              error.businessName
                ? `floatingInputInvalid ${
                    isValid.businessName.length > 0
                      ? "validationServer01"
                      : null
                  }`
                : "floatingInput"
            }
            placeholder="name"
            onChange={handleChange}
            require
          />
          <label htmlFor="floatingInput">Razón Social</label>
          {!error.businessName ? null : <small>{error.businessName}</small>}
        </div>

        {/* ADDRESS */}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="address"
            className={`form-control ${
              !error.address ? isValid.address : "is-invalid"
            }`}
            id={
              error.address
                ? `floatingInputInvalid ${
                    isValid.address.length > 0 ? "validationServer01" : null
                  }`
                : "floatingInput"
            }
            placeholder="name@example.com"
            onChange={handleChange}
            require
          />
          <label htmlFor="floatingInput">Dirección</label>
          {!error.address ? null : <small>{error.address}</small>}
        </div>

        {/* PHONE */}
        <div className="form-floating mb-3">
          <input
            type="tel"
            name="phone"
            className={`form-control ${
              !error.phone ? isValid.phone : "is-invalid"
            }`}
            id={
              error.phone
                ? `floatingInputInvalid ${
                    isValid.phone.length > 0 ? "validationServer01" : null
                  }`
                : "floatingInput"
            }
            placeholder="Contraseña"
            onChange={handleChange}
            require
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
            className={`form-control ${
              !error.tradeName ? isValid.tradeName : "is-invalid"
            }`}
            id={
              error.tradeName
                ? `floatingInputInvalid ${
                    isValid.tradeName.length > 0
                      ? "validationServer010-9"
                      : null
                  }`
                : "floatingInput"
            }
            onChange={handleChange}
            require
          />
          <label htmlFor="floatingInput">Nombre Comercial</label>
          {!error.tradeName ? null : <small>{error.tradeName}</small>}
        </div>

        <button className="btn btn-primary" type="submit">
          Terminar registro
        </button>
      </form>
    </div>
  );
}
