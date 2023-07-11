import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeLoading, logOut, openLoading } from "../../../../redux/actions";
import { RootState } from "../../../../models/RootState";
import { MovCabecera, MovDetalle } from "../../../../models/movements";
import useMovimientos from "../../../../hooks/useMovimientos";
import swal from "sweetalert";

import MovementsRow from "./MovementsRow/MovementsRow";
import DateFilter from "../../../../component/DateFilter/DateFilter";

import logout from "../../../../assets/svg/logout.svg";
import MovementsDetails from "./MovementsDetails/MovementsDetails";

interface Filter {
  year: string;
  month: string | null;
  day: string | null;
}
interface Props {
  handleProfile: () => void;
}

export default function MovementsList({ handleProfile }: Props) {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userDB);
  const filters = useSelector((state: RootState) => state.movements.filter);
  const movimientos = useMovimientos();
  const [rows, setRows] = useState<MovCabecera[]>([]);
  const [detalles, setDetalles] = useState<MovDetalle[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const yearList: string[] = [];
    let currentYear = new Date().getFullYear() - 30;
    for (let i = 0; i <= 30; i++) {
      yearList.push((currentYear + i).toString());
    }
    setYears(yearList.sort());
  }, []);
  useEffect(() => setRows(movimientos.data), [movimientos]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      movimientos.data.filter((movement) => {
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

  function handleObtenerMovimientos(filter: Filter) {
    dispatch<any>(openLoading());
    movimientos
      .obtener(filter.year, filter.month, filter.day)
      .then(() => dispatch<any>(closeLoading()));
  }

  function handleVerDetalles(movimiento: MovCabecera) {
    setDetalles(movimiento.MCA_DETALLES);
  }

  function handleCerrarDetalles() {
    setDetalles([]);
  }

  return (
    <div className="dashboardList">
      {detalles.length > 0 && (
        <MovementsDetails
          details={detalles}
          handleClose={handleCerrarDetalles}
        />
      )}
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
          placeholder="Buscar movimient"
          onChange={handleChange}
        />
        <DateFilter years={years} handleFilterDate={handleObtenerMovimientos} />
      </div>
      <div className="dashboardList__grid">
        <div className="movement-card first-row">
          <span>Fecha</span>
          <span>Tipo</span>
          <span>Productos</span>
          <span>Cantidad items</span>
          <span>Monto</span>
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
