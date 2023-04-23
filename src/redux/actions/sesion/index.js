import { auth, db } from "../../../firebase";
import { ref, child, update, getDatabase, query, get, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const SIGN_IN = "SIGN_IN";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const CONFIRM_REGISTER = "CONFIRM_REGISTER";
export const PERSISTENCE = "PERSISTENCE";

export function signin(user) {
  return async (dispatch) => {
    try {
      // Verificamos que no exista otro usuario con ese ruc
      const queryInstance = query(
        ref(db, "users"),
        child("EMP_RUC").equalTo(user.EMP_RUC)
      );
      const dbUser = await get(queryInstance);
      if (dbUser.exists()) throw new Error("El ruc ya existe");
      // Creamos el nuevo usuario
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.EMP_EMAIL,
        user.password
      );

      const userDB = {
        EMP_RUC: user.EMP_RUC,
        EMP_EMAIL: user.EMP_EMAIL,
        EMP_AUTOMATICO: 1,
        EMP_CODIGO: 1,
        EMP_COMPROBANTES: 1,
        EMP_DADICIONAL: 0,
        EMP_ESTADO: 1,
        EMP_FECHA: new Date().toLocaleDateString(),
        EMP_GUIAREMISION: 1,
        EMP_LICENCIA: "NORMAL",
        EMP_MENSAJE: "",
        EMP_MULTILOCAL: 1,
        EMP_MULTIUSUARIO: 0,
        EMP_NCE: 100,
        EMP_NOTIFICACION: 0,
        EMP_USUKEY: userCredential.user.uid,
        EMP_SECUENCIAL: 0,
        EMP_IMPUESTO: 0,
        EMP_PERFIL: {
          DATOS_PERSONALES: false,
          OBLIGACIONES: false,
          FACTURA_ELECTRONICA: false,
        },
      };

      // Almacenamos los primeros datos sobre el usuario,
      // y le indicamos que el perfil todavia no esta completo
      await set(ref(db, `users/${userCredential.user.uid}`), userDB);

      return dispatch({
        type: SIGN_IN,
        payload: {
          ...userCredential.user,
          userDB,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function confirmDatosPersonales(newData) {
  return async (dispatch) => {
    try {
      // Verificamos que no exista otro usuario con ese ruc
      if (newData.EMP_RUC) {
        const queryInstance = ref(db, "users");
        const dbUser = await get(
          child(queryInstance, `ruc/${newData.EMP_RUC}`)
        );
        if (dbUser.exists()) throw new Error("El ruc ya existe");
      }

      const updateData = {
        ...newData,
        EMP_PERFIL: {
          DATOS_PERSONALES: true,
          OTROS_DATOS: false,
        },
      };

      await update(ref(db, `users/${auth.currentUser.uid}`), updateData);

      return dispatch({
        type: CONFIRM_REGISTER,
        payload: updateData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function confirmData(newData) {
  return async (dispatch) => {
    try {
      const updateData = {
        ...newData,
        EMP_PERFIL: {
          DATOS_PERSONALES: true,
          OTHER_DATA: true,
        },
      };

      await update(ref(db, `users/${auth.currentUser.uid}`), updateData);

      return dispatch({
        type: CONFIRM_REGISTER,
        payload: updateData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function login(userData) {
  return async (dispatch) => {
    try {
      // Verificamo que exista un usuario con ese ruc
      const queryInstance = query(
        ref(getDatabase(), "users"),
        child("EMP_RUC").equalTo(userData.EMP_RUC)
      );
      const dbUser = await get(queryInstance);

      if (!dbUser.exists()) throw new Error("El ruc no existe");

      // Si existe nos traemos el email y hacemos la Auth
      const email = dbUser.val().EMP_EMAIL;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        userData.password
      );

      // Por ultimo nos traemos toda la informacion restante del usuario
      const dataUser = await get(
        ref(getDatabase(), `users/${userCredential.user.uid}`)
      );

      // Agregamos toda la informacion en un mismo objeto
      const currentUser = {
        ...dataUser.val(),
        ...userCredential.user,
      };

      return dispatch({
        type: LOG_IN,
        payload: currentUser,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function persistence(userData) {
  return async (dispatch) => {
    return dispatch({
      type: PERSISTENCE,
      payload: userData,
    });
  };
}

export function logOut() {
  return async (dispatch) => {
    await signOut(auth);

    return dispatch({
      type: LOG_OUT,
    });
  };
}
