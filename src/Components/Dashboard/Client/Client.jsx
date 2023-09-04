import SideBar from "../SideBar/SideBar";
import ClientList from "./ClientList/ClientList";

import "../Dashboard.css";

export default function Client({
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
        <ClientList
          handleAddClient={handleAddClient}
          handleProfile={handleProfile}
        />
      </div>
    </div>
  );
}
