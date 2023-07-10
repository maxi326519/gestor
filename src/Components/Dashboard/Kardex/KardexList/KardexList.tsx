import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeLoading, logOut, openLoading } from "../../../../redux/actions";
import { RootState } from "../../../../models/RootState";
import { ReporteKardex } from "../../../../models/kardex";
import swal from "sweetalert";

import KardexRow from "./KardexRow/KardexRow";
import DateFilter from "../../../../component/DateFilter/DateFilter";
import useKardex from "../../../../hooks/useKardex";

import logout from "../../../../assets/svg/logout.svg";

interface Filter {
  year: string;
  month: string | null;
  day: string | null;
}

interface Props {
  handleProfile: () => void;
}

export default function KardexList({ handleProfile }: Props) {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userDB);
  const filters = useSelector((state: RootState) => state.kardex.filters);
  const kardex = useKardex();
  const [rows, setRows] = useState<ReporteKardex[]>([]);

  useEffect(() => {
    if (kardex.listado.length <= 0)
      kardex.obtener(filters.year, filters.month, filters.day);
  }, []);

  useEffect(() => setRows(kardex.listado), [kardex]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setRows(
      kardex.listado.filter((kardex) => {
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

  function handleObtenerKardex(filter: Filter) {
    dispatch<any>(openLoading());
    kardex
      .obtener(filter.year, filter.month, filter.day)
      .then(() => dispatch<any>(closeLoading()));
  }

  return (
    <div className="dashboardList">
      <div className="perfil">
        <h3>Kardex</h3>
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
          placeholder="Buscar kardex"
          onChange={handleChange}
        />
        <DateFilter years={[2023]} handleFilterDate={handleObtenerKardex} />
      </div>
      <div className="dashboardList__grid">
        <div className="kardex-card first-row">
          <span>Fecha</span>
          <span>Tipo</span>
          <span>Documento</span>
          <span>Codigo de kardexo</span>
          <span>Local</span>
          <span>Cantidad</span>
          <span>Precio unitario</span>
          <span>Saldo</span>
          <span>Costo</span>
          <span>Descripcion</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay kardexs</span>
            </div>
          ) : (
            rows?.map((kardex: ReporteKardex) => (
              <KardexRow
                key={kardex.KDX_CODIGO}
                kardex={kardex}
                handleVerDetalles={handleVerDetalles}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
