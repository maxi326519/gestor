import swal from "sweetalert";
import { RootState } from "../models/RootState";
import { useDispatch, useSelector } from "react-redux";
import { Establecimiento } from "../models/establecimientos";
import {
  deleteStore,
  getStores,
  setStore,
  updateStore,
} from "../redux/actions/stores/index";

export interface UseEstablecimiento {
  establecimientos: Establecimiento[];
  actions: {
    agregar: (establecimiento: Establecimiento) => Promise<any>;
    obtener: () => Promise<any>;
    actualizar: (establecimiento: Establecimiento) => Promise<any>;
    borrar: (establecimientoId: string) => Promise<any>;
  };
}

export default function useEstablecimiento(): UseEstablecimiento {
  const dispatch = useDispatch();
  const establecimientos = useSelector((state: RootState) => state.stores);

  async function agregarEstableciiento(establecimiento: Establecimiento) {
    return dispatch<any>(setStore(establecimiento)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el establecimiento, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function obtenerEstableciientos() {
    return dispatch<any>(getStores()).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el establecimiento, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function actualizarEstableciiento(establecimiento: Establecimiento) {
    return dispatch<any>(updateStore(establecimiento)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el establecimiento, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function borrarEstableciiento(establecimientoId: string) {
    return dispatch<any>(deleteStore(establecimientoId)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el establecimiento, inténtelo mas tarde",
        "error"
      );
    });
  }

  return {
    establecimientos,
    actions: {
      agregar: agregarEstableciiento,
      obtener: obtenerEstableciientos,
      actualizar: actualizarEstableciiento,
      borrar: borrarEstableciiento,
    },
  };
}
