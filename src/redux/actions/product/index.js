import { db, auth } from "../../../firebase";
import { ref, push, set, get, update, remove, child } from "firebase/database";

export const POST_PRODUCT = "ADD_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export function postProduct(product) {
  return async (dispatch) => {
    try {
      const productsRef = ref(db, `users/${auth.currentUser.uid}/products`);
      const newProductRef = push(productsRef);
      if (!newProductRef) throw new Error("Error al agregar el producto");
      const newProductId = newProductRef.key;
      const newProductData = {
        ...product,
        USU_KEY: auth.currentUser.uid,
        ITE_CODIGO: newProductId,
      };

      set(newProductRef, newProductData);

      return dispatch({
        type: "ADD_PRODUCT",
        payload: newProductData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getProducts() {
  return async (dispatch) => {
    try {
      const productsRef = ref(db, `users/${auth.currentUser.uid}/products`);
      const query = await get(productsRef);
      let products = [];

      if (query.exists()) {
        const productsData = query.val();
        Object.keys(productsData).forEach((key) => {
          products.push({
            ...productsData[key],
            ITE_CODIGO: key,
          });
        });
      }

      dispatch({
        type: "GET_PRODUCTS",
        payload: products,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function updateProduct(productData) {
  return async (dispatch) => {
    try {
      const productsRef = ref(db, `users/${auth.currentUser.uid}/products`);
      await update(child(productsRef, productData.ITE_CODIGO), productData);
      return dispatch({
        type: "UPDATE_PRODUCT",
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
      const productsRef = ref(db, `users/${auth.currentUser.uid}/products`);
      await remove(child(productsRef, code));
      return dispatch({
        type: "DELETE_PRODUCT",
        payload: code,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}
