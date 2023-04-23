import {
  SIGN_IN,
  LOG_IN,
  LOG_OUT,
  PERSISTENCE,
  CONFIRM_REGISTER,
  signin,
  login,
  confirmDatosPersonales,
  confirmData,
  logOut,
  persistence,
} from "./sesion";

import {
  OPEN_LOADING,
  CLOSE_LOADING,
  openLoading,
  closeLoading,
} from "./loading";

import {
  GET_USER_DATA,
  UPDATE_PROFILE,
  UPLOAD_LOGO,
  UPLOAD_FILE,
  UPDATE_EMAIL,
  getUserData,
  updateUserData,
  uploadLogo,
  uploadFile,
  changePassword,
  changeEmail,
} from "./user";

import {
  POST_INVOICE,
  GET_INVOICES,
  UPDATE_INVOICE,
  postInvoice,
  getInvoices,
  updateInvoice,
} from "./invoices";

import {
  POST_CLIENT,
  GET_CLIENTS,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  postClient,
  getClients,
  updateClient,
  deleteClient,
} from "./client";

import {
  POST_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  postProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "./product";

export {
  SIGN_IN,
  LOG_IN,
  LOG_OUT,
  CONFIRM_REGISTER,
  PERSISTENCE,
  OPEN_LOADING,
  CLOSE_LOADING,
  UPLOAD_LOGO,
  UPLOAD_FILE,
  POST_CLIENT,
  POST_PRODUCT,
  POST_INVOICE,
  GET_USER_DATA,
  GET_CLIENTS,
  GET_PRODUCTS,
  GET_INVOICES,
  UPDATE_PROFILE,
  UPDATE_CLIENT,
  UPDATE_PRODUCT,
  UPDATE_INVOICE,
  UPDATE_EMAIL,
  DELETE_CLIENT,
  DELETE_PRODUCT,
  login,
  persistence,
  logOut,
  signin,
  confirmDatosPersonales,
  confirmData,
  getUserData,
  updateUserData,
  uploadLogo,
  uploadFile,
  changePassword,
  changeEmail,
  openLoading,
  closeLoading,
  postClient,
  postProduct,
  postInvoice,
  getClients,
  getProducts,
  getInvoices,
  updateClient,
  updateProduct,
  updateInvoice,
  deleteClient,
  deleteProduct,
};

/* import * as sesion from "./sesion";
import * as loading from "./loading";
import * as user from "./user";
import * as invoices from "./invoices";
import * as client from "./client";
import * as product from "./product";

export const modules = {
  ...sesion,
  ...loading,
  ...user,
  ...invoices,
  ...client,
  ...product,
};
 */
