import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../redux/actions";

import logout from "../../../../assets/svg/logout.svg";
import swal from "sweetalert";

export default function Buttons({
  disabled,
  handleDisabled,
  handleProfile,
  handleCancel,
}) {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  function handleLogOut() {
    swal({
      text: "¿Seguro que desea cerrar sesión?",
      icon: "warning",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(logOut())
          .then(() => {
            redirect("/login");
            handleProfile();
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    });
  }

  return (
    <div className="profile-btn-back">
      {disabled ? (
        <div className="profile-btn-container">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleDisabled}
          >
            Modificar perfil
          </button>
        </div>
      ) : (
        <div className="profile-btn-container">
          <button
            className="btn btn-danger"
            type="button"
            style={{ marginRight: "20px" }}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button id="submit" type="submit" className="btn btn-success">
            Guardar
          </button>
        </div>
      )}
      <button
        className="btn btn-primary btn-sesion"
        type="button"
        onClick={handleLogOut}
      >
        <img src={logout} alt="logout" />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
}
