import swal from "sweetalert";
import { RootState } from "../models/RootState";
import { useDispatch, useSelector } from "react-redux";
import { Establecimiento } from "../models/establecimientos";
import {
  deleteStore,
  getStores,
  setStore,
  updateStore,
} from "../redux/actions/stores/indes";

export interface UseEstablecimiento {
  establecimientos: Establecimiento[];
  actions: {
    agregar: (establecimiento: Establecimiento) => void;
    obtener: () => void;
    actualizar: (establecimiento: Establecimiento) => void;
    borrar: (establecimientoId: string) => void;
  };
}

export default function useEstablecimiento(): UseEstablecimiento {
  const dispatch = useDispatch();
  const establecimientos = useSelector((state: RootState) => state.stores);

  async function agregarEstableciiento(establecimiento: Establecimiento) {
    await dispatch<any>(setStore(establecimiento)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el establecimiento, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function obtenerEstableciientos() {
    await dispatch<any>(getStores()).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el establecimiento, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function actualizarEstableciiento(establecimiento: Establecimiento) {
    await dispatch<any>(updateStore(establecimiento)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "Error al agregar el establecimiento, inténtelo mas tarde",
        "error"
      );
    });
  }
  async function borrarEstableciiento(establecimientoId: string) {
    await dispatch<any>(deleteStore(establecimientoId)).catch((e: Error) => {
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
