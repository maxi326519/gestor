import SideBar from "../SideBar/SideBar";
import ClientList from "./ClientList/ClientList";

import "../Dashboard.css";

export default function Client({ handleAddInvoice, handleAddProduct, handleAddClient }) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <div className="dashboard__container to-left">
        <ClientList handleAddClient={handleAddClient} />
      </div>
    </div>
  );
}
