import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { login, logOut } from "./redux/actions";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Loading from './Components/Loading/Loading';
import Products from './Components/Dashboard/Products/Products';
import Client from './Components/Dashboard/Client/Client';
import Invoices from './Components/Dashboard/Invoices/Invoices';
import Login from './Components/Login/Login';
import Signin from './Components/Signin/Signin';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const redirect = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(login(userData))
      .then(()=> redirect('/dashboard/invoices'))
      .catch(() => dispatch(logOut()))
    } else {
      redirect("/login");
    }
  },[dispatch]);

  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Loading/>}/>
        <Route path="/dashboard/products" element={<Products/>} />
        <Route path="/dashboard/clients" element={<Client/>} />
        <Route path="/dashboard/invoices" element={<Invoices/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </div>
  );
}

export default App;