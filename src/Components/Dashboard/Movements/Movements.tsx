import SideBar from "../SideBar/SideBar";
import MovementsList from "./MovementsList/MovementsList";

import "../Dashboard.css";

interface Props {
  handleAddProduct: () => void;
  handleAddClient: () => void;
  handleProfile: () => void;
  handleAddEstablecimiento: () => void;
}

export default function Movements({
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
        <MovementsList handleProfile={handleProfile} />
      </div>
    </div>
  );
}
