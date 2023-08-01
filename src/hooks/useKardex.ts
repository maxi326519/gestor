import { RootState } from "../models/RootState";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { push, ref } from "firebase/database";
import { TipoDeMovimiento } from "../models/movements";
import { Factura, FacturaDetalle } from "../models/factura";
import {
  deleteKardex,
  getKardexs,
  postKardex,
  updateKardex,
} from "../redux/actions/kardex/index";
import {
  KdxGenerado,
  ReporteKardex,
  initReporteKardex,
} from "../models/kardex";
import swal from "sweetalert";

export default function useReporteKardex() {
  const dispatch = useDispatch();
  const kardexList = useSelector((state: RootState) => state.kardex.data);

  async function agregarKardex(listaKardex: ReporteKardex[]) {

    return dispatch<any>(postKardex(listaKardex))
      .catch((e: Error) => {
        console.log(e.message);
        swal("Error", "Error al agregar el kardex, inténtelo mas tarde", "error");
      });
  }

  async function obtenerKardex(
    year: string,
    month: string | null,
    day: string | null
  ) {
    return dispatch<any>(getKardexs(year, month, day)).catch((e: Error) => {
      console.log(e.message);
      swal("Error", "Error al obtener el kardex, inténtelo mas tarde", "error");
    });
  }
  async function actualizarKardex(kardex: ReporteKardex) {
    return dispatch<any>(updateKardex(kardex)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al actualizar el kardex, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function borrarKardex(kardexId: string, kardexDate: string) {
    return dispatch<any>(deleteKardex(kardexId, kardexDate)).catch(
      (e: Error) => {
        console.log(e.message);
        swal(
          "Error",
          "Error al borrar el kardex, inténtelo mas tarde",
          "error"
        );
      }
    );
  }

  function crearKardex(detalle: FacturaDetalle, factura: Factura, tipo: TipoDeMovimiento) {
    return {
      ...initReporteKardex,
      KDX_CODIGO: createKardexKey(factura.VEN_FECHA),
      KDX_TIPO: tipo,
      MCA_MOVIMIENTO: 0,
      KDX_ID_DOCUMENTO: factura.VEN_CODIGO,
      KDX_GENERADO: KdxGenerado.VENTA,
      KDX_FECHA: factura.VEN_FECHA,
      ITE_CODIGO: detalle.ITE_CODIGO,
      KDX_LOCAL: factura.LOC_CODIGO,
      KDX_DESCRIPCION: detalle.ITE_DESCRIPCION,
      KDX_CANTIDAD: detalle.ITE_CANTIDAD,
      KDX_PUNITARIO: detalle.VED_PUNITARIO,
      KDX_SALDO: detalle.ITE_CANTIDAD * detalle.VED_PUNITARIO,
      KDX_COSTO: 0,
      KDX_USUKEY: auth.currentUser!.uid,
    };
  }

  function createKardexKey(fecha: string): string {
    const date = fecha.split("-");
    const year = date[0];
    const month = date[1];
    return push(
      ref(db, `users/${auth.currentUser!.uid}/kardex/${year}/${month}`)
    ).key!;
  }

  return {
    listado: kardexList,
    crear: crearKardex,
    agregar: agregarKardex,
    obtener: obtenerKardex,
    actualizar: actualizarKardex,
    borrar: borrarKardex,
    createKey: createKardexKey,
  };
}
