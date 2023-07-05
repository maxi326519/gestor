import { Dispatch } from "redux";
import { Establecimiento } from "../../../models/establecimientos";
import { auth, db } from "../../../firebase";
import { child, get, ref, remove, set, update } from "firebase/database";

export const POST_STORE = "POST_STORE";
export const GET_STORES = "GET_STORES";
export const UPDATE_STORE = "UPDATE_STORE";
export const DELETE_STORE = "DELETE_STORE";

export function setStore(newStore: Establecimiento) {
  return async (dispatch: Dispatch) => {
    try {
      // Check if user is logued in
      if (!auth.currentUser) throw new Error("user not logued in");

      // Stores collections
      const storesRef = ref(
        db,
        `users/${auth.currentUser.uid}/establecimientos`
      );
      const newStoreRef = child(storesRef, newStore.LOC_ESTABLECIMIENTO);

      // Post data
      await set(newStoreRef, newStore);

      dispatch({
        type: POST_STORE,
        payload: newStore,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getStores() {
  return async (dispatch: Dispatch) => {
    try {
      // Check if user is logued in
      if (!auth.currentUser) throw new Error("user not logued in");

      // Stores collections
      const storesRef = ref(
        db,
        `users/${auth.currentUser.uid}/establecimientos`
      );

      // Get data
      const snapshot = await get(storesRef);

      // Save data
      let stores: Establecimiento[] = [];
      snapshot.val().forEach((store: Establecimiento) => stores.push(store));

      dispatch({
        type: GET_STORES,
        payload: stores,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateStore(store: Establecimiento) {
  return async (dispatch: Dispatch) => {
    try {
      // Check if user is logued in
      if (!auth.currentUser) throw new Error("user not logued in");

      // Node ref
      const storeRef = ref(
        db,
        `users/${auth.currentUser.uid}/establecimientos/${store.LOC_ESTABLECIMIENTO}`
      );

      // Update data
      await update(storeRef, store);

      dispatch({
        type: UPDATE_STORE,
        payload: store,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteStore(storeId: string) {
  return async (dispatch: Dispatch) => {
    try {
      // Check if user is logued in
      if (!auth.currentUser) throw new Error("user not logued in");

      // Node ref
      const storeRef = ref(
        db,
        `users/${auth.currentUser.uid}/establecimientos/${storeId}`
      );

      // Remove data
      await remove(storeRef);

      dispatch({
        type: DELETE_STORE,
        payload: storeId,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
