import { RootState } from "../models/RootState";
import { useDispatch, useSelector } from "react-redux";
import {
  KdxFGenerado,
  ReporteKardex,
  initReporteKardex,
} from "../models/kardex";
import { auth, db } from "../firebase";
import { push, ref } from "firebase/database";
import { MovCabecera } from "../models/movements";
import {
  deleteKardex,
  getKardexs,
  postKardex,
  updateKardex,
} from "../redux/actions/kardex/index";
import swal from "sweetalert";

export interface UseReporteKardex {
  listado: ReporteKardex[];
  agregar: (movimiento: MovCabecera) => Promise<any>;
  obtener: (
    year: string,
    month: string | null,
    day: string | null
  ) => Promise<any>;
  actualizar: (kardex: ReporteKardex) => Promise<any>;
  borrar: (kardexId: string, kardexDate: string) => Promise<any>;
}

export default function useReporteKardex(): UseReporteKardex {
  const dispatch = useDispatch();
  const kardexList = useSelector((state: RootState) => state.stores);

  async function agregarKardex(movimiento: MovCabecera) {
    const kardexList: ReporteKardex[] = movimiento.MCA_DETALLES.map(
      (detalle): ReporteKardex => {
        return {
          ...initReporteKardex,
          MOV_CODIGO: movimiento.MCA_CODIGO,
          KDX_CODIGO: createKardexKey(movimiento.MCA_FECHA),
          KDX_TIPO: movimiento.MCA_TIPO,
          KDX_GENERADO: KdxFGenerado.FACTURACION,
          KDX_REGISTRO: movimiento.MCA_FECHA,
          ITE_CODIGO: detalle.ITE_CODIGO,
          LOT_CODIGO: detalle.MDE_LOTE,
          KDX_LOCAL: movimiento.LOC_CODIGO,
          KDX_CANTIDAD: detalle.MDE_CANTIDAD,
          KDX_PUNITARIO: detalle.MDE_PRECIO,
          KDX_COSTO: detalle.MDE_OCOSTOS,
        };
      }
    );

    return Promise.all([
      ...kardexList.map((kardex) => dispatch<any>(postKardex(kardex))),
    ]).catch((e: Error) => {
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
      swal("Error", "Error al agregar el kardex, inténtelo mas tarde", "error");
    });
  }
  async function actualizarKardex(kardex: ReporteKardex) {
    return dispatch<any>(updateKardex(kardex)).catch((e: Error) => {
      console.log(e.message);
      swal("Error", "Error al agregar el kardex, inténtelo mas tarde", "error");
    });
  }
  async function borrarKardex(kardexId: string, kardexDate: string) {
    return dispatch<any>(deleteKardex(kardexId, kardexDate)).catch(
      (e: Error) => {
        console.log(e.message);
        swal(
          "Error",
          "Error al agregar el kardex, inténtelo mas tarde",
          "error"
        );
      }
    );
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
    agregar: agregarKardex,
    obtener: obtenerKardex,
    actualizar: actualizarKardex,
    borrar: borrarKardex,
  };
}
