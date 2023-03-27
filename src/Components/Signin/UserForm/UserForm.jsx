import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeLoading } from "../../../redux/actions";

import PersonalData from "./PersonalData/PersonalData";
import OtherData from "./OtherData/OtherData";

import "./UserForm.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Signin() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const user = useSelector((state) => state.user.userDB);

  useEffect(() => {
    if (
      user.EMP_PERFIL.DATOS_PERSONALES &&
      user.EMP_PERFIL.OBLIGACIONES &&
      user.EMP_PERFIL.FACTURA_ELECTRONICA
    ) {
      dispatch(closeLoading());
      redirect("/dashboard/invoices/add");
    }
  });

  return (
    <div className="signin">
      <div className="container">
        <div className="register_bar">
          <span className={user.EMP_PERFIL.DATOS_PERSONALES ? "active" : ""}>
            1
          </span>
          <div
            className={`progress_bar ${
              user.EMP_PERFIL.DATOS_PERSONALES ? "active" : ""
            }`}
          ></div>
          <span className={user.EMP_PERFIL.OBLIGACIONES ? "active" : ""}>
            2
          </span>
        </div>
        {!user.EMP_PERFIL.DATOS_PERSONALES ? <PersonalData /> : null}

        {user.EMP_PERFIL.DATOS_PERSONALES && !user.EMP_PERFIL.OTHER_DATA ? (
          <OtherData />
        ) : null}
      </div>
    </div>
  );
}
