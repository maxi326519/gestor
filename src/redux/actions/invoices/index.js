import {
  getDatabase,
  ref,
  push,
  update,
  get,
  query,
  orderByChild,
} from "firebase/database";
import { collection, doc, addDoc } from "firebase/firestore";
import { auth, storage } from "../../../firebase";

export const POST_INVOICE = "ADD_INVOICE";
export const GET_INVOICES = "GET_INVOICES";
export const UPDATE_INVOICE = "UPDATE_INVOICE";

export function postInvoice(invoice) {
  return async (dispatch) => {
    try {
      const date = invoice.VEN_FECHA.split("-");
      const year = date[0];
      const month = date[1];

      const invoiceRef = ref(
        getDatabase(),
        "users",
        auth.currentUser.uid,
        "invoices"
      );
      const yearRef = push(ref(invoiceRef, year));
      const query = await addDoc(collection(yearRef, month), invoice);

      const newInvoice = {
        ...invoice,
        VEN_CODIGO: query.id,
      };

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
      const invoiceRef = ref(getDatabase(), `users/${uid}/invoices`);

      if (day && month && year) {
        const date = `${year}-${month}-${day}`;
        const q = query(invoiceRef, orderByChild("VEN_FECHA").equalTo(date));

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
        const monthRef = ref(invoiceRef, year, month);

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
        const yearRef = ref(invoiceRef, year);
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
      throw new Error({ GetInvoices: err });
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
        getDatabase(),
        "users",
        auth.currentUser.uid,
        "invoices"
      ); // Accedemos a las colecciones de todas las facturas
      const yearRef = ref(invoiceRef, year); // Accedemos a las facturas de un año en especifico
      const monthRef = ref(yearRef, month); // Accedemos a las facturas de un mes en especifico

      await update(ref(monthRef, id), invoiceData);

      dispatch({
        type: UPDATE_INVOICE,
        payload: invoiceData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
