import SideBar from "../SideBar/SideBar";
import InvoicesList from "./InvoicesList/InvoicesList";

import "../Dashboard.css";

export default function Invoices({
  handleAddInvoice,
  handleExportInvoices,
  handleAddProduct,
  handleAddClient,
}) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <div className="dashboard__container">
        <InvoicesList
          handleAddInvoice={handleAddInvoice}
          handleExportInvoices={handleExportInvoices}
        />
      </div>
    </div>
  );
}
