import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { uploadUser } from "../../../redux/actions";

import SideBar from "../SideBar/SideBar";

import "../Dashboard.css";
import "./Profile.css";

export default function Profile({
  handleAddInvoice,
  handleAddProduct,
  handleAddClient,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userData, setUser] = useState({
    ruc: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    setUser({
      ruc: user.ruc,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      password: user.password,
    });
  }, [user]);

  function handleChange(e) {
    setUser({ ...userData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    console.log(user.uid);
    console.log(userData);
    e.preventDefault();
    dispatch(uploadUser(user.uid, userData));
  }

  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <div className="dashboard__container">
        <div className="dahsboard__profile">
          <div className="to-left">
            <h2>Mi perfil</h2>

            {/* RUC */}
            <div className="mb-3">
              <label className="form-label">RUC</label>
              <input
                type="number"
                className="form-control"
                name="ruc"
                value={userData.ruc}
                onChange={handleChange}
              />
            </div>

            {/* Nombre */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
            </div>

            {/* Telefono */}
            <div className="mb-3">
              <label className="form-label">Telefono</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>

            {true ? (
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Modificar
                </button>
              </div>
            ) : (
              <div>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginLeft: "20px" }}
                  onChange={handleChange}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
