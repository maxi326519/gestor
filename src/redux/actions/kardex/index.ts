import { Dispatch } from "redux";
import { child, get, ref, remove, set, update } from "firebase/database";
import { auth, db } from "../../../firebase";
import { ReporteKardex } from "../../../models/kardex";

// Actions
export const POST_KARDEX = "POST_KARDEX";
export const GET_KARDEXS = "GET_KARDEXS";
export const UPDATE_KARDEX = "UPDATE_KARDEX";
export const DELETE_KARDEX = "DELETE_KARDEX";

export function postKardex(newKardex: ReporteKardex) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Reports collections
    const date = newKardex.KDX_REGISTRO.split("-");
    const year = date[0];
    const month = date[1];
    const kardexRef = ref(
      db,
      `users/${auth.currentUser.uid}/kardex/${year}/${month}`
    );
    const newKardexRef = child(kardexRef, newKardex.KDX_CODIGO);

    // Post data
    await set(newKardexRef, newKardex);

    try {
      dispatch({
        type: POST_KARDEX,
        payload: newKardex,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export function getKardexs(
  year: string | null,
  month: string | null,
  day: string | null
) {
  return async (dispatch: Dispatch) => {
    try {
      // Check if the user is logued in
      if (!auth.currentUser) throw new Error("user not logued in");

      // Reports url
      const kardexUrl = `users/${auth.currentUser.uid}/kardex`;

      // Variables
      let kardex: ReporteKardex[] = [];

      // If year, month and day exist
      if (year || month || day) {
        const kardexRef = ref(db, `${kardexUrl}/${year}/${month}/${day}`);
        const snapshot = await get(kardexRef);

        // Save data
        snapshot.forEach((kardexData) => {
          kardex.push(kardexData.val());
        });

        // Day filter
        kardex = kardex.filter(
          (mov) => mov.KDX_REGISTRO === `${year}-${month}-${day}`
        );
      }

      // If yea and month
      if (year || month) {
        const kardexRef = ref(db, `${kardexUrl}/${year}/${month}`);
        const snapshot = await get(kardexRef);

        // Save data
        snapshot.forEach((month) => {
          month.forEach((kardexData) => {
            kardex.push(kardexData.val());
          });
        });
      }

      // If just year exist
      if (year) {
        const kardexRef = ref(db, `${kardexUrl}/${year}`);
        const snapshot = await get(kardexRef);

        // Save data
        snapshot.forEach((years) => {
          years.forEach((month) => {
            month.forEach((kardexData) => {
              kardex.push(kardexData.val());
            });
          });
        });
      }

      dispatch({
        type: GET_KARDEXS,
        payload: {
          filters: { year, month, day },
          data: kardex,
        },
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}

export function updateKardex(kardex: ReporteKardex) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Date split, and node ref
    const dateSplit = kardex.KDX_REGISTRO.split("-");
    const year = dateSplit[0];
    const month = dateSplit[1];

    // Node ref
    const kardexRef = ref(
      db,
      `users/${auth.currentUser.uid}/kardex/${year}/${month}/${kardex.KDX_CODIGO}`
    );

    // Update data
    await update(kardexRef, kardex);

    try {
      dispatch({
        type: UPDATE_KARDEX,
        payload: kardex,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export function deleteKardex(kardexId: string, kardexDate: string) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Date split
    const dateSplit = kardexDate.split("-");
    const year = dateSplit[0];
    const month = dateSplit[1];

    // Node ref
    const kardexRef = ref(
      db,
      `users/${auth.currentUser.uid}/kardex/${year}/${month}/${kardexId}`
    );

    // Remove data
    await remove(kardexRef);

    try {
      dispatch({
        type: DELETE_KARDEX,
        payload: kardexId,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
