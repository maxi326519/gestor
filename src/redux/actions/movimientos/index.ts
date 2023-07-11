import { Dispatch } from "redux";
import { child, get, ref, remove, set, update } from "firebase/database";
import { auth, db } from "../../../firebase";
import { MovCabecera } from "../../../models/movements";

// Actions
export const POST_MOVEMENT = "POST_MOVEMENT";
export const GET_MOVEMENTS = "GET_MOVEMENTS";
export const UPDATE_MOVEMENT = "UPDATE_MOVEMENT";
export const DELETE_MOVEMENT = "DELETE_MOVEMENT";

export function postMovement(newMovement: MovCabecera) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Reports collections
    const date = newMovement.MCA_FECHA.split("-");
    const year = date[0];
    const month = date[1];
    const movementsRef = ref(
      db,
      `users/${auth.currentUser.uid}/movimiento/${year}/${month}`
    );
    const newMovChil = child(movementsRef, newMovement.MCA_CODIGO);

    // Post data
    await set(newMovChil, newMovement);

    try {
      dispatch({
        type: POST_MOVEMENT,
        payload: newMovement,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export function getMovements(
  year: string | null,
  month: string | null,
  day: string | null
) {
  return async (dispatch: Dispatch) => {
    try {
      // Check if the user is logued in
      if (!auth.currentUser) throw new Error("user not logued in");

      // Reports url
      const movementsUrl = `users/${auth.currentUser.uid}/movimiento`;

      // Variables
      let movements: MovCabecera[] = [];

      // If year, month and day exist
      if (year && month && day) {
        const movementsRef = ref(db, `${movementsUrl}/${year}/${month}`);
        const snapshot = await get(movementsRef);

        // Save data
        snapshot.forEach((movement) => {
          const currentMovement: MovCabecera = movement.val();

          if (currentMovement.MCA_FECHA === `${year}-${month}-${day}`) {
            movements.push(movement.val());
          }
        });

        // Day filter
        movements = movements.filter(
          (mov) => mov.MCA_FECHA === `${year}-${month}-${day}`
        );
      } else if (year && month) {
        // If yea and month
        const movementsRef = ref(db, `${movementsUrl}/${year}/${month}`);
        const snapshot = await get(movementsRef);

        // Save data
        snapshot.forEach((movement) => {
          movements.push(movement.val());
        });
      } else if (year) {
        // If just year exist
        const movementsRef = ref(db, `${movementsUrl}/${year}`);
        const snapshot = await get(movementsRef);

        // Save data
        snapshot.forEach((month) => {
          month.forEach((movement) => {
            movements.push(movement.val());
          });
        });
      }

      dispatch({
        type: GET_MOVEMENTS,
        payload: {
          filters: { year, month, day },
          data: movements,
        },
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}

export function updateMovement(movement: MovCabecera) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Date split, and node ref
    const dateSplit = movement.MCA_FECHA.split("-");
    const year = dateSplit[0];
    const month = dateSplit[1];

    // Node ref
    const movementRef = ref(
      db,
      `users/${auth.currentUser.uid}/movimiento/${year}/${month}/${movement.MCA_CODIGO}`
    );

    // Update data
    await update(movementRef, movement);

    try {
      dispatch({
        type: UPDATE_MOVEMENT,
        payload: movement,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export function deleteMovement(movementId: string, movDate: string) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Date split
    const dateSplit = movDate.split("-");
    const year = dateSplit[0];
    const month = dateSplit[1];

    // Node ref
    const movementRef = ref(
      db,
      `users/${auth.currentUser.uid}/movimiento/${year}/${month}/${movementId}`
    );

    // Remove data
    await remove(movementRef);

    try {
      dispatch({
        type: DELETE_MOVEMENT,
        payload: movementId,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
