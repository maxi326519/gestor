import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInvoice,
  openLoading,
  closeLoading,
} from "../../../../../redux/actions";

import removeIcon from "../../../../../assets/svg/remove.svg";
import "./InvoiceCard.css";
import { toast } from "react-toastify";

export default function InvoiceCard({ invoice, viewPDF }) {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(openLoading());
    dispatch(deleteInvoice(invoice.id))
      .then(() => {
        dispatch(closeLoading());
        toast.success("¡Factura eliminada exitosamente!",{
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error("Error al eliminar la factura",{
          position: toast.POSITION.TOP_CENTER
        });
        console.log(e);
      });
  }

  return (
    <div className="invoice-card">
      <span>{invoice.VEN_FECHA}</span>
      <span>
        {invoice.CLI_NOMBRE} <button className="btn btn-primary">Ver</button>
      </span>
      <span>
        {invoice.VEN_SUBTOTAL} <button className="btn btn-primary">Ver</button>
      </span>
      <span>{invoice.VEN_SUBTOTAL}</span>
      <span>{invoice.VEN_SUBTOTAL0}</span>
      <span>{invoice.VEN_SUBTOTAL12}</span>
      <span>{invoice.VEN_SUBTOTAL0 * 0.12}</span>
      <span>{invoice.VEN_TOTAL}</span>
      <button className="btn btn-primary" onClick={viewPDF}>
        Ver en PDF
      </button>
      <button className="btn btn-danger" onClick={handleRemove}>
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
