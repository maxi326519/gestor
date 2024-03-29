import { db, auth, storage } from "../../../firebase";
import { ref, get, update } from "firebase/database";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  updateEmail,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

export const GET_USER_DATA = "GET_USER_DATA";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPLOAD_LOGO = "UPLOAD_LOGO";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const UPDATE_LOCAL_PROFILE_DATA= "UPDATE_LOCAL_PROFILE_DATA"

export function getUserData() {
  return async (dispatch) => {
    try {
      const dataUserRef = ref(db, `users/${auth.currentUser.uid}/profile`);
      const dataUserSnapshot = await get(dataUserRef);
      const userDB = dataUserSnapshot.val();

      return dispatch({
        type: GET_USER_DATA,
        payload: userDB,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function updateUserData(newData) {
  return async (dispatch) => {
    try {
      if (newData.email !== auth.currentUser.email)
        await updateEmail(auth.currentUser, newData.email);

      const url = `users/${auth.currentUser.uid}/profile`;
      const userRef = ref(db, url);
      await update(userRef, newData);

      return dispatch({
        type: UPDATE_PROFILE,
        payload: newData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function uploadLogo(logo) {
  return async (dispatch) => {
    try {
      const dir = `users/${auth.currentUser.uid}/logo`;

      const storageReference = storageRef(storage, dir);
      const imageQuery = await uploadBytes(storageReference, logo);

      // GET invoice image url
      const imageUrl = await getDownloadURL(imageQuery.ref);

      return dispatch({
        type: UPLOAD_LOGO,
        payload: imageUrl,
      });
    } catch (e) {
      throw new Error(e);
    }
  };
}

export function uploadFile(file) {
  return async (dispatch) => {
    try {
      const dir = `users/${auth.currentUser.uid}/firma`;
      const storageReference = storageRef(storage, dir);
      const imageQuery = await uploadBytes(storageReference, file);

      // GET invoice image url
      const fileUrl = await getDownloadURL(imageQuery.ref);

      return dispatch({
        type: UPLOAD_FILE,
        payload: fileUrl,
      });
    } catch (e) {
      throw new Error(e);
    }
  };
}

export function changePassword() {
  return async (dispatch) => {
    try {
      console.log(auth, auth.currentUser.email);
      await sendPasswordResetEmail(auth, auth.currentUser.email);
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

export function changeEmail(newEmail, ruc) {
  return async (dispatch) => {
    try {
      await updateEmail(auth.currentUser, newEmail);
      await sendEmailVerification(auth.currentUser);
      const userRef = ref(db, `users/${auth.currentUser.uid}/profile`);
      const authRef = ref(db, `auth/${ruc}`);
      await update(userRef, { EMP_EMAIL: newEmail });
      await update(authRef, { EMAIL: newEmail });

      dispatch({
        type: UPDATE_EMAIL,
        payload: newEmail,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function updataLocalProfileData(userData){
   return {
      type: UPDATE_LOCAL_PROFILE_DATA,
      payload: userData
   }
}
