import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../redux/actions";
import { RootState } from "../../../../models/RootState";
import { MovCabecera } from "../../../../models/movements";
import swal from "sweetalert";

import MovementsRow from "./MovementsRow/MovementsRow";

import logout from "../../../../assets/svg/logout.svg";
import useMovimientos from "../../../../hooks/useMovimientos";

interface Props {
  handleProfile: () => void;
}

export default function MovementsList({ handleProfile }: Props) {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userDB);
  const { movimientos, actions } = useMovimientos();
  const [rows, setRows] = useState([]);

  useEffect(() => setRows(movimientos), [movimientos]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      movimientos.filter((movement) => {
        if (value === "") return true;
        return false;
      })
    );
  }

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
        dispatch<any>(logOut())
          .then(() => {
            redirect("/login");
          })
          .catch((e: Error) => {
            console.log(e.message);
          });
      }
    });
  }

  function handleVerDetalles() {}

  return (
    <div className="dashboardList">
      <div className="perfil">
        <h3>Movimientos</h3>
        <button
          className="btn btn-primary btn-sesion"
          type="button"
          onClick={handleLogOut}
        >
          <img src={logout} alt="logout" />
        </button>
        <button type="button" onClick={handleProfile}>
          <img src={user.EMP_LOGO} alt="logo" />
        </button>
      </div>
      <div className="dashboardList__searchBar">
        <input
          className="form-control"
          placeholder="Buscar movemente"
          onChange={handleChange}
        />
      </div>
      <div className="dashboardList__grid">
        <div className="product-card first-row">
          <span>Codigo</span>
          <span>Fecha</span>
          <span>Estado</span>
          <span>Movimiento</span>
          <span>Observaciones</span>
          <span>Tipo</span>
          <span>Detalles</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay movimientos</span>
            </div>
          ) : (
            rows?.map((movimiento: MovCabecera) => (
              <MovementsRow
                key={movimiento.MCA_CODIGO}
                movimiento={movimiento}
                handleVerDetalles={handleVerDetalles}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
