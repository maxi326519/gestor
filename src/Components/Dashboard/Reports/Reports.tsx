import React from "react";

import SideBar from "../SideBar/SideBar";
import ReportsList from "./ReportsList/ReportsList";

import "../Dashboard.css";

interface Props {
  handleAddProduct: () => void;
  handleAddClient: () => void;
  handleProfile: () => void;
  handleAddEstablecimiento: () => void;
}

export default function Reports({
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
        <ReportsList
          handleAddProduct={handleAddProduct}
          handleProfile={handleProfile}
        />
      </div>
    </div>
  );
}
