import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserData,
  uploadLogo,
  changePassword,
  openLoading,
  closeLoading,
  Alert,
} from "../../../redux/actions";
import { toast } from "react-toastify";

import SideBar from "../SideBar/SideBar";
import DatosPersonales from "./PersonalData/PersonalData";
import Obligations from "./Obligations/Obligations";

import "../Dashboard.css";
import "./Profile.css";
import Invoicing from "./Invoicing/Invoicing";
import Buttons from "./Buttons/Buttons";
import ProfileLogo from "./ProfileLogo/ProfileLogo";

export default function Profile({
  handleAddInvoice,
  handleAddProduct,
  handleAddClient,
}) {
  const user = useSelector((state) => state.user.userDB);
  const [userData, setUser] = useState({});
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(user);
  }, [user]);

  function handleChange(e) {
    setUser({ ...userData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    /*     dispatch(uploadLogo(file)); */

    dispatch(openLoading());
    dispatch(updateUserData(userData))
      .then(() => {
        dispatch(closeLoading());
        toast.success("¡Perfil actualizado exitosamente!");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error(e.message);
        console.log(e.message);
      });
  }

  function handleDisabled() {
    setDisabled(!disabled);
  }

  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <div className="dashboard_profile">
        <form onSubmit={handleSubmit} className="profile">
          <h2>Mi perfil</h2>
          <div className="profile-container">
            <div className="left-content">
              <ProfileLogo
                userData={userData}
                disabled={disabled}
                handleChange={handleChange}
              />

              <Obligations
                disabled={disabled}
                userData={userData}
                handleChange={handleChange}
              />
            </div>

            <DatosPersonales
              disabled={disabled}
              userData={userData}
              handleChange={handleChange}
            />
          </div>
          
          <Invoicing
            disabled={disabled}
            userData={userData}
            handleChange={handleChange}
          />
          <Buttons disabled={disabled} handleDisabled={handleDisabled} />
        </form>
      </div>
    </div>
  );
}
