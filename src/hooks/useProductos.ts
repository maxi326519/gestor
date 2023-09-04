import { RootState } from "../models/RootState";
import { useDispatch, useSelector } from "react-redux";
import { Producto } from "../models/productos";
import { FacturaDetalle } from "../models/factura";
import { ReporteKardex } from "../models/kardex";
import {
  deleteProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "../redux/actions";
import swal from "sweetalert";

export interface UseProducto {
  listado: Producto[];
  agregar: (producto: Producto) => Promise<any>;
  obtener: () => Promise<any>;
  actualizar: (producto: Producto) => Promise<any>;
  borrar: (productoId: string) => Promise<any>;
  existencias: {
    agregar: (products: Producto[], kardex: ReporteKardex[]) => Promise<any>;
    vender: (facturaDetalle: FacturaDetalle[]) => Promise<any>;
  }
}

export default function useProducto(): UseProducto {
  const dispatch = useDispatch();
  const productos = useSelector((state: RootState) => state.stores);

  async function agregarProducto(producto: Producto) {
    return dispatch<any>(postProduct(producto)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el producto, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function obtenerProductos() {
    return dispatch<any>(getProducts()).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el producto, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function actualizarProducto(producto: any) {
    return dispatch<any>(updateProduct(producto)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el producto, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function borrarProducto(productoId: string) {
    return dispatch<any>(deleteProduct(productoId)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el producto, inténtelo mas tarde",
        "error"
      );
    });
  }

  async function agregarExistencias(products: Producto[], kardex: ReporteKardex[]) {
    // Convertimos los datos del detalle para actualizar el producto
  }

  async function venderExistencias(detalles: FacturaDetalle[]) {
    // Convertimos los datos del detalle para actualizar el producto
    const porductData = detalles.map((detalle) => ({
      ITE_CODIGO: detalle.ITE_CODIGO,
      ITE_CANTIDAD: detalle.ITE_CANTIDAD - detalle.VED_CANTIDAD,
    }));

    return Promise.all([
      ...porductData.map((producto) => actualizarProducto(producto)),
    ]);
  }

  /*   async function venderInventario(factura: Factura) {
    // Obtenemos los datos del producto a actualizar
    const productosActualizar: FacturaDetalle[] = factura.ITE_DETALLES.map(
      (detalle: FacturaDetalle): FacturaDetalle => {
        const proData: Producto = productos.find(
          (producto: Producto) => producto.ITE_CODIGO === detalle.ITE_CODIGO
        )!;
        return {
          ...proData,
          ITE_CODIGO: proData.ITE_CODIGO,
          VED_CANTIDAD: proData.VED_CANTIDAD - detalle.VED_CANTIDAD,
        };
      }
    );

    // Guardamos en la base de datos el nuevo movimiento y actualizamos el producto
    return Promise.all([
      movimientos.actions.crearMovimientoDeVenta(factura),
      actualizarVariosProductos(productosActualizar),
    ]);
  } */

  return {
    listado: productos,
    agregar: agregarProducto,
    obtener: obtenerProductos,
    actualizar: actualizarProducto,
    borrar: borrarProducto,
    existencias: {
      agregar: agregarExistencias,
      vender: venderExistencias
    }
  };
}
