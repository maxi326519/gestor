import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  deleteInvoice,
  updateUserData,
  openLoading,
  closeLoading,
} from "../../../../../redux/actions";

import removeIcon from "../../../../../assets/svg/remove.svg";
import "./InvoiceCard.css";

export default function InvoiceCard({
  invoice,
  viewPDF,
  disabled,
  isCheked,
  setCheck,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDB);

  function handleRemove() {
    dispatch(openLoading());
    dispatch(deleteInvoice(invoice.id))
      .then(() => {
        dispatch(
          updateUserData({
            EMP_NUMERO: user.EMP_NUMERO - 1,
            EMP_SECUENCIAL: user.EMP_SECUENCIAL - 1,
          })
        )
          .then(() => {
            swal("Eliminado", "Su factura se elimino con exito", "success");
            dispatch(closeLoading());
          })
          .catch(() => {
            swal(
              "Error",
              "Surgio un error al actualizar los datos del usuario, al eliminar la factura",
              "error"
            );
          });
      })
      .catch((e) => {
        swal(
          "Error",
          "Surgio un error desconocido al eliminar la factura",
          "error"
        );
        dispatch(closeLoading());
        console.log(e);
      });
  }

  function anular() {
    swal({
      title: "¡Atencion!",
      text: "¿Seguro  que quiere anular esta factura?",
      icon: "warning",
      buttons: { confirm: true, cancel: true },
    });
  }

  return (
    <div className="invoice-card">
      <input type="checkbox" checked={isCheked} disabled={disabled} onChange={setCheck}/>
      <span>{invoice.VEN_FECHA}</span>
      <span>{`${invoice.VEN_ESTABLECIMIENTO}-${
        invoice.VEN_PTOEMISION
      }-${`000000000${invoice.VEN_NUMERO}`.slice(-9)}`}</span>
      <span>{invoice.CLI_IDENTIFICACION}</span>
      <span>{invoice.CLI_NOMBRE}</span>
      <span>{invoice.VEN_DESCUENTO}</span>
      <span>{Number(invoice.VEN_SUBTOTAL).toFixed(2)}</span>
      <span>{Number(invoice.VEN_SUBTOTAL0).toFixed(2)}</span>
      <span>{Number(invoice.VEN_SUBTOTAL12).toFixed(2)}</span>
      <span>{Number(invoice.VEN_SUBTOTAL0 * 0.12).toFixed(2)}</span>
      <span>{Number(invoice.VEN_TOTAL).toFixed(2)}</span>
      <span>
        {invoice.VEN_ESTADO === 1
          ? "Generada"
          : invoice.VEN_ESTADO === 2
          ? "Anulada"
          : invoice.VEN_ESTADO === 3
          ? "Autorizada"
          : "Error"}
      </span>
      <button className="btn btn-primary" onClick={viewPDF}>
        PDF
      </button>
      <button className="btn btn-danger" onClick={anular}>
        Anular
      </button>
    </div>
  );
}
