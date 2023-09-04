import { Producto } from "../../../../../../models/productos";

import removeIcon from "../../../../../../assets/svg/remove.svg";
import Input from "../../../../../../component/Input";
import { ReporteKardex } from "../../../../../../models/kardex";

import styles from "./Row.module.css";

interface Props {
  product: Producto;
  kardex: ReporteKardex;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, productId: string) => void;
  handleRemove: (productId: string) => void;
}

export default function Row({ product, kardex, handleChange, handleRemove }: Props) {

  function handleLocaleChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleChange(event, product.ITE_CODIGO);
  }

  return (
    <div className={styles.row}>
      <span>{product.ITE_CODIGO}</span>
      <span>{product.ITE_DESCRIPCION}</span>
      <Input
        name="KDX_CANTIDAD"
        label="Cantidad"
        value={kardex.KDX_CANTIDAD}
        error=""
        handleChange={handleLocaleChange}
      />
      <Input
        name="KDX_COSTO"
        label="Cantidad"
        value={kardex.KDX_COSTO}
        error=""
        handleChange={handleLocaleChange}
      />
      <Input
        name="KDX_PUNITARIO"
        label="Cantidad"
        value={kardex.KDX_PUNITARIO}
        error=""
        handleChange={handleLocaleChange}
      />
      <button className="btn btn-danger" type="button" onClick={() => handleRemove(product.ITE_CODIGO)}>
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
