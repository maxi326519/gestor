import SideBar from "../SideBar/SideBar";
import InvoicesList from "./InvoicesList/InvoicesList";

import "../Dashboard.css";

export default function Invoices({
  handleExportInvoice,
  handleAddProduct,
  handleAddClient,
  handleProfile,
  handleAddEstablecimiento,
}) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
        handleAddEstablecimiento={handleAddEstablecimiento}
      />
      <div className="dashboard__container to-left">
        <InvoicesList
          handleExportInvoice={handleExportInvoice}
          handleProfile={handleProfile}
        />
      </div>
    </div>
  );
}
