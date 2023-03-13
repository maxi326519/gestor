import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../redux/actions";

import logout from "../../../../assets/svg/logout.svg";

export default function Buttons({ disabled, handleDisabled, handleProfile}) {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  function handleLogOut() {
    dispatch(logOut())
      .then(() => {
        redirect("/login");
        handleProfile();
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <div className="profile-btn-back">
      {disabled ? (
        <div className="profile-btn-container">
          <button className="btn btn-primary" onClick={handleDisabled}>
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
            onClick={() => {
              handleDisabled();
              /*               setUser(user); */
            }}
          >
            Cancelar
          </button>
        </div>
      )}
      <button className="btn btn-primary btn-sesion" onClick={handleLogOut}>
        <img  src={logout} alt="logout" />
        <span>
          Cerrar sesión
        </span>
      </button>
    </div>
  );
}
