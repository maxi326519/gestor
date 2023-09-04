import { Producto } from "../../../../../models/productos";
import { ReporteKardex } from "../../../../../models/kardex";
import Row from "./Row/Row";

interface Props {
  products: Producto[];
  kardex: ReporteKardex[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, productId: string) => void;
  handleRemove: (productId: string) => void;
}

export default function Table({ products, kardex, handleChange, handleRemove }: Props) {

  return (
    <div className="dashboardList__grid">
      <div className="product-card first-row">
        <span>Codigo</span>
        <span>Descripcion</span>
        <span>Tipo</span>
        <span>Precio</span>
        <span>Impuesto</span>
        <span>Impuesto</span>
        <span>Editar</span>
        <span>Eliminar</span>
      </div>
      <div className="contentCard">
        {products.length <= 0 ? (
          <div className="listEmpty">
            <span>No hay productos</span>
          </div>
        ) : (
          products?.map((product) => (
            <Row
              key={product.ITE_CODIGO}
              product={product}
              kardex={kardex.find((kardex) => kardex.ITE_CODIGO === product.ITE_CODIGO)!}
              handleChange={handleChange}
              handleRemove={handleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}
