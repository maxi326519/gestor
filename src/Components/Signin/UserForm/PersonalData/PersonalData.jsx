import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  openLoading,
  closeLoading,
  confirmDatosPersonales,
} from "../../../../redux/actions";

import "./PersonalData.css";
import swal from "sweetalert";

export default function PersonalData() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userDB);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    EMP_RUC: null,
    EMP_NOMBRE: "",
    EMP_DIRECCION: "",
    EMP_TELEFONO: "",
    EMP_NOMBRE_COMERCIAL: "",
    EMP_LOGO: "",
  });

  const [error, setError] = useState({
    EMP_RUC: null,
    EMP_NOMBRE: null,
    EMP_DIRECCION: null,
    EMP_TELEFONO: null,
    EMP_NOMBRE_COMERCIAL: null,
    EMP_LOGO: null,
  });

  const [isValid, setIsValid] = useState({
    EMP_RUC: "",
    EMP_NOMBRE: "",
    EMP_DIRECCION: "",
    EMP_TELEFONO: "",
    EMP_NOMBRE_COMERCIAL: "",
    EMP_LOGO: "",
  });

  useEffect(() => {
    setUser({ ...user, EMP_RUC: userData.EMP_RUC ? userData.EMP_RUC : null });
  }, [userData]);

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

  async function handleSubmit(e) {
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
      dispatch(openLoading());
      await UploadImage()
        .then((imageUrl) => {

          dispatch(confirmDatosPersonales({ ...user, EMP_LOGO: imageUrl }))
            .then(() => {
              dispatch(closeLoading());
            })
            .catch((e) => {
              dispatch(closeLoading());
              swal(
                "Error",
                "Ocurrió un error desconocido, vuelva a intentar mas tarde",
                "error"
              );
              console.log(e);
            });
        })
        .catch((e) => {
          dispatch(closeLoading());
          swal(
            "Error",
            "Ocurrió un error desconocido, vuelva a intentar mas tarde",
            "error"
          );
          console.log(e);
        });
    }
  }

  const UploadImage = async () => {
    try {
      const dir = `/users/${userData.EMP_USUKEY}/perfil`;

      const storageRef = ref(storage, dir);
      const imageQuery = await uploadBytes(storageRef, file);

      // GET invoice image url
      const imageUrl = await getDownloadURL(imageQuery.ref);

      return imageUrl;
    } catch (e) {
      throw new Error(e);
    }
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
      {userData.EMP_RUC ? null : (
        <div className="form-floating mb-3 ">
          <input
            type="text"
            name="EMP_RUC"
            value={userData.EMP_RUC}
            className={`form-control ${
              !error.EMP_RUC ? isValid.EMP_RUC : "is-invalid"
            }`}
            id={
              error.EMP_RUC
                ? `floatingInputInvalid ${
                    isValid.EMP_RUC.length > 0 ? "validationServer01" : null
                  }`
                : "floatingInput"
            }
            placeholder="name"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Ruc</label>
          {!error.EMP_RUC ? null : <small>{error.EMP_RUC}</small>}
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
                  isValid.EMP_NOMBRE.length > 0 ? "validationServer01" : null
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
            !error.EMP_NOMBRE_COMERCIAL
              ? isValid.EMP_NOMBRE_COMERCIAL
              : "is-invalid"
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
        {!error.EMP_NOMBRE_COMERCIAL ? null : (
          <small>{error.EMP_NOMBRE_COMERCIAL}</small>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Guardar datos personales
      </button>
    </form>
  );
}
