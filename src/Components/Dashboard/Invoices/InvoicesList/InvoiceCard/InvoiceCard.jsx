import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice, openLoading, closeLoading } from "../../../../../redux/actions";

import removeIcon from "../../../../../assets/svg/remove.svg";
import "./InvoiceCard.css";

export default function InvoiceCard({ invoice, viewPDF }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.uid);
  const client = useSelector((state) =>
    state.clients.find((c) => c.id === invoice.client)
  );
  const initialState = {
    total: 0,
    unitAmount: 0,
    productAmount: 0,
  };

  const [result, setInvoiceData] = useState(initialState);

  useEffect(() => {
    let total = 0;
    let unitAmount = 0;
    let productAmount = invoice.product.length;

    invoice.product.map((p) => {
      total += p.amount * p.unitPrice;
    });

    invoice.product.map((p) => {
      unitAmount += p.amount;
    });

    setInvoiceData({
      total,
      unitAmount,
      productAmount,
    });
  }, [client]);

  function handleRemove() {
    dispatch(openLoading());
    dispatch(deleteInvoice(userId, invoice.id))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch((e) => {
        dispatch(closeLoading());
        console.log(e);
      });
  }

  return (
    <div className="invoice-card">
      {console.log(client)}
      <span>{invoice.date}</span>
      <span>{client?.name}</span>
      <span>{result.total}</span>
      <span>{result.unitAmount}</span>
      <span>{result.productAmount}</span>
      <button className="btn btn-primary" onClick={viewPDF}>
        Ver en PDF
      </button>
      <button className="btn btn-danger" onClick={handleRemove}>
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  );
}
