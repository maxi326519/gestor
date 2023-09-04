import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../models/RootState";
import { Factura, FacturaDetalle } from "../models/factura";
import { push, ref } from "firebase/database";
import { auth, db } from "../firebase";
import { postInvoice } from "../redux/actions";
import { TipoDeMovimiento } from "../models/movements";
/* import useProducto from "./useProductos"; */
import useReporteKardex from "./useKardex";

export default function useInvoice() {
  const dispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoices);
  /*   const productos = useProducto(); */
  const useKardex = useReporteKardex();

  function cargarFacturaDeVenta(factura: Factura) {
    // Creamos la factura
    const facturaActual: Factura = {
      ...factura,
      VEN_CODIGO: createInvoiceKey(factura),
    };

    // Creamos los kardex y agregamos la key al detalle
    const kardex = facturaActual.ITE_DETALLES.map((detalle: FacturaDetalle) => {
      const newkardex = useKardex.crear(detalle, facturaActual, TipoDeMovimiento.EGRESO);
      detalle.KDX_CODIGO = newkardex.KDX_CODIGO;
      return newkardex;
    })

    // Subimos todos los datos
    return Promise.all([
      dispatch<any>(postInvoice(facturaActual)),
      /*       productos.actualizarExistencias(facturaActual.ITE_DETALLES), */
      useKardex.agregar(kardex)
    ]);
  }

  function createInvoiceKey(invoice: Factura): string {
    const date = invoice.VEN_FECHA.split("-");
    const year = date[0];
    const month = date[1];
    return push(
      ref(db, `users/${auth.currentUser!.uid}/invoices/${year}/${month}`)
    ).key!;
  }

  return {
    listado: invoices,
    cargarFacturaDeVenta,
  };
}
