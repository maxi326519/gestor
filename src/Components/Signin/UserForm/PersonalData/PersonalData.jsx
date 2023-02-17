import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoading,
  closeLoading,
  confirmDatosPersonales,
} from "../../../../redux/actions";
import { toast } from "react-toastify";

import "./PersonalData.css";

export default function PersonalData() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userDB);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    EMP_NOMBRE: "",
    EMP_DIRECCION: "",
    EMP_TELEFONO: "",
    EMP_NOMBRE_COMERCIAL: "",
    EMP_LOGO: "",
  });

  const [error, setError] = useState({
    EMP_NOMBRE: null,
    EMP_DIRECCION: null,
    EMP_TELEFONO: null,
    EMP_NOMBRE_COMERCIAL: null,
    EMP_LOGO: null,
  });

  const [isValid, setIsValid] = useState({
    EMP_NOMBRE: "",
    EMP_DIRECCION: "",
    EMP_TELEFONO: "",
    EMP_NOMBRE_COMERCIAL: "",
    EMP_LOGO: "",
  });

  function handleChange(e) {
    console.log(user);
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
      if (data === "EMP_LOGO") continue;
      handleValidation(data, user[data]);
    }

    if (
      !error.EMP_NOMBRE &&
      !error.EMP_DIRECCION &&
      !error.EMP_TELEFONO &&
      !error.EMP_NOMBRE_COMERCIAL
    ) {
      UploadImage();
      dispatch(openLoading());
      dispatch(confirmDatosPersonales(user))
      .then(() => {
        dispatch(closeLoading());
        toast.success("Registro exitoso");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error(e.message);
        console.log(e);
      });
    }
  }
  
  const UPLOAD_PRESET = "abjukkka";
  const CLOUD_NAME = "doxph7wwq";
  
  const UploadImage = async () => {
    let img = "";
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    
    await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((r) => r.json())
      .then((r) => {
        img = r.secure_url;
      });
      setUser({ ...user, EMP_LOGO: img});
    };

  return (
      <form onSubmit={handleSubmit} className="to-left">
      <hr></hr>
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
            !error.EMP_LOGO ? isValid.EMP_LOGO : "is-invalid"
          }`}
          id={
            error.EMP_LOGO
              ? `floatingInputInvalid ${
                  isValid.EMP_LOGO.length > 0 ? "validationServer01" : null
                }`
              : "floatingInput"
          }
          onChange={handleFile}
          required
        />
        <hr></hr>
        {/* RUC */}
        {userData.EMP_RUC ? null :  (
          <div className="form-floating mb-3 ">
            <input
              type="text"
              name="ruc"
              value={user.ruc}
              className={`form-control ${
                !error.ruc ? isValid.ruc : "is-invalid"
              }`}
              id={
                error.ruc
                  ? `floatingInputInvalid ${
                      isValid.ruc.length > 0 ? "validationServer01" : null
                    }`
                  : "floatingInput"
              }
              placeholder="name"
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Ruc</label>
            {!error.ruc ? null : <small>{error.ruc}</small>}
          </div>
        )}

        {/* BUSINESS NAME */}
        <div className="form-floating mb-3 ">
          <input
            type="text"
            name="EMP_NOMBRE"
            className={`form-control ${
              !error.EMP_NOMBRE ? isValid.EMP_NOMBRE : "is-invalid"
            }`}
            id={
              error.EMP_NOMBRE
                ? `floatingInputInvalid ${
                    isValid.EMP_NOMBRE.length > 0
                      ? "validationServer01"
                      : null
                  }`
                : "floatingInput"
            }
            placeholder="name"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Razón Social</label>
          {!error.EMP_NOMBRE ? null : <small>{error.EMP_NOMBRE}</small>}
        </div>

        {/* DIRECCION */}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="EMP_DIRECCION"
            className={`form-control ${
              !error.EMP_DIRECCION ? isValid.EMP_DIRECCION : "is-invalid"
            }`}
            id={
              error.EMP_DIRECCION
                ? `floatingInputInvalid ${
                    isValid.EMP_DIRECCION.length > 0 ? "validationServer01" : null
                  }`
                : "floatingInput"
            }
            placeholder="name@example.com"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Dirección</label>
          {!error.EMP_DIRECCION ? null : <small>{error.EMP_DIRECCION}</small>}
        </div>

        {/* TELEFONO */}
        <div className="form-floating mb-3">
          <input
            type="tel"
            name="EMP_TELEFONO"
            className={`form-control ${
              !error.EMP_TELEFONO ? isValid.EMP_TELEFONO : "is-invalid"
            }`}
            id={
              error.EMP_TELEFONO
                ? `floatingInputInvalid ${
                    isValid.EMP_TELEFONO.length > 0 ? "validationServer01" : null
                  }`
                : "floatingInput"
            }
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Teléfono</label>
          {!error.EMP_TELEFONO ? null : <small>{error.EMP_TELEFONO}</small>}
        </div>

        {/* NOMBRE COMECRCIAL */}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="EMP_NOMBRE_COMERCIAL"
            placeholder="Confirmar Contraseña"
            className={`form-control ${
              !error.EMP_NOMBRE_COMERCIAL ? isValid.EMP_NOMBRE_COMERCIAL : "is-invalid"
            }`}
            id={
              error.EMP_NOMBRE_COMERCIAL
                ? `floatingInputInvalid ${
                    isValid.EMP_NOMBRE_COMERCIAL.length > 0
                      ? "validationServer010-9"
                      : null
                  }`
                : "floatingInput"
            }
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Nombre comercial</label>
          {!error.EMP_NOMBRE_COMERCIAL ? null : <small>{error.EMP_NOMBRE_COMERCIAL}</small>}
        </div>

        <button className="btn btn-primary" type="submit">
          Guardar datos personales
        </button>
      </form>
  );
}
