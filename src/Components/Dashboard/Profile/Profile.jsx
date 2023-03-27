import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserData,
  openLoading,
  closeLoading,
  uploadLogo,
  uploadFile,
} from "../../../redux/actions";

import DatosPersonales from "./PersonalData/PersonalData";
import Obligations from "./Obligations/Obligations";

import "../Dashboard.css";
import "./Profile.css";
import Invoicing from "./Invoicing/Invoicing";
import Buttons from "./Buttons/Buttons";
import ProfileLogo from "./ProfileLogo/ProfileLogo";
import swal from "sweetalert";

export default function Profile({ handleProfile }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDB);
  const [userData, setUser] = useState({});
  const [logo, setLogo] = useState(null);
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [type, setType] = useState("password");

  useEffect(() => {
    setUser(user);
  }, [user]);

  function handleChange(e) {
    console.log("Change:", e.target.name);
    if (
      e.target.name === "EMP_ESTABLECIMIENTO" ||
      e.target.name === "EMP_PTOEMISION" ||
      e.target.name === "EMP_NUMERO"
    ) {
      if (
        (e.target.name === "EMP_ESTABLECIMIENTO" &&
          e.target.value <= 999 &&
          e.target.value.length <= 3) ||
        (e.target.name === "EMP_PTOEMISION" &&
          e.target.value <= 999 &&
          e.target.value.length <= 3) ||
        (e.target.name === "EMP_NUMERO" &&
          e.target.value <= 999999999 &&
          e.target.value.length <= 9)
      ) {
        console.log("asdasd");
        setUser({ ...userData, [e.target.name]: e.target.value });
      }
    } else {
      setUser({ ...userData, [e.target.name]: e.target.value });
    }
  }

  function handleCheck(e) {
    setUser({
      ...userData,
      [e.target.name]: e.target.checked,
    });
  }

  function handleSelect(e) {
    setUser({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());

    let urls = {};

    if (logo) {
      const logoURL = await dispatch(uploadLogo(logo));
      urls = { EMP_LOGO: logoURL.payload };
      setFile(null);
    }

    if (file) {
      const fileURL = await dispatch(uploadFile(file));
      urls = { ...urls, EMP_ARCHIVO: fileURL.payload };
      setLogo(null);
    }

    const newData = { ...userData, ...urls };

    dispatch(openLoading());
    dispatch(updateUserData(newData))
      .then(() => {
        dispatch(closeLoading());
        swal("Guardado", "¡Perfil actualizado exitosamente!", "success");
      })
      .catch((e) => {
        dispatch(closeLoading());
        swal(
          "Error",
          "No se pudo actualizar los datos de tu perfil, intentalo mas tarde",
          "error"
        );
        console.log(e.message);
      });
  }

  function handleShowPassword() {
    console.log("Show password:", type);
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  }

  function handleLogo(event) {
    const logo = event.target.files[0];
    if (logo) {
      setLogo(logo);
    }
  }

  function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
      setLogo(file);
    }
  }

  function handleDisabled() {
    setDisabled(!disabled);
    setType("password");
    setLogo(null);
    setFile(null);
  }

  function handleCancel() {
    handleDisabled();
    setUser(user);
    setType("password");
  }

  return (
    <div className="dashboard_profile">
      <form onSubmit={handleSubmit} className="profile">
        <div className="close-button" onClick={handleProfile}>
          <h2>Mi perfil</h2>
          <button className="btn btn-danger close" type="button">
            x
          </button>
        </div>
        <div className="profile-top-container">
          <div className="left-content">
            <ProfileLogo
              logo={logo}
              userData={userData}
              disabled={disabled}
              handleChange={handleChange}
              handleLogo={handleLogo}
            />
          </div>

          <DatosPersonales
            disabled={disabled}
            userData={userData}
            handleChange={handleChange}
          />
        </div>

        <div className="profile-bottom-container">
          <Obligations
            disabled={disabled}
            userData={userData}
            handleChange={handleCheck}
            handleSelect={handleSelect}
          />
          <Invoicing
            disabled={disabled}
            userData={userData}
            handleChange={handleChange}
            type={type}
            handleShowPassword={handleShowPassword}
            handleFile={handleFile}
          />
        </div>
        <Buttons
          disabled={disabled}
          handleDisabled={handleDisabled}
          handleProfile={handleProfile}
          handleCancel={handleCancel}
        />
      </form>
    </div>
  );
}
