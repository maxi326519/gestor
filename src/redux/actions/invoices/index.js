import { db, auth } from "../../../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export const POST_INVOICE = "ADD_INVOICE";
export const GET_INVOICES = "GET_INVOICES";
export const UPDATE_INVOICE = "UPDATE_INVOICE";

export function postInvoice(invoice) {
  return async (dispatch) => {
    try {
      const date = invoice.VEN_FECHA.split("-");
      const year = date[0];
      const month = date[1];

      const invoiceRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "invoices"
      );
      const yearDoc = doc(invoiceRef, year);
      const query = await addDoc(collection(yearDoc, month), invoice);

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
      let invoicesMonth = [];
      const invoiceColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "invoices"
      ); // Accedemos a las colecciones de todas las facturas

      if (day && month && year) {
        const yearDoc = doc(invoiceColl, year); // Accedemos a las facturas de un año en especifico
        const monthDoc = collection(yearDoc, month); // Accedemos a las facturas de un mes en especifico
        const date = `${year}-${month}-${day}`;

        const q = query(monthDoc, where("VEN_FECHA", "==", date));

        const response = await getDocs(q);

        if (!response.empty) {
          response.forEach((doc) => {
            invoices.push({
              ...doc.data(),
              VEN_CODIGO: doc.id,
            });
          });
        }
      } else if (month && year) {
        const yearDoc = doc(invoiceColl, year); // Accedemos a las facturas de un año en especifico
        const monthDoc = collection(yearDoc, month); // Accedemos a las facturas de un mes en especifico

        const query = await getDocs(monthDoc);

        if (!query.empty) {
          query.forEach((doc) => {
            invoices.push({
              ...doc.data(),
              VEN_CODIGO: doc.id,
            });
          });
        }
      } else if (year) {
        const yearDoc = doc(invoiceColl, year); // Accedemos a las facturas de un año en especifico

        const enero = await getDocs(collection(yearDoc, "01"));
        const febrero = await getDocs(collection(yearDoc, "02"));
        const marzo = await getDocs(collection(yearDoc, "03"));
        const abril = await getDocs(collection(yearDoc, "04"));
        const mayo = await getDocs(collection(yearDoc, "05"));
        const junio = await getDocs(collection(yearDoc, "06"));
        const julio = await getDocs(collection(yearDoc, "07"));
        const agosto = await getDocs(collection(yearDoc, "08"));
        const septiembre = await getDocs(collection(yearDoc, "09"));
        const octubre = await getDocs(collection(yearDoc, "10"));
        const noviembre = await getDocs(collection(yearDoc, "11"));
        const diciembre = await getDocs(collection(yearDoc, "12"));

        invoicesMonth.push(enero);
        invoicesMonth.push(febrero);
        invoicesMonth.push(marzo);
        invoicesMonth.push(abril);
        invoicesMonth.push(mayo);
        invoicesMonth.push(junio);
        invoicesMonth.push(julio);
        invoicesMonth.push(agosto);
        invoicesMonth.push(septiembre);
        invoicesMonth.push(octubre);
        invoicesMonth.push(noviembre);
        invoicesMonth.push(diciembre);

        invoicesMonth
          .filter((month) => {
            if (month.empty) return false;
            return true;
          })
          .forEach((month) => {
            month.forEach((doc) => {
              invoices.push({
                ...doc.data(),
                VEN_CODIGO: doc.id,
              });
            });
          });
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

      const invoiceColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "invoices"
      ); // Accedemos a las colecciones de todas las facturas
      const yearDoc = doc(invoiceColl, year); // Accedemos a las facturas de un año en especifico
      const monthDoc = collection(yearDoc, month); // Accedemos a las facturas de un mes en especifico

      await updateDoc(doc(monthDoc, id), invoiceData);

      dispatch({
        type: UPDATE_INVOICE,
        payload: invoiceData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
