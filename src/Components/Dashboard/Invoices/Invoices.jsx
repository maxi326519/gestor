import SideBar from "../SideBar/SideBar";
import InvoicesList from "./InvoicesList/InvoicesList";

import "../Dashboard.css";

export default function Invoices({
  handleAddProduct,
  handleAddStock,
  handleAddClient,
  handleProfile,
  handleAddEstablecimiento,
}) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddProduct={handleAddProduct}
              handleAddStock={handleAddStock}
              handleAddClient={handleAddClient}
        handleAddEstablecimiento={handleAddEstablecimiento}
      />
      <div className="dashboard__container to-left">
        <InvoicesList
          handleProfile={handleProfile}
        />
      </div>
    </div>
  );
}
