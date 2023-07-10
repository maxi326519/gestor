import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../models/RootState";
import { Factura } from "../models/factura";
import { MovCabecera } from "../models/movements";
import useMovimientos from "./useMovimientos";
import useProducto from "./useProductos";
import { push, ref } from "firebase/database";
import { auth, db } from "../firebase";
import { postInvoice } from "../redux/actions";

export default function useInvoice() {
  const dispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoices);
  const productos = useProducto();
  const movimientos = useMovimientos();

  function cargarFacturaDeVenta(factura: Factura) {
    const facturaActual: Factura = {
      ...factura,
      VEN_CODIGO: createInvoiceKey(factura),
    };

    // Convertimos la factura en un movimiento
    const movimientosData: MovCabecera =
      movimientos.facturaAMovimientos(facturaActual);

    return Promise.all([
      dispatch<any>(postInvoice(facturaActual)),
      productos.actualizarExistencias(facturaActual.ITE_DETALLES),
      movimientos.agregar(movimientosData),
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
