import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { login, logOut, getProducts, getClients, getInvoices } from "./redux/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(login(userData))
        .then(() => {
          dispatch(getProducts(userData.uid));
          dispatch(getClients(userData.uid));
          dispatch(getInvoices(userData.uid));
          redirect("/dashboard/invoices/add");
        })
        .catch((e) => {
          console.log(e);
          dispatch(logOut());
        });
    } else {
      redirect("/login");
    }
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
    console.log(form);
    setForm({ ...initialState, addInvoice: !form.addInvoice });
  }

  function handleExportInvoice() {
    console.log(form);
    setForm({ ...initialState, exportInvoice: !form.exportInvoice });
  }

  function handleAddProduct() {
    console.log(form);
    setForm({ ...initialState, addProduct: !form.addProduct });
  }

  function handleAddClient() {
    console.log(form);
    setForm({ ...initialState, addClient: !form.addClient });
  }
  /* FORMS */

  return (
    <div className="App">
      <ToastContainer />
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
              handleAddInvoice={handleAddInvoice}
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