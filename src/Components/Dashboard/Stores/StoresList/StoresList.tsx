import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../redux/actions";
import { RootState } from "../../../../models/RootState";
import { Establecimiento } from "../../../../models/establecimientos";
import useEstablecimiento, {
  UseEstablecimiento,
} from "../../../../hooks/useEstablecimiento";
import swal from "sweetalert";

import StoresRow from "./StoresRow/StoresRow";

import addSquare from "../../../../assets/svg/add-square.svg";
import logout from "../../../../assets/svg/logout.svg";

interface Props {
  handleAddProduct: () => void;
  handleProfile: () => void;
}

export default function StoresList({ handleAddProduct, handleProfile }: Props) {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userDB);
  const { establecimientos, actions }: UseEstablecimiento =
    useEstablecimiento();
  const [rows, setRows] = useState<Establecimiento[]>([]);

  useEffect(() => setRows(establecimientos), [establecimientos]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      establecimientos.filter((establecimiento) => {
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

  return (
    <div className="dashboardList">
      <div className="perfil">
        <h3>Listado de establecimientos</h3>
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
          placeholder="Buscar producto"
          onChange={handleChange}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleAddProduct}
        >
          <img src={addSquare} alt="add stores" />
          <span>Establecimiento</span>
        </button>
      </div>
      <div className="dashboardList__grid">
        <div className="item-card first-row">
          <span>Establecimiento</span>
          <span>Nombre</span>
          <span>Numero</span>
          <span>Pto. Emision</span>
          <span>Telefono</span>
          <span>Estado</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay establecimientos</span>
            </div>
          ) : (
            rows?.map((store: Establecimiento) => (
              <StoresRow
                key={store.LOC_ESTABLECIMIENTO}
                establecimiento={store}
                handleUpdate={actions.actualizar}
                handleRemove={actions.borrar}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
