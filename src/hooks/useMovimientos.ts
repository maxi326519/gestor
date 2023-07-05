import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../models/RootState";
import { MovCabecera } from "../models/movements";
import {
  postMovement,
  getMovements,
  updateMovement,
  deleteMovement,
} from "../redux/actions/movimientos";
import swal from "sweetalert";
import { MovDetalle } from "../models/movements";

export default function useMovimientos() {
  const dispatch = useDispatch();
  const movimientos = useSelector((state: RootState) => state.movements);

  /**
   * Recibe datos del movimiento del inventario y un listado de inventario a actualizar,
   * para crear un movimiento. luego lo actualiza en 'Redux'.
   *
   * @argument { MovCabecera } movimiento: Datos del movimiento
   * @argument { MovDetalle[] } detallesDelMovimiento: Listado de items nuevos par el inventario
   *
   * @returns { Promise<any> }
   */
  async function agregarMovimiento(
    movimiento: MovCabecera,
    detallesDelMovimiento: MovDetalle[]
  ) {
    // Juntamos los datos apra guardarlos
    const newMovement: MovCabecera = {
      ...movimiento,
      MCA_DETALLES: detallesDelMovimiento,
    };

    // Enviamos los datos a la base de datos
    await dispatch<any>(postMovement(newMovement)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "No se pudo cargar el movimiento, inténtelo mas tarde",
        "error"
      );
    });
  }

  /**
   * Obtiene los movimientos en base a filtros, y los almacena en 'Redux' para su uso:
   *
   * @argument { string | null } year: Año exacto de donde obtener los movimientos
   * @argument { string | null } month: Mes exacto de donde obtener los movimientos
   * @argument { string | null } day: dia exacto de donde obtener los movimientos
   *
   * @returns { Promise<any> }
   */
  async function obtenerMovimientos(
    year: string | null,
    month: string | null,
    day: string | null
  ) {
    await dispatch<any>(getMovements(year, month, day)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "No se pudieron obtener los movimientos, inténtelo mas tarde",
        "error"
      );
    });
  }

  /**
   * Actualiza los datos de un movimiento:
   *
   * @argument { MovCabecera } movement: Movimiento que se desea editar
   *
   * @returns { Promise<any> }
   */
  async function actualizarMovimiento(movement: MovCabecera) {
    await dispatch<any>(updateMovement(movement)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "No se pudo actualizar el movimiento, inténtelo mas tarde",
        "error"
      );
    });
  }

  /**
   * Borra un movimiento y sus detalles:
   *
   * @argument { string } movementId: ID del movimiento que se desea eliminar
   * @argument { string } movementDate: Fecha en formato 'YYYY-MM-DD' del movimiento que se desea eliminar
   *
   * @returns { Promise<any> }
   */
  async function borrarMovimiento(movementId: string, movementDate: string) {
    await dispatch<any>(deleteMovement(movementId, movementDate)).catch(
      (e: Error) => {
        console.log(e.message);
        swal(
          "Error",
          "No se pudo borrar el movimiento, inténtelo mas tarde",
          "error"
        );
      }
    );
  }

  return {
    movimientos,
    actions: {
      agregar: agregarMovimiento,
      obtener: obtenerMovimientos,
      actualizar: actualizarMovimiento,
      borrar: borrarMovimiento,
    },
  };
}
