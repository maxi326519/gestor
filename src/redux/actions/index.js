import { db, auth } from "../../firebase";
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
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateEmail,
  signOut,
} from "firebase/auth";

export const SIGN_IN = "SIGN_IN";
export const LOG_IN = "LOG_IN";
export const SIGN_OUT = "SIGN_OUT";
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

export const DELETE_CLIENT = "DELETE_CLIENT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

/* SESION */
export function signin(user) {
  return async (dispatch) => {
    try {
      // Verificamos que no exista otro usuario con ese ruc
      const queryInstance = query(
        collection(db, "users"),
        where("EMP_RUC", "==", user.EMP_RUC)
      );
      const dbUser = await getDocs(queryInstance);
      if (!dbUser.empty) throw new Error("El ruc ya existe");

      // Creamos el nuevo usuario
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.EMP_EMAIL,
        user.password
      );

      const userDB = {
        EMP_RUC: user.EMP_RUC,
        EMP_EMAIL: user.EMP_EMAIL,
        EMP_AUTOMATICO: 1 /* default */,
        EMP_CODIGO: 1 /* default */,
        EMP_COMPROBANTES: 1 /* default */,
        EMP_DADICIONAL: 0 /* default */,
        EMP_ESTADO: 1 /* default */,
        EMP_FECHA: new Date().toLocaleDateString(),
        EMP_GUIAREMISION: 1 /* default */,
        EMP_LICENCIA: "NORMAL",
        EMP_MENSAJE: "" /* default */,
        EMP_MULTILOCAL: 1 /* default */,
        EMP_MULTIUSUARIO: 0 /* default */,
        EMP_NCE: 100 /* Limite de factura */,
        EMP_NOTIFICACION: 0 /* default */,
        EMP_USUKEY: userCredential.user.uid /* Id del usuarios */,
        EMP_SECUENCIAL: 1 /* Numero de facturas en DB */,
        EMP_IMPUESTO: 0,
        EMP_PERFIL: {
          DATOS_PERSONALES: false,
          OBLIGACIONES: false,
          FACTURA_ELECTRONICA: false,
        },
      };

      // Almacenamos los primeros datos sobre el usuario,
      // y le indicamos que el perfil todavia no esta completo
      await setDoc(doc(db, "users", userCredential.user.uid), userDB);

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
        const queryInstance = query(
          collection(db, "users"),
          where("ruc", "==", newData.EMP_RUC)
        );
        const dbUser = await getDocs(queryInstance);
        if (!dbUser.empty) throw new Error("El ruc ya existe");
      }

      const updateData = {
        ...newData,
        EMP_PERFIL: {
          DATOS_PERSONALES: true,
          OBLIGACIONES: false,
          FACTURA_ELECTRONICA: false,
        },
      };

      await updateDoc(doc(db, "users", auth.currentUser.uid), updateData);

      return dispatch({
        type: CONFIRM_REGISTER,
        payload: updateData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function confirmObligaciones(newData) {
  return async (dispatch) => {
    try {
      const updateData = {
        ...newData,
        EMP_PERFIL: {
          DATOS_PERSONALES: true,
          OBLIGACIONES: true,
          FACTURA_ELECTRONICA: false,
        },
      };

      await updateDoc(doc(db, "users", auth.currentUser.uid), updateData);

      return dispatch({
        type: CONFIRM_REGISTER,
        payload: updateData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function confirmFacturaElectronica(newData) {
  return async (dispatch) => {
    try {
      const updateData = {
        ...newData,
        EMP_PERFIL: {
          DATOS_PERSONALES: true,
          OBLIGACIONES: true,
          FACTURA_ELECTRONICA: true,
        },
      };

      await updateDoc(doc(db, "users", auth.currentUser.uid), updateData);

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
        collection(db, "users"),
        where("EMP_RUC", "==", `${userData.EMP_RUC}`)
      );
      const dbUser = await getDocs(queryInstance);

      if (dbUser.empty) throw new Error("El ruc no existe");

      // Si existe nos traemos el email y hacemos la Auth
      const email = dbUser.docs[0].data().EMP_EMAIL;

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
      /*       const credential = GoogleAuthProvider.credentialFromResult(response); */

      const user = response.user;
      /*       const token = credential.accessToken; */

      const dataUser = await getDoc(doc(db, "users", auth.currentUser.uid));
      let userDB = dataUser.data();

      if (userDB) {
        userDB = dataUser.data();
      } else {
        userDB = {
          EMP_EMAIL: user.email,
          EMP_AUTOMATICO: 1 /* default */,
          EMP_CODIGO: 1 /* default */,
          EMP_COMPROBANTES: 1 /* default */,
          EMP_DADICIONAL: 0 /* default */,
          EMP_ESTADO: 1 /* default */,
          EMP_FECHA: new Date().toLocaleDateString(),
          EMP_GUIAREMISION: 1 /* default */,
          EMP_LICENCIA: "NORMAL",
          EMP_MENSAJE: "" /* default */,
          EMP_MULTILOCAL: 1 /* default */,
          EMP_MULTIUSUARIO: 0 /* default */,
          EMP_NCE: 100 /* Limite de factura */,
          EMP_NOTIFICACION: 0 /* default */,
          EMP_USUKEY: user.uid /* Id del usuarios */,
          EMP_SECUENCIAL: 1 /* Numero de facturas en DB */,
          EMP_IMPUESTO: 0,
          EMP_PERFIL: {
            DATOS_PERSONALES: false,
            OBLIGACIONES: false,
            FACTURA_ELECTRONICA: false,
          },
        };

        await setDoc(doc(db, "users", user.uid), userDB);
      }

      return dispatch({
        type: SIGN_IN,
        payload: { ...user, userDB},
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function logOut() {
  return async (dispatch) => {
    await signOut(auth);

    return dispatch({
      type: SIGN_OUT,
    });
  };
}
/* SESION */

/* USER DATA */
export function getUserData() {
  return async (dispatch) => {
    try {
      const dataUser = await getDoc(doc(db, "users", auth.currentUser.uid));
      const userDB = dataUser.data();

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

export function uploadLogo(logo) {}

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

export function postClient(client) {
  return async (dispatch) => {
    try {
      const clients = collection(db, "users", auth.currentUser.uid, "clients");
      const newCLient = await addDoc(clients, {
        ...client,
        USU_KEY: auth.currentUser.uid,
      });

      if (!newCLient) throw new Error("Error al agregar el cliente");

      const saveCLient = {
        ...client,
        CLI_CODIGO: newCLient.id,
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

export function postInvoice(invoice) {
  return async (dispatch) => {
    try {
      const date = invoice.VEN_FECHA.split("-");
      const year = date[0];
      const month = date[1];

      const invoiceRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "invoices"
      );
      const yearDoc = doc(invoiceRef, year);
      const query = await addDoc(collection(yearDoc, month), invoice);

      const newInvoice = {
        ...invoice,
        VEN_CODIGO: query.id,
      };

      return dispatch({
        type: POST_INVOICE,
        payload: newInvoice,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getClients() {
  return async (dispatch) => {
    try {
      const clientColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "clients"
      );
      const query = await getDocs(clientColl);

      let clients = [];

      if (!query.empty) {
        query.forEach((doc) => {
          clients.push({
            ...doc.data(),
            CLI_CODIGO: doc.id,
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

      return dispatch({
        type: GET_PRODUCTS,
        payload: products,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function getInvoices(year, month, day) {
  return async (dispatch) => {
    try {
      let invoices = [];
      let invoicesMonth = [];
      const invoiceColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "invoices"
      ); // Accedemos a las colecciones de todas las facturas

      console.log(year, month, day);
      
      if (day && month && year) {
        const yearDoc = doc(invoiceColl, year); // Accedemos a las facturas de un a??o en especifico
        const monthDoc = collection(yearDoc, month); // Accedemos a las facturas de un mes en especifico
        const date = `${year}-${month}-${day}`;

        const q = query(monthDoc, where("VEN_FECHA", "==", date));

        const response = await getDocs(q);

        if (!response.empty) {
          response.forEach((doc) => {
            invoices.push({
              ...doc.data(),
              VEN_CODIGO: doc.id,
            });
          });
        }
      } else if (month && year) {
        const yearDoc = doc(invoiceColl, year); // Accedemos a las facturas de un a??o en especifico
        const monthDoc = collection(yearDoc, month); // Accedemos a las facturas de un mes en especifico

        const query = await getDocs(monthDoc);

        if (!query.empty) {
          query.forEach((doc) => {
            invoices.push({
              ...doc.data(),
              VEN_CODIGO: doc.id,
            });
          });
        }
      } else if (year) {
        const yearDoc = doc(invoiceColl, year); // Accedemos a las facturas de un a??o en especifico

        const enero = await getDocs(collection(yearDoc, "01"));
        const febrero = await getDocs(collection(yearDoc, "02"));
        const marzo = await getDocs(collection(yearDoc, "03"));
        const abril = await getDocs(collection(yearDoc, "04"));
        const mayo = await getDocs(collection(yearDoc, "05"));
        const junio = await getDocs(collection(yearDoc, "06"));
        const julio = await getDocs(collection(yearDoc, "07"));
        const agosto = await getDocs(collection(yearDoc, "08"));
        const septiembre = await getDocs(collection(yearDoc, "09"));
        const octubre = await getDocs(collection(yearDoc, "10"));
        const noviembre = await getDocs(collection(yearDoc, "11"));
        const diciembre = await getDocs(collection(yearDoc, "12"));

        invoicesMonth.push(enero);
        invoicesMonth.push(febrero);
        invoicesMonth.push(marzo);
        invoicesMonth.push(abril);
        invoicesMonth.push(mayo);
        invoicesMonth.push(junio);
        invoicesMonth.push(julio);
        invoicesMonth.push(agosto);
        invoicesMonth.push(septiembre);
        invoicesMonth.push(octubre);
        invoicesMonth.push(noviembre);
        invoicesMonth.push(diciembre);

        invoicesMonth
          .filter((month) => {
            if (month.empty) return false;
            return true;
          })
          .forEach((month) => {
            month.forEach((doc) => {
              invoices.push({
                ...doc.data(),
                VEN_CODIGO: doc.id,
              });
            });
          });
      } else {
        throw new Error("Faltan parametros para acceder a 'invoices'");
      }

      return dispatch({
        type: GET_INVOICES,
        payload: invoices,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function updateClient(id, clientData) {
  return async (dispatch) => {
    try {
      const clienColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "clients"
      );
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

export function updateInvoice(id, invoiceData) {
  return async (dispatch) => {
    try {
      const dateSplit = invoiceData.VEN_FECHA.split("-");
      const year = dateSplit[0];
      const month = `0${dateSplit[1]}`.slice(-2);

      const invoiceColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "invoices"
      ); // Accedemos a las colecciones de todas las facturas
      const yearDoc = doc(invoiceColl, year); // Accedemos a las facturas de un a??o en especifico
      const monthDoc = collection(yearDoc, month); // Accedemos a las facturas de un mes en especifico

      await updateDoc(doc(monthDoc, id), invoiceData);

      dispatch({
        type: UPDATE_INVOICE,
        payload: invoiceData,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
}

export function deleteClient(id) {
  return async (dispatch) => {
    try {
      const clienColl = collection(
        db,
        "users",
        auth.currentUser.uid,
        "clients"
      );
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