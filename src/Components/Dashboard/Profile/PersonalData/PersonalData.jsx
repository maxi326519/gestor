import { useDispatch } from "react-redux";
import { changePassword } from "../../../../redux/actions";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

export default function PersonalData({
  disabled,
  userData,
  handleChange,
  handleProfile,
}) {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  function handleChangePassword() {
    swal({
      text: "¿Seguro que quiere cambiar la contraseña?",
      icon: "info",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(changePassword()).then(() => {
          swal(
            "Enviado",
            "Se envio un correo para cambiar tu contraseña",
            "success"
          );
        });
      }
    });
  }

  function handleChangeEmail() {
    redirect("/reset-email");
    handleProfile();
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
              className="form-control"
              id="floatingInputInvalid"
              name="EMP_RUC"
              disabled
              value={userData.EMP_RUC}
              onChange={handleChange}
              required
            />
            <label className="floatingInput">RUC</label>
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
              disabled={true}
              value={userData.EMP_EMAIL}
            />
            <label htmlFor="floatingInput">Correo electronico</label>
          </div>
        </div>
      </div>
      {/* PASSWORD */}
      {disabled ? null : (
        <div className="btn-container">
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleChangePassword}
          >
            Cambiar contraseña
          </button>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleChangeEmail}
          >
            Cambiar correo
          </button>
        </div>
      )}
    </div>
  );
}
