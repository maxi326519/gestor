import { db, auth } from "../../../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const POST_PRODUCT = "ADD_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export function postProduct(product) {
return async (dispatch) => {
    try {
      const productColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "products"
      );

      const newProduct = {
        ...product,
        USU_KEY: auth.currentUser.uid,
      };

      await setDoc(doc(productColl, product.ITE_CODIGO), {
        ...product,
        USU_KEY: auth.currentUser.uid,
      });

      return dispatch({
        type: POST_PRODUCT,
        payload: newProduct,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getProducts() {
  return async (dispatch) => {
    try {
      const productColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "products"
      );
      const query = await getDocs(productColl);

      let products = [];

      if (!query.empty) {
        query.forEach((doc) => {
          products.push(doc.data());
        });
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: products,
      });
    } catch (err) {
      throw new Error({ GetProducts: err });
    }
  };
}

export function updateProduct(productData) {
  return async (dispatch) => {
    try {
      const productColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "products"
      );
      await updateDoc(doc(productColl, productData.ITE_CODIGO), productData);

      return dispatch({
        type: UPDATE_PRODUCT,
        payload: productData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function deleteProduct(code) {
  return async (dispatch) => {
    try {
      const productColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "products"
      );
      await deleteDoc(doc(productColl, code));

      return dispatch({
        type: DELETE_PRODUCT,
        payload: code,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
