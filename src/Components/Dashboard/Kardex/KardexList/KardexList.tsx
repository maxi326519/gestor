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
import { Producto } from "../../../../models/productos";
import { usePDF } from "../../PDF/usePDF";
import { Establecimiento } from "../../../../models/establecimientos";

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
  const products = useSelector((state: RootState) => state.products);
  const stores = useSelector((state: RootState) => state.stores);
  const kardex = useKardex();
  const pdf = usePDF();
  const [rows, setRows] = useState<ReporteKardex[]>([]);
  const [filtroLocal, setfiltroLocal] = useState<string>("");
  const [filtroProducto, setFiltroProducto] = useState<string>("");

  useEffect(() => {
    setRows(
      kardex.listado.filter((kardex) => {
        if (filtroProducto !== "" && kardex.ITE_CODIGO !== filtroProducto)
          return false;
        if (filtroLocal !== "" && kardex.KDX_LOCAL.toString() !== filtroLocal)
          return false;
        return true;
      })
    );
  }, [kardex.listado, filtroProducto, filtroLocal]);

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

  function handleFiltrarPorProducto(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setFiltroProducto(event.target.value);
  }

  function handleFiltrarPorLocal(event: React.ChangeEvent<HTMLSelectElement>) {
    setfiltroLocal(event.target.value);
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

        {/*  PRODUCT FILTER */}
        <div className="form-floating">
          <select
            id="productFilter"
            className="form-select"
            value={filtroProducto}
            onChange={handleFiltrarPorProducto}
          >
            <option value="">Todos</option>
            {products.map((product: Producto) => (
              <option value={product.ITE_CODIGO}>
                {product.ITE_CODIGO} | {product.ITE_DESCRIPCION}
              </option>
            ))}
          </select>
          <label htmlFor="productFilter">Producto</label>
        </div>

        {/* LOCAL FILTER */}
        <div className="form-floating">
          <select
            id="localFilter"
            className="form-select"
            value={filtroLocal}
            onChange={handleFiltrarPorLocal}
          >
            <option value="">Todos</option>
            {stores.map((store: Establecimiento) => (
              <option value={store.LOC_ESTABLECIMIENTO}>
                {store.LOC_ESTABLECIMIENTO} | {store.LOC_NOMBRE}
              </option>
            ))}
          </select>
          <label htmlFor="localFilter">Local</label>
        </div>

        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() =>
            pdf.openKardexPDF(
              rows,
              filtroProducto,
              filtroLocal,
              `${filters.year}-${filters.month}-${filters.day}`
            )
          }
        >
          Exportar
        </button>
      </div>
      <div className="dashboardList__grid">
        <div className="kardex-card first-row">
          <span>Fecha</span>
          <span>Tipo</span>
          <span>Codigo de producto</span>
          <span>Descripcion del producto</span>
          <span>Local</span>
          <span>Cantidad</span>
          <span>Precio U.</span>
          <span>Saldo</span>
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
