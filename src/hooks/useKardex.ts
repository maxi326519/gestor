import swal from "sweetalert";
import { RootState } from "../models/RootState";
import { useDispatch, useSelector } from "react-redux";
import { ReporteKardex } from "../models/kardex";
import {
  deleteKardex,
  getKardexs,
  postKardex,
  updateKardex,
} from "../redux/actions/kardex/index";

export interface UseReporteKardex {
  kardexList: ReporteKardex[];
  actions: {
    agregar: (kardex: ReporteKardex) => Promise<any>;
    obtener: (
      year: string,
      month: string | null,
      day: string | null
    ) => Promise<any>;
    actualizar: (kardex: ReporteKardex) => Promise<any>;
    borrar: (kardexId: string, kardexDate: string) => Promise<any>;
  };
}

export default function useReporteKardex(): UseReporteKardex {
  const dispatch = useDispatch();
  const kardexList = useSelector((state: RootState) => state.stores);

  async function agregarKardex(kardex: ReporteKardex) {
    return dispatch<any>(postKardex(kardex)).catch((e: Error) => {
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

  return {
    kardexList,
    actions: {
      agregar: agregarKardex,
      obtener: obtenerKardex,
      actualizar: actualizarKardex,
      borrar: borrarKardex,
    },
  };
}
