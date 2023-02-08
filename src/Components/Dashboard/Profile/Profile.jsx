import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserData, uploadLogo, changePassword, openLoading, closeLoading, Alert } from "../../../redux/actions";

import SideBar from "../SideBar/SideBar";

import "../Dashboard.css";
import "./Profile.css";
import { toast } from "react-toastify";

export default function Profile({
  handleAddInvoice,
  handleAddProduct,
  handleAddClient,
}) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const user = useSelector((state) => state.user);
  const initialState = {
    ruc: user.ruc,
    businessName: user.businessName,
    address: user.address,
    phone: user.phone,
    tradeName: user.tradeName,
    email: user.email,
  }
  const [userData, setUser] = useState(initialState);

  function handleFile(e) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setUser({ ...userData, logo: url });
    }
  }

  function handleChange(e) {
    setUser({ ...userData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
/*     dispatch(uploadLogo(file)); */

    dispatch(openLoading())
    dispatch(updateUserData(userData))
    .then(() => {
      dispatch(closeLoading())
      toast.success("¡Perfil actualizado exitosamente!");
    })
    .catch((e) => {
      dispatch(closeLoading())
      toast.error(e.message);
      console.log(e.message);
    })
  }

  function handleChangePassword() {
    dispatch(changePassword()).then(() => {
      toast.info("Se envio a tu correo un link para cambiar la contraseña");
    });
  }

  function handleDisabled() {
    setDisabled(!disabled);
  }

  return (
    <div className="dashboard perfil">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <form onSubmit={handleSubmit} className="dashboard__container_profile">
        <div className="dahsboard__profile to-left">
          <div className="dahsboard__logo">
            <h2>Mi perfil</h2>
            <div className="logo_flex">
              <div className="logo-container">
                {userData.logo ? (
                  <img src={userData.logo} alt="your-logo" />
                ) : (
                  <span>Seleccione una imagen</span>
                )}
              </div>
            </div>
            {disabled ? null : (
              <input
                type="file"
                name="file"
                accept="image/*"
                className="form-control"
                onChange={handleFile}
                required
              />
            )}
            <hr className="bar"></hr>
          </div>

          <div>
            <div className="profile_form">
              {/* RUC */}
              <div className="form-floating mb-3 ">
                <input
                  type="number"
                  className="form-control"
                  name="ruc"
                  disabled={disabled}
                  value={userData.ruc}
                  onChange={handleChange}
                required
                />
                <label className="floatingInput">RUC</label>
              </div>

              {/* BUSINESS NAME */}
              <div className="form-floating mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="businessName"
                  disabled={disabled}
                  value={userData.businessName}
                  onChange={handleChange}
                required
                />
                <label htmlFor="floatingInput">Razón Social</label>
              </div>

              {/* ADDRESS */}
              <div className="form-floating mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  disabled={disabled}
                  value={userData.address}
                  onChange={handleChange}
                required
                />
                <label htmlFor="floatingInput">Dirección</label>
              </div>

              {/* PHONE */}
              <div className="form-floating mb-3 ">
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  disabled={disabled}
                  value={userData.phone}
                  onChange={handleChange}
                required
                />
                <label htmlFor="floatingInput">Telefono</label>
              </div>

              {/* TRADE NAME */}
              <div className="form-floating mb-3 ">
                <input
                  type="tel"
                  className="form-control"
                  name="tradeName"
                  disabled={disabled}
                  value={userData.tradeName}
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
                  name="email"
                  disabled={disabled}
                  value={userData.email}
                  onChange={handleChange}
                required
                />
                <label htmlFor="floatingInput">Correo electronico</label>
              </div>

            </div>
              {/* PASSWORD */}
              {disabled ? null : (
                <button
                  className="btn btn-outline-success"
                  onClick={() =>{
                    dispatch(Alert("¿Seguro que quiere cambiar la contraseña?", handleChangePassword))
                  }}
                >
                  Cambiar contraseña
                </button>
              )}
            {disabled ? (
              <div className="profile-btn-container">
                <button
                  className="btn btn-primary"
                  onClick={handleDisabled}
                >
                  Modificar perfil
                </button>
              </div>
            ) : (
              <div className="profile-btn-container">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-success"
                  onClick={handleDisabled}
                >
                  Guardar
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "20px" }}
                  onClick={() => {handleDisabled(); setUser(initialState)}}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
