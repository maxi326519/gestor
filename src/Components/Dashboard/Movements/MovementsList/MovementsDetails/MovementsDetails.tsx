import { useSelector } from "react-redux";
import { RootState } from "../../../../../models/RootState";
import { MovDetalle } from "../../../../../models/movements";
import { Producto } from "../../../../../models/productos";

import styles from "./MovementsDetails.module.css";

interface Props {
  details: MovDetalle[];
  handleClose: () => void;
}

export default function MovementsDetails({ details, handleClose }: Props) {
  const productos = useSelector((state: RootState) => state.products);

  return (
    <div className={styles.background}>
      <div className={`${styles.container} to-left`}>
        <div className={styles.close}>
          <h2>Detalles del movimiento</h2>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <div className={styles.table}>
          <div className={`${styles.row} ${styles.first}`}>
            <span>Código</span>
            <span>Descripción</span>
            <span>Cantidad</span>
            <span>Precio U.</span>
          </div>
          <div className={styles.flex}>
            {details.map((detail) => (
              <div className={styles.row}>
                <span>{detail.ITE_CODIGO}</span>
                <span>
                  {
                    productos.find(
                      (producto: Producto) =>
                        producto.ITE_CODIGO ===
                        detail.ITE_CODIGO
                    )?.ITE_DESCRIPCION
                  }
                </span>
                <span>{detail.MDE_CANTIDAD}</span>
                <span>{detail.MDE_PRECIO}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
