import SearchClient from "./SearchClient/SearchClient";
import SearchProduct from "./SearchProduct/SearchProduct";

import user from "../../../../assets/svg/user-solid.svg";
import products from "../../../../assets/svg/boxes-stacked-solid.svg";

import "./AddData.css";

export default function AddData({
  invoice,
  handleChange,
  handleFormClient,
  handleFormProduct,
  handleClient,
  handleProduct,
  handleAddProduct,
  handleAddClient,
  handleClearClient,
}) {
  return (
    <div className="invoice-client-product">
      <div className="invoice-data__client-data">
        {/* Client */}
        <h3>Cliente</h3>

        <div className="search-container-btn">
          <SearchClient
            handleClient={handleClient}
            handleFormClient={handleAddClient}
          />
          <button className="btn btn-primary" onClick={handleFormClient}>
            <img src={user} alt="add client" />
            <span>Clientes</span>
          </button>
        </div>

        <div className="grid">
          <div className="form-floating">
            <input
              className="form-control"
              type="text"
              value={invoice.CLI_IDENTIFICACION}
              disabled
            />
            <label>
              {invoice.CLI_TIPOIDE === "05"
                ? "Cedula"
                : invoice.CLI_TIPOIDE === "06"
                ? "Pasaporte"
                : "Ruc"}
            </label>
          </div>

          <div className="form-floating">
            <input
              className="form-control"
              type="text"
              value={invoice.CLI_DIRECCION}
              disabled
            />
            <label>Direccion</label>
          </div>

          <div className="form-floating">
            <input
              className="form-control"
              type="text"
              value={invoice.CLI_TELEFONO}
              disabled
            />
            <label>Telefono</label>
          </div>

          <div className="form-floating">
            <input
              className="form-control"
              type="text"
              value={invoice.CLI_NOMBRE}
              disabled
            />
            <label>Sr. (es)</label>
          </div>
        </div>

        {/* Product */}
        <div className="search-container-btn">
          <SearchProduct
            handleProduct={handleProduct}
            handleFormProduct={handleAddProduct}
          />
          <button className="btn btn-primary" onClick={handleFormProduct}>
            <img src={products} alt="add product" />
            <span>Productos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
