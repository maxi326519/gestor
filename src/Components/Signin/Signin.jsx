import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeLoading } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

import Sesion from "./Sesion/Sesion";
import PersonalData from "./PersonalData/PersonalData";
import OtherData from "./OtherData/OtherData";

import "./Signin.css";

export default function Signin() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const user = useSelector((state) => state.user.userDB);
  const [form, setForm] = useState(1);

  useEffect(() => {
    if (!auth.currentUser) {
      setForm(1);
    } else if (auth.currentUser && !user.EMP_PERFIL.DATOS_PERSONALES) {
      setForm(2);
    } else if (
      auth.currentUser &&
      user.EMP_PERFIL.DATOS_PERSONALES &&
      !user.EMP_PERFIL.OTROS_DATOS
    ) {
      setForm(3);
    } else if (
      auth.currentUser &&
      user.EMP_PERFIL.DATOS_PERSONALES &&
      user.EMP_PERFIL.OTROS_DATOS
    ) {
      dispatch(closeLoading());
      redirect("/dashboard/invoices/add");
    }
  }, [user, dispatch, redirect]);

  return (
    <div className="signin">
      <div className="container">
        <div className="register_bar">
          <span className={form >= 1 ? "active" : ""}>1</span>
          <div className={`progress_bar ${form >= 2 ? "active" : ""}`}></div>
          <span className={form >= 2 ? "active" : ""}>2</span>
          <div className={`progress_bar ${form >= 3 ? "active" : ""}`}></div>
          <span className={form >= 3 ? "active" : ""}>3</span>
        </div>
        {form === 1 ? (
          <Sesion />
        ) : form === 2 ? (
          <PersonalData />
        ) : form === 3 ? (
          <OtherData />
        ) : null}
      </div>
    </div>
  );
}
