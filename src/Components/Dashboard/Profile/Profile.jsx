import SideBar from "../SideBar/SideBar";

import "../Dashboard.css";
import "./Profile.css";

export default function Profile({
  handleAddInvoice,
  handleAddProduct,
  handleAddClient,
}) {
  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <div className="dashboard__container">
        <div className="dahsboard__profile">
          <form className="to-left">
            <h2>Mi perfil</h2>
            {/* RUC */}
            <div className="mb-3">
              <label className="form-label">RUC</label>
              <input type="number" className="form-control" name="ruc" />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="Email" />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" name="password" />
            </div>

            {true ? (
              <div>
                <button type="submit" className="btn btn-primary">
                  Modificar
                </button>
              </div>
            ) : (
              <div>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>

                <button type="submit" className="btn btn-primary" style={{marginLeft: "20px"}}>
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
