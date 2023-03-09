import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword, Alert } from "../../../../redux/actions";

import validation from "../../../../functions/Ruc-Ci.ts";

export default function PersonalData({ disabled, userData, handleChange }) {
  const dispatch = useDispatch();
  const [error, setError] = useState({
    EMP_RUC: null,
  });
  const [isValid, setIsValid] = useState({
    EMP_RUC: null,
  });

  function handleChangePassword() {
    dispatch(changePassword()).then(() => {
      /*       toast.info("Se envio a tu correo un link para cambiar la contraseña"); */
    });
  }

  useEffect(() => {
    handleValidations("EMP_RUC", userData.EMP_RUC);
  }, [userData]);

  function handleValidations(name, value) {
    if (name === "EMP_RUC") {
      if (value !== "") {
        try {
          if (value.length !== 13)
            throw new Error("El formato del Ruc es incorrecto");

          let id = validation(value);

          // Si tenemos un error de parte de la validacion la devolvemos
          if (id.message !== "") throw new Error(id.message);

          setError({ ...error, EMP_RUC: null });
          setIsValid({ ...isValid, EMP_RUC: "" });
        } catch (err) {
          setError({ ...error, EMP_RUC: err.message });
          setIsValid({ ...isValid, EMP_RUC: "is-invalid" });
        }
      } else {
        setIsValid({ ...isValid, EMP_RUC: "" });
      }
    }
  }

  return (
    <div className="datosPersonales">
      <h5>Datos Personales</h5>
      <div className="flex">
        {/* RUC */}
        <div className="pers-data-left">
          <div className="form-floating mb-3 ">
            <input
              type="number"
              className={`form-control ${isValid.EMP_RUC}`}
              id={error.EMP_RUC ? "floatingInputInvalid" : "floatingInput"}
              name="EMP_RUC"
              disabled={disabled}
              value={userData.EMP_RUC}
              onChange={handleChange}
              required
            />
            <label className="floatingInput">RUC</label>
            {!error.EMP_RUC ? null : <small>{error.EMP_RUC}</small>}
          </div>

          {/* RAZON SOCIAL */}
          <div className="form-floating mb-3 ">
            <input
              type="text"
              className="form-control"
              name="EMP_NOMBRE"
              disabled={disabled}
              value={userData.EMP_NOMBRE}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Razón Social</label>
          </div>

          {/* DIRECCION */}
          <div className="form-floating mb-3 ">
            <input
              type="text"
              className="form-control"
              name="EMP_DIRECCION"
              disabled={disabled}
              value={userData.EMP_DIRECCION}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Dirección</label>
          </div>
        </div>
        <div className="pers-data-right">
          {/* TELEFONO */}
          <div className="form-floating mb-3 ">
            <input
              type="tel"
              className="form-control"
              name="EMP_TELEFONO"
              disabled={disabled}
              value={userData.EMP_TELEFONO}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Telefono</label>
          </div>

          {/* NOMBRE COMERCIAL */}
          <div className="form-floating mb-3 ">
            <input
              type="tel"
              className="form-control"
              name="EMP_NOMBRE_COMERCIAL"
              disabled={disabled}
              value={userData.EMP_NOMBRE_COMERCIAL}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Nombre comercial</label>
          </div>

          {/* EMAIL */}
          <div className="form-floating mb-3 ">
            <input
              type="email"
              className="form-control"
              name="EMP_EMAIL"
              disabled={disabled}
              value={userData.EMP_EMAIL}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Correo electronico</label>
          </div>
        </div>
      </div>
      {/* PASSWORD */}
      {disabled ? null : (
        <button
          className="btn btn-outline-success"
          onClick={() => {
            dispatch(
              Alert(
                "¿Seguro que quiere cambiar la contraseña?",
                handleChangePassword
              )
            );
          }}
        >
          Cambiar contraseña
        </button>
      )}
    </div>
  );
}
