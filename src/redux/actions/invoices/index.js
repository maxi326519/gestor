import {
  ref,
  push,
  update,
  get,
  query,
  orderByChild,
  equalTo,
  set,
} from "firebase/database";
import { auth, db } from "../../../firebase";

export const POST_INVOICE = "ADD_INVOICE";
export const GET_INVOICES = "GET_INVOICES";
export const UPDATE_INVOICE = "UPDATE_INVOICE";

export function postInvoice(invoice) {
  return async (dispatch) => {
    try {
      const invoiceNumber = await get(
        ref(
          db,
          `users/${auth.currentUser.uid}/invoices/numbers/${invoice.VEN_NUMERO}`
        )
      );

      if (invoiceNumber.exists()) {
        throw new Error("Ya existe ese numero de factura");
      }

      const date = invoice.VEN_FECHA.split("-");
      const year = date[0];
      const month = date[1];
      const invoiceRef = ref(
        db,
        `users/${auth.currentUser.uid}/invoices/${year}/${month}`
      );
      const query = await push(invoiceRef, invoice);

      const newInvoice = {
        ...invoice,
        VEN_CODIGO: query.key,
      };

      await set(
        ref(
          db,
          `users/${auth.currentUser.uid}/invoices/numbers/${invoice.VEN_NUMERO}`
        ),
        {
          VEN_CODIGO: query.key,
          VEN_NUMERO: `${`00${invoice.VEN_ESTABLECIMIENTO}`.slice(
            -3
          )}-${`00${invoice.VEN_PTOEMISION}`.slice(
            -3
          )}-${`00000000${invoice.VEN_NUMERO}`.slice(-9)}`,
        }
      );

      return dispatch({
        type: POST_INVOICE,
        payload: newInvoice,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getInvoices(year, month, day) {
  return async (dispatch) => {
    try {
      let invoices = [];
      const uid = auth.currentUser.uid;

      if (day && month && year) {
        const date = `${year}-${month}-${day}`;
        const invoiceRef = ref(db, `users/${uid}/invoices/${year}/${month}`);
        const q = query(invoiceRef, orderByChild("VEN_FECHA"), equalTo(date));

        const snapshot = await get(q);

        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((id) => {
            invoices.push({
              ...data[id],
              VEN_CODIGO: id,
            });
          });
        }
      } else if (month && year) {
        const monthRef = ref(db, `users/${uid}/invoices/${year}/${month}`);

        const snapshot = await get(monthRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((id) => {
            invoices.push({
              ...data[id],
              VEN_CODIGO: id,
            });
          });
        }
      } else if (year) {
        const yearRef = ref(db, `users/${uid}/invoices/${year}`);
        const snapshot = await get(yearRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((month) => {
            Object.keys(data[month]).forEach((id) => {
              invoices.push({
                ...data[month][id],
                VEN_CODIGO: id,
              });
            });
          });
        }
      } else {
        throw new Error("Faltan parametros para acceder a 'invoices'");
      }

      dispatch({
        type: GET_INVOICES,
        payload: invoices,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function updateInvoice(id, invoiceData) {
  return async (dispatch) => {
    try {
      const dateSplit = invoiceData.VEN_FECHA.split("-");
      const year = dateSplit[0];
      const month = `0${dateSplit[1]}`.slice(-2);

      const invoiceRef = ref(
        db,
        `users/${auth.currentUser.uid}/invoices/${year}/${month}/${id}`
      );
      await update(invoiceRef, invoiceData);

      dispatch({
        type: UPDATE_INVOICE,
        payload: invoiceData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
