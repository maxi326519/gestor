import { MovCabecera } from "../../../../../models/reportes";

import "./ReportsRow.css";
import viewSvg from "../../../.././../assets/svg/view.svg";

interface Props {
  movReport: MovCabecera;
  handleVerDetalles: () => void;
}

export default function ReportsRow({ movReport, handleVerDetalles }: Props) {
  return (
    <div key={movReport.MCA_CODIGO} className="product-card">
      <span>{movReport.MCA_CODIGO}</span>
      <span>{movReport.MCA_FECHA}</span>
      <span>{movReport.MCA_ESTADO}</span>
      <span>{movReport.MCA_MOVIMIENTO}</span>
      <span>{movReport.MCA_OBSERVACIONES}</span>
      <span>{movReport.MCA_TIPO}</span>
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
