import { db, auth } from "../../../firebase";
import { ref, push, set, get, update, remove } from "firebase/database";

export const POST_CLIENT = "ADD_CLIENT";
export const GET_CLIENTS = "GET_CLIENTS";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";

export function postClient(client) {
  return async (dispatch) => {
    try {
      const clientsRef = ref(db, `users/${auth.currentUser.uid}/clients`);
      const newClientRef = push(clientsRef);
      if (!newClientRef) throw new Error("Error al agregar el cliente");

      const newClientId = newClientRef.key;
      const newClientData = {
        ...client,
        USU_KEY: auth.currentUser.uid,
        CLI_CODIGO: newClientId,
      };

      await set(newClientRef, newClientData);

      return dispatch({
        type: POST_CLIENT,
        payload: client,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getClients() {
  return async (dispatch) => {
    try {
      const clientsRef = ref(db, `users/${auth.currentUser.uid}/clients`);
      const snapshot = await get(clientsRef);

      let clients = [];
      snapshot.forEach((childSnapshot) => {
        clients.push({
          ...childSnapshot.val(),
          CLI_CODIGO: childSnapshot.key,
        });
      });

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
      const clienRef = ref(db, `users/${auth.currentUser.uid}/clients/${id}`);
      await update(clienRef, clientData);

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
      const clienRef = ref(db, `users/${auth.currentUser.uid}/clients/${id}`);
      await remove(clienRef);

      return dispatch({
        type: DELETE_CLIENT,
        payload: id,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
