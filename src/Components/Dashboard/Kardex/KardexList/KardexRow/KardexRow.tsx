import { ReporteKardex } from "../../../../../models/kardex";

import "./KardexRow.css";
import viewSvg from "../../../.././../assets/svg/view.svg";
import { RootState } from "../../../../../models/RootState";
import { useSelector } from "react-redux";

interface Props {
  kardex: ReporteKardex;
  handleVerDetalles: () => void;
}

export default function KardexRow({ kardex, handleVerDetalles }: Props) {
  const products = useSelector((state: RootState) => state.products);
  return (
    <div key={kardex.KDX_CODIGO} className="kardex-card">
      <span>{kardex.KDX_REGISTRO}</span>
      <span>{kardex.KDX_TIPO}</span>
      <span>{kardex.ITE_CODIGO}</span>
      <span>
        {
          products.find((product) => kardex.ITE_CODIGO === product.ITE_CODIGO)
            ?.ITE_DESCRIPCION
        }
      </span>
      <span>{kardex.KDX_LOCAL}</span>
      <span>{kardex.KDX_CANTIDAD} u.</span>
      <span>$ {Number(kardex.KDX_PUNITARIO).toFixed(2)}</span>
      <span>$ {Number(kardex.KDX_SALDO).toFixed(2)}</span>
    </div>
  );
}
