import { Dispatch } from "redux";
import { MovCabecera } from "../../../models/reportes";
import { child, get, ref, remove, set, update } from "firebase/database";
import { auth, db } from "../../../firebase";

// Actions
export const POST_MOV_REPORT = "POST_MOV_REPORT";
export const GET_MOV_REPORTS = "GET_MOV_REPORTS";
export const UPDATE_MOV_REPORT = "UPDATE_MOV_REPORT";
export const DELETE_MOV_REPORT = "DELETE_MOV_REPORT";

export function postMovReport(newMovReport: MovCabecera) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Reports collections
    const reportsRef = ref(db, `users/${auth.currentUser.uid}/reports`);
    const newMovReportRef = child(reportsRef, newMovReport.MCA_CODIGO);

    // Post data
    await set(newMovReportRef, newMovReport);

    try {
      dispatch({
        type: POST_MOV_REPORT,
        payload: newMovReport,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export function getMovReports(
  year: string | null,
  month: string | null,
  day: string | null
) {
  return async (dispatch: Dispatch) => {
    try {
      // Check if the user is logued in
      if (!auth.currentUser) throw new Error("user not logued in");

      // Reports url
      const reportsUrl = `users/${auth.currentUser.uid}/reports`;

      // Variables
      let movReports: MovCabecera[] = [];

      // If year, month and day exist
      if (year || month || day) {
        const reportsRef = ref(db, `${reportsUrl}/${year}/${month}/${day}`);
        const snapshot = await get(reportsRef);

        // Save data
        snapshot.forEach((movReport) => {
          movReports.push(movReport.val());
        });

        // Day filter
        movReports = movReports.filter(
          (mov) => mov.MCA_FECHA === `${year}-${month}-${day}`
        );
      }

      // If yea and month
      if (year || month) {
        const reportsRef = ref(db, `${reportsUrl}/${year}/${month}`);
        const snapshot = await get(reportsRef);

        // Save data
        snapshot.forEach((month) => {
          month.forEach((movReport) => {
            movReports.push(movReport.val());
          });
        });
      }

      // If just year exist
      if (year) {
        const reportsRef = ref(db, `${reportsUrl}/${year}`);
        const snapshot = await get(reportsRef);

        // Save data
        snapshot.forEach((years) => {
          years.forEach((month) => {
            month.forEach((movReport) => {
              movReports.push(movReport.val());
            });
          });
        });
      }

      dispatch({
        type: GET_MOV_REPORTS,
        payload: {
          filters: { year, month, day },
          data: movReports,
        },
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}

export function updateMovReport(movReport: MovCabecera) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Date split, and node ref
    const dateSplit = movReport.MCA_FECHA.split("-");
    const year = dateSplit[0];
    const month = dateSplit[1];

    // Node ref
    const movReportRef = ref(
      db,
      `users/${auth.currentUser.uid}/reports/${year}/${month}/${movReport.MCA_CODIGO}`
    );

    // Update data
    await update(movReportRef, movReport);

    try {
      dispatch({
        type: UPDATE_MOV_REPORT,
        payload: movReport,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export function deleteMovReport(movReportId: string, movDate: string) {
  return async (dispatch: Dispatch) => {
    // Check if the user is logued in
    if (!auth.currentUser) throw new Error("user not logued in");

    // Date split
    const dateSplit = movDate.split("-");
    const year = dateSplit[0];
    const month = dateSplit[1];

    // Node ref
    const movReportRef = ref(
      db,
      `users/${auth.currentUser.uid}/reports/${year}/${month}/${movReportId}`
    );

    // Remove data
    await remove(movReportRef);

    try {
      dispatch({
        type: DELETE_MOV_REPORT,
        payload: movReportId,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
