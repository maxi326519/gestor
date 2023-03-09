import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserData,
  openLoading,
  closeLoading,
} from "../../../redux/actions";

import DatosPersonales from "./PersonalData/PersonalData";
import Obligations from "./Obligations/Obligations";

import "../Dashboard.css";
import "./Profile.css";
import Invoicing from "./Invoicing/Invoicing";
import Buttons from "./Buttons/Buttons";
import ProfileLogo from "./ProfileLogo/ProfileLogo";

export default function Profile({ handleProfile }) {
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
        /*         toast.success("¡Perfil actualizado exitosamente!"); */
      })
      .catch((e) => {
        dispatch(closeLoading());
        /*         toast.error(e.message); */
        console.log(e.message);
      });
  }

  function handleDisabled() {
    setDisabled(!disabled);
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
              userData={userData}
              disabled={disabled}
              handleChange={handleChange}
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
            handleChange={handleChange}
          />
          <Invoicing
            disabled={disabled}
            userData={userData}
            handleChange={handleChange}
          />
        </div>
        <Buttons disabled={disabled} handleDisabled={handleDisabled} />
      </form>
    </div>
  );
}
