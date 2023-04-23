import { db, auth } from "../../../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const POST_CLIENT = "ADD_CLIENT";
export const GET_CLIENTS = "GET_CLIENTS";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";

export function postClient(client) {
  return async (dispatch) => {
    try {
      const clients = collection(db, "users", auth.currentUser.uid, "clients");
      const newCLient = await addDoc(clients, {
        ...client,
        USU_KEY: auth.currentUser.uid,
      });

      if (!newCLient) throw new Error("Error al agregar el cliente");

      const saveCLient = {
        ...client,
        CLI_CODIGO: newCLient.id,
      };

      return dispatch({
        type: POST_CLIENT,
        payload: saveCLient,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getClients() {
  return async (dispatch) => {
    try {
      const clientColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "clients"
      );
      const query = await getDocs(clientColl);

      let clients = [];

      if (!query.empty) {
        query.forEach((doc) => {
          clients.push({
            ...doc.data(),
            CLI_CODIGO: doc.id,
          });
        });
      }
      dispatch({
        type: GET_CLIENTS,
        payload: clients,
      });
    } catch (err) {
      throw new Error({ GetClients: err });
    }
  };
}

export function updateClient(id, clientData) {
  return async (dispatch) => {
    try {
      const clienColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "clients"
      );
      await updateDoc(doc(clienColl, id), clientData);

      return dispatch({
        type: UPDATE_CLIENT,
        payload: clientData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function deleteClient(id) {
  return async (dispatch) => {
    try {
      const clienColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "clients"
      );
      await deleteDoc(doc(clienColl, id));

      return dispatch({
        type: DELETE_CLIENT,
        payload: id,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
