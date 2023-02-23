import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  deleteInvoice,
  updateUserData,
  openLoading,
  closeLoading
} from "../../../../../redux/actions";

import removeIcon from "../../../../../assets/svg/remove.svg";
import "./InvoiceCard.css";

export default function InvoiceCard({ invoice, viewPDF }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDB);

  function handleRemove() {
    dispatch(openLoading());
    dispatch(deleteInvoice(invoice.id))
      .then(() => {
        updateUserData({
          EMP_NUMERO: user.EMP_NUMERO - 1,
          EMP_SECUENCIAL: user.EMP_SECUENCIAL - 1,
        });
        dispatch(closeLoading());
        swal("Eliminado", "Su factura se elimino con exito", "success");
      })
      .catch((e) => {
        dispatch(closeLoading());
        swal(
          "Error",
          "Surgio un error desconocido al eliminar la factura",
          "error"
        );
        console.log(e);
      });
  }

  return (
    <div className="invoice-card">
      <span>{invoice.VEN_FECHA}</span>
      <span>{invoice.CLI_IDENTIFICACION}</span>
      <span>{invoice.CLI_NOMBRE}</span>
      <span>{invoice.VEN_DESCUENTO}</span>
      <span>{`${invoice.VEN_ESTABLECIMIENTO}-${invoice.VEN_PTOEMISION}-${invoice.VEN_NUMERO}`}</span>
      <span>"Generada"</span>
      <span>{invoice.VEN_SUBTOTAL}</span>
      <span>{invoice.VEN_SUBTOTAL0}</span>
      <span>{invoice.VEN_SUBTOTAL12}</span>
      <span>{invoice.VEN_SUBTOTAL0 * 0.12}</span>
      <span>{invoice.VEN_TOTAL}</span>
      <button className="btn btn-primary" onClick={viewPDF}>
        PDF
      </button>
      <button
        className="btn btn-danger"
        onClick={() =>
          swal({
            title: "Atencion!",
            text: "¿Seguro que quiere eliminar la factura?",
            icon: "warning",
            buttons: {
              eliminar: true,
              cancel: true,
            },
          }).then((r) => {
            if(r) handleRemove()
          })
        }
      >
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
