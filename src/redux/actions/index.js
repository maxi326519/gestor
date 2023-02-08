import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

/* Firebase */
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7nrIyKS4VQLew6pM1O2jP37zjhtuH6EY",
  authDomain: "gesto-e26ab.firebaseapp.com",
  databaseURL: "https://gesto-e26ab-default-rtdb.firebaseio.com",
  projectId: "gesto-e26ab",
  storageBucket: "gesto-e26ab.appspot.com",
  messagingSenderId: "340558224805",
  appId: "1:340558224805:web:f8bb36140eed40b2c71c4c",
};

// Initialize Firebase
const fe = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(fe);
/* Firebase */

export const SIGN_IN = "SIGN_IN";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const CONFIRM_REGISTER = "CONFIRM_REGISTER";
export const PERSISTENCE = "PERSISTENCE";

export const OPEN_LOADING = "OPEN_LOADING";
export const CLOSE_LOADING = "CLOSE_LOADING";
export const ALERT = "ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";

export const UPLOAD_LOGO = "UPLOAD_LOGO";
export const GET_USER_DATA = "GET_USER_DATA";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const POST_CLIENT = "ADD_CLIENT";
export const POST_PRODUCT = "ADD_PRODUCT";
export const POST_INVOICE = "ADD_INVOICE";

export const GET_CLIENTS = "GET_CLIENTS";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_INVOICES = "GET_INVOICES";

export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_INVOICE = "UPDATE_INVOICE";

export const DELETE_INVOICE = "DELETE_INVOICE";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

/* SESION */
export function signin(user) {
  return async (dispatch) => {
    try {
      // Verificamos que no exista otro usuario con ese ruc
      const queryInstance = query(
        collection(db, "users"),
        where("ruc", "==", user.ruc)
      );
      const dbUser = await getDocs(queryInstance);
      if (!dbUser.empty) throw new Error("El ruc ya existe");

      // Creamos el nuevo usuario
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // Almacenamos los primeros datos sobre el usuario,
      // y le indicamos que el perfil todavia no esta completo
      await setDoc(doc(db, "users", userCredential.user.uid), {
        ruc: user.ruc,
        email: user.email,
        complete: false,
      });

      return dispatch({
        type: SIGN_IN,
        payload: userCredential.user,
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
        collection(db, "users"),
        where("ruc", "==", userData.ruc)
      );
      const dbUser = await getDocs(queryInstance);
      if (dbUser.empty) throw new Error("El ruc no existe");

      // Si existe nos traemos el email y hacemos la Auth
      const email = dbUser.docs[0].data().email;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        userData.password
      );

      // Por ultimo nos traemos toda la informacion restante del usuario
      const dataUser = await getDoc(doc(db, "users", userCredential.user.uid));

      // Agregamos toda la informacion en un mismo objeto
      const currentUser = {
        ...dataUser.data(),
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

export function GoogleSesion() {
  return async (dispatch) => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(response);

      const user = response.user;
      const token = credential.accessToken;

      return dispatch({
        type: SIGN_IN,
        payload: user,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function logOut() {
  return (dispatch) => {
    return dispatch({
      type: LOG_OUT,
    });
  };
}
/* SESION */

/* USER DATA */
export function getUserData() {
  return async (dispatch) => {
    try {
      const dataUser = await getDoc(doc(db, "users", auth.currentUser.uid));
      return dispatch({
        type: GET_USER_DATA,
        payload: dataUser.data(),
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function confirmRegister(newData) {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        ...newData,
        complete: true,
      });

      return dispatch({
        type: CONFIRM_REGISTER,
        payload: newData,
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
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        ...newData,
      });

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

  console.log(logo);
  const storage = getStorage();
  const storageRef = ref(storage, 'logo');

  uploadBytes(storageRef, logo).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

export function changePassword() {
  return async (dispatch) => {
    try {
      const auth = getAuth();
      sendPasswordResetEmail(auth, auth.currentUser.email);
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
/* USER DATA */

export function openLoading() {
  return (dispatch) => {
    return dispatch({
      type: OPEN_LOADING,
    });
  };
}

export function closeLoading() {
  return (dispatch) => {
    return dispatch({
      type: CLOSE_LOADING,
    });
  };
}

export function Alert(text, isAcceptFunction) {
  return (dispatch) => {
    return dispatch({
      type: ALERT,
      payload: {
        text,
        isAcceptFunction,
      },
    });
  };
}

export function clearAlert() {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_ALERT,
    });
  };
}

export function postClient(userId, client) {
  return async (dispatch) => {
    try {
      if (!userId) throw new Error("Falta el ID de usuario");
      const clients = collection(db, "users", userId, "clients");
      const newCLient = await addDoc(clients, client);

      if (!newCLient) throw new Error("Error al agregar el cliente");

      const saveCLient = {
        id: newCLient.id,
        ...client,
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

export function postProduct(userId, product) {
  return async (dispatch) => {
    try {
      if (!userId) throw new Error("Falta el ID de usuario");
      const productColl = collection(db, "users", userId, "products");

      await setDoc(doc(productColl, product.code), {
        ...product,
      });
      return dispatch({
        type: POST_PRODUCT,
        payload: product,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function postInvoice(userId, invoice) {
  return async (dispatch) => {
    try {
      if (!userId) throw new Error("Falta el ID de usuario");
      const invoicesColl = collection(db, "users", userId, "invoices");
      const newProduct = await addDoc(invoicesColl, invoice);

      console.log(newProduct);

      return dispatch({
        type: POST_INVOICE,
        payload: invoice,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getClients(userId) {
  return async (dispatch) => {
    try {
      if (!userId) throw new Error("Falta ID de usuario");
      const clientColl = collection(db, "users", userId, "clients");
      const query = await getDocs(clientColl);

      let clients = [];

      if (!query.empty) {
        query.forEach((doc) => {
          clients.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      }

      return dispatch({
        type: GET_CLIENTS,
        payload: clients,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getProducts(userId) {
  return async (dispatch) => {
    try {
      if (!userId) throw new Error("Falta ID de usuario");
      const productColl = collection(db, "users", userId, "products");
      const query = await getDocs(productColl);

      let products = [];

      if (!query.empty) {
        query.forEach((doc) => {
          products.push({
            name: doc.id,
            ...doc.data(),
          });
        });
      }

      return dispatch({
        type: GET_PRODUCTS,
        payload: products,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getInvoices(userId) {
  return async (dispatch) => {
    try {
      if (!userId) throw new Error("Falta ID de usuario");
      const invoiceColl = collection(db, "users", userId, "invoices");
      const query = await getDocs(invoiceColl);

      let invoices = [];

      if (!query.empty) {
        query.forEach((doc) => {
          invoices.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        return dispatch({
          type: GET_INVOICES,
          payload: invoices,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function deleteClient(userId, id) {
  return async (dispatch) => {
    try {
      const clienColl = collection(db, "users", userId, "clients");
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

export function deleteProduct(userId, id) {
  return async (dispatch) => {
    try {
      const productColl = collection(db, "users", userId, "products");
      await deleteDoc(doc(productColl, id));

      return dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function deleteInvoice(userId, id) {
  return async (dispatch) => {
    try {
      const invoiceColl = collection(db, "users", userId, "invoices");
      await deleteDoc(doc(invoiceColl, id));

      return dispatch({
        type: DELETE_INVOICE,
        payload: id,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function updateClient(userId, id, clientData) {
  return async (dispatch) => {
    try {
      const clienColl = collection(db, "users", userId, "clients");
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

export function updateProduct(userId, productData) {
  return async (dispatch) => {
    try {
      const productColl = collection(db, "users", userId, "products");
      await updateDoc(doc(productColl, productData.code), productData);

      return dispatch({
        type: UPDATE_PRODUCT,
        payload: productData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
