import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../models/RootState";
import { MovDetalle } from "../models/movements";
import { Factura, FacturaDetalle } from "../models/factura";
import { auth, db } from "../firebase";
import { push, ref } from "firebase/database";
import {
  MovCabecera,
  TipoDeMovimiento,
  initMovCabecera,
  initMovDetalle,
} from "../models/movements";
import {
  postMovement,
  getMovements,
  updateMovement,
  deleteMovement,
} from "../redux/actions/movimientos";
import swal from "sweetalert";
import useReporteKardex from "./useKardex";

export interface UseProducto {
  listado: MovCabecera[];
  agregar: (nuevoMovimiento: MovCabecera) => Promise<any>;
  obtener: () => Promise<any>;
  actualizar: (movimiento: MovCabecera) => Promise<any>;
  borrar: (movimientoId: string) => Promise<any>;
  facturaAMovimientos(factura: Factura): MovCabecera;
  facturaAMovCabecera(factura: Factura): MovCabecera;
  facturaDetalleAMovDetalle(detalle: FacturaDetalle): MovDetalle;
}

export default function useMovimientos() {
  const dispatch = useDispatch();
  const movimientos = useSelector((state: RootState) => state.movements.data);
  const kardex = useReporteKardex();

  /**
   * Recibe datos del movimiento del inventario, lo guarda y luego lo actualiza en 'Redux'.
   *
   * @argument { MovCabecera } nuevoMovimiento: Datos del movimiento
   *
   * @returns { Promise<any> }
   */
  async function agregarMovimiento(movimiento: MovCabecera) {
    const movKey = createMovKey(movimiento);

    const nuevoMovimiento: MovCabecera = {
      ...movimiento,
      MCA_CODIGO: movKey,
      MCA_DETALLES: movimiento.MCA_DETALLES.map(
        (detalle): MovDetalle => ({
          ...detalle,
          MCA_CODIGO: movKey,
        })
      ),
      MCA_USUKEY: auth.currentUser!.uid,
    };

    return Promise.all([
      dispatch<any>(postMovement(nuevoMovimiento)),
    ]).catch((e: Error) => {
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
    return dispatch<any>(getMovements(year, month, day)).catch((e: Error) => {
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
    return dispatch<any>(updateMovement(movement)).catch((e: Error) => {
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
    return dispatch<any>(deleteMovement(movementId, movementDate)).catch(
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

  function facturaAMovimientos(factura: Factura): MovCabecera {
    const movCabecera: MovCabecera = facturaAMovCabecera(factura);
    const movDetalle: MovDetalle[] = factura.ITE_DETALLES.map(
      (detalle: FacturaDetalle) => facturaDetalleAMovDetalle(detalle)
    );

    return {
      ...movCabecera,
      MCA_DETALLES: movDetalle,
    };
  }

  function facturaAMovCabecera(factura: Factura): MovCabecera {
    return {
      ...initMovCabecera,
      MCA_DOCUMENTO: factura.VEN_CODIGO,
      MCA_FECHA: factura.VEN_FECHA,
      MCA_TIPO: TipoDeMovimiento.EGRESO,
      LOC_CODIGO: factura.LOC_CODIGO,
      MCA_USUKEY: auth.currentUser!.uid,
    };
  }

  function facturaDetalleAMovDetalle(detalle: FacturaDetalle): MovDetalle {
    return {
      ...initMovDetalle,
      ITE_CODIGO: detalle.ITE_CODIGO,
      MDE_CANTIDAD: detalle.VED_CANTIDAD,
      MDE_PRECIO: detalle.VED_PUNITARIO,
      MDE_USUKEY: auth.currentUser!.uid,
    };
  }

  function createMovKey(movimiento: MovCabecera): string {
    const date = movimiento.MCA_FECHA.split("-");
    const year = date[0];
    const month = date[1];
    return push(
      ref(db, `users/${auth.currentUser!.uid}/movimiento/${year}/${month}`)
    ).key!;
  }

  return {
    data: movimientos,
    agregar: agregarMovimiento,
    obtener: obtenerMovimientos,
    actualizar: actualizarMovimiento,
    borrar: borrarMovimiento,
    facturaAMovimientos,
    facturaAMovCabecera,
    facturaDetalleAMovDetalle,
  };
}
