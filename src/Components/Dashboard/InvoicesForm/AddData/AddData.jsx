import SearchClient from "./SearchClient/SearchClient";
import SearchProduct from "./SearchProduct/SearchProduct";

import addSquare from "../../../../assets/svg/add-square.svg";

import "./AddData.css";

export default function AddData({
  invoice,
  handleChange,
  handleFormClient,
  handleFormProduct,
  handleClient,
  handleProduct,
}) {
  return (
    <div>
      <div class="invoice-data__client-data">
        {/* Client */}
        <h3>Cliente</h3>

        <div className="search-container-btn">
          <SearchClient handleClient={handleClient} />
          <button className="btn btn-primary" onClick={handleFormClient}>
            <img src={addSquare} alt="add client" />
            <span>Cliente</span>
          </button>
        </div>

        <div className="grid">
          <div className="form-floating mb-3">
            <input
              class="form-control"
              type="text"
              value={invoice.CLI_IDENTIFICACION}
              disabled
            />
            <label>
              {
                invoice.CLI_TIPOIDE === "05"
                ? "Cedula"
                : invoice.CLI_TIPOIDE === "06"
                ? "Pasaporte"
                : "Ruc"
              }
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              class="form-control"
              type="text"
              value={invoice.CLI_DIRECCION}
              disabled
            />
            <label>Direccion</label>
          </div>

          <div className="form-floating mb-3">
            <input
              class="form-control"
              type="text"
              value={invoice.CLI_TELEFONO}
              disabled
            />
            <label>Telefono</label>
          </div>

          <div className="form-floating mb-3">
            <input
              class="form-control"
              type="text"
              value={invoice.CLI_NOMBRE}
              disabled
            />
            <label>Sr. (es)</label>
          </div>
        </div>

        {/* Product */}
        <div className="search-container-btn">
          <SearchProduct handleProduct={handleProduct} />
          <button className="btn btn-primary" onClick={handleFormProduct}>
            <img src={addSquare} alt="add product" />
            <span>Producto</span>
          </button>
        </div>
      </div>
    </div>
  );
}
