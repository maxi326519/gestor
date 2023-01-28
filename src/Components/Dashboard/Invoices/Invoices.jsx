import SideBar from "../SideBar/SideBar";
import InvoicesList from "./InvoicesList/InvoicesList";

import '../Dashboard.css';

export default function Invoices({ handleAddInvoice, handleExportInvoices }) {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard__container">
        <InvoicesList handleAddInvoice={handleAddInvoice} handleExportInvoices={handleExportInvoices}/>
      </div>
    </div>
  );
}
