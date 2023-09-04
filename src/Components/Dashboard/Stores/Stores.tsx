import SideBar from "../SideBar/SideBar";
import StoresList from "./StoresList/StoresList";

import "../Dashboard.css";

interface Props {
  handleAddProduct: () => void;
  handleAddStock: () => void;
  handleAddClient: () => void;
  handleProfile: () => void;
  handleAddEstablecimiento: () => void;
}

export default function Stores({
  handleAddProduct,
  handleAddStock,
  handleAddClient,
  handleProfile,
  handleAddEstablecimiento,
}: Props) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddProduct={handleAddProduct}
        handleAddStock={handleAddStock}
        handleAddClient={handleAddClient}
        handleAddEstablecimiento={handleAddEstablecimiento}
      />
      <div className="dashboard__container to-left">
        <StoresList
          handleAddProduct={handleAddProduct}
          handleProfile={handleProfile}
        />
      </div>
    </div>
  );
}
