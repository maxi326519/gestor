import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
/* Firebase */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
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
export const UPLOAD_USER = "UPLOAD_USER";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const OPEN_LOADING = "OPEN_LOADING";
export const CLOSE_LOADING = "CLOSE_LOADING";
export const ALERT = "ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";

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
export const DELETE_CLIENT  = "DELETE_CLIENT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

// POSTS
export function signin(user) {
  return async (dispatch) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const newUser = userCredential.user;

      console.log(newUser.uid);

      await setDoc(doc(db, "users", newUser.uid), {
        ruc: user.ruc,
        email: user.email,
      });

      return dispatch({
        type: SIGN_IN,
        payload: { ...newUser, ...user },
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function uploadUser(newData) {
  return async (dispatch) => {
    try {
      await setDoc(doc(collection(db, "users"), newData));
      return dispatch({
        type: UPLOAD_USER,
        payload: newData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function login(userData) {
  return async (dispatch) => {
    try {
      const queryInstance = query(
        collection(db, "users"),
        where("ruc", "==", userData.ruc)
      );
      const dbUser = await getDocs(queryInstance);
      if (dbUser.empty) throw new Error("El usuario no existe");

      const email = dbUser.docs[0].data().email;

      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        userData.password
      );

      return dispatch({
        type: LOG_IN,
        payload: { ...userCredential.user, ...userData },
      });
    } catch (err) {
      throw new Error(err);
    }
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

export function Alert(text, isAcceptFunction){
  return dispatch => {
    return dispatch({
      type: ALERT,
      payload: {
        text,
        isAcceptFunction
      }
    });
  }
}

export function clearAlert(){
  return dispatch => {
    return dispatch({
      type: CLEAR_ALERT
    });
  }
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

// GETERS
export function getClients(userId) {
  return async (dispatch) => {
    try {
      if (!userId) throw new Error("Falta ID de usuario");
      const clientColl = collection(db, "users", userId, "clients");
      const query = await getDocs(clientColl);

      if (query.empty) throw new Error("No tiene clientes");

      let clients = [];

      query.forEach((doc) => {
        clients.push({
          id: doc.id,
          ...doc.data(),
        });
      });

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

      if (query.empty) throw new Error("No tiene productos");

      let products = [];

      query.forEach((doc) => {
        products.push({
          name: doc.id,
          ...doc.data(),
        });
      });

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

      if (query.empty) throw new Error("No tiene productos");

      let invoices = [];

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
        payload: id
      })
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
        payload: id
      })
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
        payload: id
      })
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function updateClient(userId, id, clientData){
  return async (dispatch) => {
    try{
      const clienColl = collection(db, "users", userId, "clients");
      await updateDoc(doc(clienColl, id), clientData);

      return dispatch({
        type: UPDATE_CLIENT,
        payload: clientData
      })
    }catch(err){
      throw new Error(err);
    }
  }
}

export function updateProduct(userId, productData){
  return async (dispatch) => {
    try{
      const productColl = collection(db, "users", userId, "products");
      await updateDoc(doc(productColl, productData.code), productData);

      return dispatch({
        type: UPDATE_PRODUCT,
        payload: productData
      })
    }catch(err){
      throw new Error(err);
    }
  }
}