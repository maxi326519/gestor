import { useDispatch } from "react-redux";
import swal from "sweetalert";
import {
  updateInvoice,
  openLoading,
  closeLoading,
} from "../../../../../redux/actions";

import "./InvoiceCard.css";

export default function InvoiceCard({
  invoice,
  viewPDF,
  disabled,
  isChecked,
  setCheck,
  setAll,
}) {
  const dispatch = useDispatch();

  function anular() {
    swal({
      title: "¡Atencion!",
      text: "¿Seguro  que quiere anular esta factura?",
      icon: "warning",
      buttons: { confirm: true, cancel: true },
    }).then((r) => {
      if (r) {
        dispatch(openLoading());
        dispatch(
          updateInvoice(invoice.VEN_CODIGO, { ...invoice, VEN_ESTADO: 2 })
        )
          .then(() => {
            dispatch(closeLoading());
            swal("Factura anulada", "Se anulo a factura con exito", "success");
          })
          .catch((e) => {
            dispatch(closeLoading());
            swal(
              "Error",
              "Surgio un error desconocido al anular la factura",
              "error"
            );
            console.log(e);
          });
      }
    });
  }

  function handleChecked() {
    setAll(false);
    if (isChecked.some((c) => c === invoice.VEN_CODIGO)) {
      console.log("Borrando");
      setCheck(isChecked.filter((c) => c !== invoice.VEN_CODIGO));
    } else {
      console.log("Guardando");
      console.log(invoice.VEN_CODIGO);
      setCheck([...isChecked, invoice.VEN_CODIGO]);
    }
  }

  return (
    <div className="invoice-card">
      {(invoice.VEN_ESTADO === 2) || invoice.VEN_ESTADO === 3 ? <input type="checkbox" disabled/> : (
        <input
          type="checkbox"
          checked={isChecked.some((c) => c === invoice.VEN_CODIGO)}
          disabled={disabled}
          onChange={handleChecked}
        />
      )}
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
