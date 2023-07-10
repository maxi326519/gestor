import { MovCabecera, MovDetalle } from "../../../../../models/movements";

import "./MovementsRow.css";
import viewSvg from "../../../.././../assets/svg/view.svg";

interface Props {
  movimiento: MovCabecera;
  handleVerDetalles: (movimiento: MovCabecera) => void;
}

export default function MovementsRow({ movimiento, handleVerDetalles }: Props) {
  return (
    <div key={movimiento.MCA_CODIGO} className="movement-card">
      <span>{movimiento.MCA_FECHA}</span>
      <span>{movimiento.MCA_TIPO}</span>
      <span>{movimiento.MCA_DETALLES.length}</span>
      <span>
        {`${movimiento.MCA_DETALLES.reduce(
          (acumulador: number, producto: MovDetalle) =>
            acumulador + Number(producto.MDE_CANTIDAD),
          0
        )}`}
      </span>
      <span>
        {`$ ${movimiento.MCA_DETALLES.reduce(
          (acumulador: number, producto: MovDetalle) =>
            acumulador + Number(producto.MDE_CANTIDAD * producto.MDE_PRECIO),
          0
        ).toFixed(2)}`}
      </span>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleVerDetalles(movimiento)}
      >
        <img src={viewSvg} alt="view" />
      </button>
    </div>
  );
}
