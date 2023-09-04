import SideBar from "../SideBar/SideBar";
import KardexList from "./KardexList/KardexList";

import "../Dashboard.css";

interface Props {
  handleAddProduct: () => void;
  handleAddStock: () => void;
  handleAddClient: () => void;
  handleProfile: () => void;
  handleAddEstablecimiento: () => void;
}

export default function Kardex({
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
        <KardexList handleProfile={handleProfile} />
      </div>
    </div>
  );
}
