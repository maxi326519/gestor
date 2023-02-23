import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  persistence,
  getUserData,
  getProducts,
  getClients,
  getInvoices,
  openLoading,
  closeLoading
} from "./redux/actions";
import { getAuth } from "firebase/auth";

import Loading from "./Components/Loading/Loading";
import Profile from "./Components/Dashboard/Profile/Profile";
import Products from "./Components/Dashboard/Products/Products";
import Client from "./Components/Dashboard/Client/Client";
import Invoices from "./Components/Dashboard/Invoices/Invoices";
import InvoicesForm from "./Components/Dashboard/InvoicesForm/InvoicesForm";

import ExportInvoice from "./Components/Dashboard/Forms/ExportForm/ExportForm";
import AddProduct from "./Components/Dashboard/Forms/ProductForm/ProductForm";
import AddClient from "./Components/Dashboard/Forms/ClientForm/ClientForm";

import Login from "./Components/Login/Login";
import Signin from "./Components/Signin/Signin";
import UserForm from "./Components/Signin/UserForm/UserForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const auth = getAuth();

  useEffect(() => {
    dispatch(openLoading());
    setTimeout(() => {
      if (auth.currentUser) {
        const user = auth.currentUser;
        dispatch(persistence(user));
        dispatch(getUserData()).then((d) => {
          if (d.payload.EMP_PERFIL.DATOS_PERSONALES &&
            d.payload.EMP_PERFIL.OBLIGACIONES &&
            d.payload.EMP_PERFIL.FACTURA_ELECTRONICA) {
            redirect("/dashboard/invoices/add");
            dispatch(getProducts(user.uid));
            dispatch(getClients(user.uid));
            dispatch(getInvoices(user.uid));
            dispatch(closeLoading());
          } else {
            dispatch(closeLoading());
            redirect("/signin/user");
          }
        });
      } else {
        dispatch(closeLoading());
        redirect("/login");
      }
    }, 1000);
  }, [dispatch]);

  /* FORMS */
  const initialState = {
    addInvoice: false,
    exportInvoice: false,
    addProduct: false,
    addClient: false,
  };
  const [form, setForm] = useState(initialState);

  function handleAddInvoice() {
    setForm({ ...initialState, addInvoice: !form.addInvoice });
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
  /* FORMS */

  return (
    <div className="App">
      {loading ? <Loading /> : null}
      <Routes>
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route
          path="/dashboard/products"
          element={
            <Products
              handleAddInvoice={handleAddInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
            />
          }
        />
        <Route
          path="/dashboard/clients"
          element={
            <Client
              handleAddInvoice={handleAddInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
            />
          }
        />
        <Route
          path="/dashboard/invoices"
          element={
            <Invoices
              handleExportInvoice={handleExportInvoice}
              handleAddInvoice={handleAddInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
            />
          }
        />
        <Route
          path="/dashboard/invoices/add"
          element={
            <InvoicesForm
              addInvoice={form.addInvoice}
              handleExportInvoice={handleExportInvoice}
              handleAddInvoice={handleAddInvoice}
              handleAddProduct={handleAddProduct}
              handleAddClient={handleAddClient}
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signin/user" element={<UserForm />} />
      </Routes>

      <ExportInvoice
        exportInvoice={form.exportInvoice}
        handleExportInvoice={handleExportInvoice}
      />
      <AddProduct
        addProduct={form.addProduct}
        handleAddProduct={handleAddProduct}
      />
      <AddClient addClient={form.addClient} handleAddClient={handleAddClient} />
    </div>
  );
}

export default App;
