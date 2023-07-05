import { MovCabecera } from "../../../../../models/movements";

import "./MovementsRow.css";
import viewSvg from "../../../.././../assets/svg/view.svg";

interface Props {
  movimiento: MovCabecera;
  handleVerDetalles: () => void;
}

export default function MovementsRow({ movimiento, handleVerDetalles }: Props) {
  return (
    <div key={movimiento.MCA_CODIGO} className="product-card">
      <span>{movimiento.MCA_CODIGO}</span>
      <span>{movimiento.MCA_FECHA}</span>
      <span>{movimiento.MCA_ESTADO}</span>
      <span>{movimiento.MCA_MOVIMIENTO}</span>
      <span>{movimiento.MCA_OBSERVACIONES}</span>
      <span>{movimiento.MCA_TIPO}</span>
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
