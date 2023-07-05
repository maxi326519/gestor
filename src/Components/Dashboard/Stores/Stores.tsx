import SideBar from "../SideBar/SideBar";
import StoresList from "./StoresList/StoresList";

import "../Dashboard.css";

interface Props {
  handleAddProduct: () => void;
  handleAddClient: () => void;
  handleProfile: () => void;
  handleAddEstablecimiento: () => void;
}

export default function Stores({
  handleAddProduct,
  handleAddClient,
  handleProfile,
  handleAddEstablecimiento,
}: Props) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddProduct={handleAddProduct}
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
