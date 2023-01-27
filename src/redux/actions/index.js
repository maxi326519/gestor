import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export const SIGN_IN = "SIGN_IN";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const ADD_CLIENT = "ADD_CLIENT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_INVOICE = "ADD_INVOICE";

export const GET_CLIENTS = "GET_CLIENTS";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_INVOICES = "GET_INVOICES";

// POSTS
export function signin(user) {
  return async (dispatch) => {
    try {
      if (!user.email || user.email === "")
        throw new Error("Debes ingresar un email");
      const queryInstance = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const exist = await getDocs(queryInstance);
      if (!exist.empty) throw new Error("El email ya esta registrado");

      const dbUser = await addDoc(collection(db, "users"), user);

      let newUser = {
        id: dbUser.id,
        ...user,
      };

      return dispatch({
        type: SIGN_IN,
        payload: newUser,
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
        where("userName", "==", userData.userName)
      );
      const dbUser = await getDocs(queryInstance);
      if (dbUser.empty) throw new Error("El usuario no existe");

      let user = {};
      dbUser.forEach((doc) => {
        user = {
          id: doc.id,
          ...doc.data(),
        };
      });

      if (userData.password !== user.password)
        throw new Error("La contraseña es incorrecta");

      return dispatch({
        type: LOG_IN,
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

export function addClient(userId, client) {
  return async (dispatch) => {
    try {
      if(!userId) throw new Error('Falta el ID de usuario');
      const clients = collection(db, "users", userId, 'clients');
      const newCLient = await addDoc(clients, client);

      if(!newCLient) throw new Error('Error al agregar el cliente');

      const saveCLient = {
        id: newCLient.id,
        ...client
      }

      return dispatch({
        type: ADD_CLIENT,
        payload: saveCLient,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function addProduct(userId, product) {
  return async (dispatch) => {
    try {
      if(!userId) throw new Error('Falta el ID de usuario');
      const productColl = collection(db, "users", userId, "products");
      const newProduct = await setDoc(doc(productColl, product.code), { ...product });

      console.log(newProduct);

      return dispatch({
        type: ADD_PRODUCT,
        payload: product,
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
      if(!userId) throw new Error('Falta ID de usuario');
      const clientColl = collection(db, "users", userId, 'clients');
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
      if(!userId) throw new Error('Falta ID de usuario');
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
