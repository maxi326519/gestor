import React from "react";
import { useSelector } from "react-redux";

import UserCard from "./UserCard/UserCard";

import "./UserList.css";

export default function UserList() {
   const users = useSelector((state) => state.users.data);

  return (
    <div className="userList">
      <h3>Listado de Usuarios</h3>
      {
        users?.map( m =>
          <UserCard
            name={m.name}
            userName={m.userName}
            email={m.email}
            adress={m.adress}
            phone={m.phone}
          />
        )
      }
    </div>
  );
}