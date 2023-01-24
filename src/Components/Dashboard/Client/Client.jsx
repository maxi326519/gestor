
import SideBar from "../SideBar/SideBar";
import ClientForm from "./ClientForm/ClientForm";
import ClientList from "./ClientList/ClientList";

import "./Client.css";

export default function Client() {
  return (
    <div className="clients">
      <SideBar />
      <div className="clients__container">
        <ClientList />
        <ClientForm />
      </div>
    </div>
  );
}
