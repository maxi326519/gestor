import { ReporteKardex } from "../../../../../models/kardex";

import "./KardexRow.css";
import viewSvg from "../../../.././../assets/svg/view.svg";

interface Props {
  kardex: ReporteKardex;
  handleVerDetalles: () => void;
}

export default function KardexRow({ kardex, handleVerDetalles }: Props) {
  return (
    <div key={kardex.KDX_CODIGO} className="kardex-card">
      <span>{kardex.KDX_REGISTRO}</span>
      <span>{kardex.KDX_TIPO}</span>
      <span>{kardex.KDX_DOCUMENTO}</span>
      <span>{kardex.ITE_CODIGO}</span>
      <span>{kardex.KDX_LOCAL}</span>
      <span>{kardex.KDX_CANTIDAD}</span>
      <span>{kardex.KDX_PUNITARIO}</span>
      <span>{kardex.KDX_SALDO}</span>
      <span>{kardex.KDX_COSTO}</span>
      <span>{kardex.KDX_DESCRIPCION}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={handleVerDetalles}
      >
        <img src={viewSvg} alt="view" />
      </button>
    </div>
  );
}
