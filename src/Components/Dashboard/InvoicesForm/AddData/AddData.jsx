import SearchClient from "./SearchClient/SearchClient";
import SearchProduct from "./SearchProduct/SearchProduct";

import addSquare from "../../../../assets/svg/add-square.svg";

import "./AddData.css";

export default function AddData({
  invoice,
  handleChange,
  handleFormClient,
  handleFormProduct,
  handleAddClient,
  handleAddProduct,
}) {
  return (
    <div>
      <div class="invoice-data__client-data">
        {/* Client */}
        <h3>Cliente</h3>
        
        <div className="search-container-btn">
          <SearchClient handleAddClient={handleAddClient} />
          <button className="btn btn-primary" onClick={handleFormClient}>
            <img src={addSquare} alt="add client" />
            <span>Cliente</span>
          </button>
        </div>

        <div className="grid">
          <div className="form-floating mb-3">
            <input class="form-control" value={invoice.CLI_IDENTIFICACION} />
            <label>{/* {invoice.type} */}</label>
          </div>

          <div className="form-floating mb-3">
            <input class="form-control" value={invoice.CLI_DIRECCION} />
            <label>Direccion</label>
          </div>

          <div className="form-floating mb-3">
            <input class="form-control" value={invoice.CLI_TELEFONO} />
            <label>Telefono</label>
          </div>

          <div className="form-floating mb-3">
            <select class="form-select" value={7} onChange={handleChange}>
              <option value={4}>Ruc</option>
              <option value={5}>Cedula</option>
              <option value={6}>Pasaporte</option>
              <option value={7}>Consumidor final</option>
            </select>
            <label>Sr. (es)</label>
          </div>
        </div>

        {/* Product */}
        <div className="search-container-btn">
          <SearchProduct handleAddProduct={handleAddProduct} />
          <button className="btn btn-primary" onClick={handleFormProduct}>
            <img src={addSquare} alt="add product" />
            <span>Producto</span>
          </button>
        </div>
      </div>
    </div>
  );
}
