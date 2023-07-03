import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../models/RootState";
import { MovCabecera } from "../models/reportes";
import {
  deleteMovReport,
  getMovReports,
  postMovReport,
  updateMovReport,
} from "../redux/actions/reports";
import swal from "sweetalert";

export default function useReports() {
  const dispatch = useDispatch();
  const reports = useSelector((state: RootState) => state.reports);

  async function agregarReporte(movReport: MovCabecera) {
    await dispatch<any>(postMovReport(movReport)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "No se pudo cargar el reporte, inténtelo mas tarde",
        "error"
      );
    });
  }

  async function obtenerReportes(
    year: string | null,
    month: string | null,
    day: string | null
  ) {
    await dispatch<any>(getMovReports(year, month, day)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "No se pudieron obtener los reportes, inténtelo mas tarde",
        "error"
      );
    });
  }

  async function actualizarReporte(movReport: MovCabecera) {
    await dispatch<any>(updateMovReport(movReport)).catch((e: Error) => {
      console.log(e.message);
      swal(
        "Error",
        "No se pudo actualizar el reporte, inténtelo mas tarde",
        "error"
      );
    });
  }

  async function borrarReporte(movReportId: string, movReportDate: string) {
    await dispatch<any>(deleteMovReport(movReportId, movReportDate)).catch(
      (e: Error) => {
        console.log(e.message);
        swal(
          "Error",
          "No se pudo borrar el reporte, inténtelo mas tarde",
          "error"
        );
      }
    );
  }

  return {
    reports,
    actions: {
      agregar: agregarReporte,
      obtener: obtenerReportes,
      actualizar: actualizarReporte,
      borrar: borrarReporte,
    },
  };
}
