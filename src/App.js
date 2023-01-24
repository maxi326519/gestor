import { Routes, Route } from 'react-router-dom';

import Products from './Components/Dashboard/Products/Products';
import Client from './Components/Dashboard/Client/Client';
/* import Invoices from './Components/Dashboard/Invoices/Invoices'; */
import Login from './Components/Login/Login';
import Signin from './Components/Signin/Signin';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard/products" element={<Products/>} />
        <Route path="/dashboard/clients" element={<Client/>} />
{/*         <Route path="/dashboard/invoices" element={<Invoices/>} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </div>
  );
}

export default App;
