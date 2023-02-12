import { useState } from "react";

import PersonalData from "./PersonalData/PersonalData";
import Obligations from "./Obligations/Obligations";
import ElectronicInvoice from "./ElectronicInvoice/ElectronicInvoice";

import "./UserForm.css";
import { useSelector } from "react-redux";

export default function Signin() {
  const user = useSelector((state) => state.user.userDB);

  return (
    <div className="signin">
      <div className="container">
        <div className="register_bar">
          <span className={user.EMP_PERFIL.DATOS_PERSONALES ? "active" : ""}>
            1
          </span>
          <div
            className={`progress_bar ${
              user.EMP_PERFIL.DATOS_PERSONALES && !user.EMP_PERFIL.OBLIGACIONES
                ? "active"
                : ""
            }`}
          ></div>
          <span>2</span>
          <div className="progress_bar"></div>
          <span>3</span>
        </div>
        {!user.EMP_PERFIL.DATOS_PERSONALES ? <PersonalData /> : null}

        {user.EMP_PERFIL.DATOS_PERSONALES && !user.EMP_PERFIL.OBLIGACIONES ? (
          <Obligations />
        ) : null}

        {user.EMP_PERFIL.DATOS_PERSONALES &&
        user.EMP_PERFIL.OBLIGACIONES &&
        !user.EMP_PERFIL.FACTURA_ELECTRONICA ? (
          <ElectronicInvoice />
        ) : null}

        {user.EMP_PERFIL.DATOS_PERSONALES &&
        user.EMP_PERFIL.OBLIGACIONES &&
        user.EMP_PERFIL.FACTURA_ELECTRONICA
          ? "Perfil completado"
          : null}
      </div>
    </div>
  );
}
