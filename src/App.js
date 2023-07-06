import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { getStores } from "./redux/actions/stores/index";
import {
  persistence,
  getUserData,
  getProducts,
  getClients,
  getInvoices,
  openLoading,
  closeLoading,
} from "./redux/actions";
import swal from "sweetalert";

import useListeners from "./listeners";
import Loading from "./Components/Loading/Loading";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ResetEmail from "./Components/ResetEmail/ResetEmail";
import Profile from "./Components/Dashboard/Profile/Profile";
import InvoicesForm from "./Components/Dashboard/InvoicesForm/InvoicesForm";
import Movements from "./Components/Dashboard/Movements/Movements";

import Invoices from "./Components/Dashboard/Invoices/Invoices";
import Products from "./Components/Dashboard/Products/Products";
import Client from "./Components/Dashboard/Client/Client";
import Stores from "./Components/Dashboard/Stores/Stores";

import ExportInvoice from "./Components/Dashboard/Forms/ExportForm/ExportForm";
import ProductForm from "./Components/Dashboard/Forms/ProductForm/ProductForm";
import ClientForm from "./Components/Dashboard/Forms/ClientForm/ClientForm";
import EstablecimientoForm from "./Components/Dashboard/Forms/EstablecimientoForm/EstablecimientoForm";

import Login from "./Components/Login/Login";
import Signin from "./Components/Signin/Signin";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Kardex from "./Components/Dashboard/Kardex/Kardex";

function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const listener = useListeners();
  const loading = useSelector((state) => state.loading);
  const [profile, setProfile] = useState(false);

  useEffect(async () => {
    const date = new Date().toLocaleDateString().split("/");
    const year = date[2];
    const month = `0${date[1]}`.slice(-2);

    dispatch(openLoading());
    let intentos = 0;

    do {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      intentos++;
      console.log(intentos);
      // Leemos la sesion del usuario
      if (auth.currentUser) {
        listener.init(auth, db, dispatch);

        // Si existe cargamos los datos
        intentos = 5;
        const user = auth.currentUser;

        dispatch(persistence(user));
        dispatch(getUserData())
          .then((d) => {
            // Si el registro esta completo cargamos los datos
            if (
              d.payload.EMP_PERFIL.DATOS_PERSONALES &&
              d.payload.EMP_PERFIL.OTROS_DATOS
            ) {
              Promise.all([
                dispatch(getProducts()),
                dispatch(getClients()),
                dispatch(getInvoices(year, month, null)),
                dispatch(getStores()),
              ])
                .then(() => {
                  dispatch(closeLoading());
                  redirect("/dashboard/invoices/add");
                })
                .catch((err) => {
                  console.log(err);
                  dispatch(closeLoading());
                  swal(
                    "Error",
                    "Error al cargar los datos, intentelo mas tarder",
                    "error"
                  );
                  redirect("/dashboard/invoices/add");
                });
            } else {
              // Si el registro esta incompleto vamos a completar el registro
              dispatch(closeLoading());
              redirect("/signin");
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Hubo un error desconocido al iniciar sesion",
              "error"
            );
          });
      } else {
        // Si no existe y se llego al maximo de intentos vamos a iniciar sesion
        if (intentos >= 5) {
          dispatch(closeLoading());
          redirect("/login");
        }
      }
    } while (intentos < 5);
  }, [auth, dispatch]);

  /* FORMS */
  const initialState = {
    addInvoice: false,
    exportInvoice: false,
    addProduct: false,
    addClient: false,
    addEstablecimiento: false,
  };
  const [form, setForm] = useState(initialState);

  function handleProfile() {
    setProfile(!profile);
  }

  function handleExportInvoice() {
    setForm({ ...initialState, exportInvoice: !form.exportInvoice });
  }

  function handleAddProduct() {
    setForm({ ...initialState, addProduct: !form.addProduct });
  }

  function handleAddClient() {
    setForm({ ...initialState, addClient: !form.addClient });
  }

  function handleAddEstablecimiento() {
    setForm({ ...initialState, addEstablecimiento: !form.addEstablecimiento });
  }
  /* FORMS */

  return (
    <div className="App">
      {loading ? <Loading /> : null}
      {profile ? <Profile handleProfile={handleProfile} /> : null}
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route
          path="/dashboard/products"
          element={
            <Products
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
              handleProfile={handleProfile}
              handleAddEstablecimiento={handleAddEstablecimiento}
            />
          }
        />
        <Route
          path="/dashboard/clients"
          element={
            <Client
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
              handleProfile={handleProfile}
              handleAddEstablecimiento={handleAddEstablecimiento}
            />
          }
        />
        <Route
          path="/dashboard/invoices"
          element={
            <Invoices
              handleExportInvoice={handleExportInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
              handleProfile={handleProfile}
              handleAddEstablecimiento={handleAddEstablecimiento}
            />
          }
        />
        <Route
          path="/dashboard/stores"
          element={
            <Stores
              handleExportInvoice={handleExportInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
              handleProfile={handleProfile}
              handleAddEstablecimiento={handleAddEstablecimiento}
            />
          }
        />
        <Route
          path="/dashboard/movements"
          element={
            <Movements
              handleExportInvoice={handleExportInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
              handleProfile={handleProfile}
              handleAddEstablecimiento={handleAddEstablecimiento}
            />
          }
        />
        <Route
          path="/dashboard/kardex"
          element={
            <Kardex
              handleExportInvoice={handleExportInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
              handleProfile={handleProfile}
              handleAddEstablecimiento={handleAddEstablecimiento}
            />
          }
        />
        <Route
          path="/dashboard/invoices/add"
          element={
            <InvoicesForm
              addInvoice={form.addInvoice}
              handleExportInvoice={handleExportInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
              handleProfile={handleProfile}
              handleAddEstablecimiento={handleAddEstablecimiento}
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

      {form.exportInvoice && (
        <ExportInvoice handleExportInvoice={handleExportInvoice} />
      )}
      {form.addProduct && <ProductForm handleAddProduct={handleAddProduct} />}
      {form.addClient && <ClientForm handleAddClient={handleAddClient} />}
      {form.addEstablecimiento && (
        <EstablecimientoForm
          handleAddEstablecimiento={handleAddEstablecimiento}
        />
      )}
    </div>
  );
}

export default App;
