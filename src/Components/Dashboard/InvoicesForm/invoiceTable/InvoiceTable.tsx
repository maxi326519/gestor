import React, { useState } from "react";
import { Factura, FacturaDetalle } from "../../../../models/factura";
import { User } from "../../../../models/usuario";

import "./InvoiceTable.css";

interface Props {
  user: User,
  invoice: Factura,
  discount: number,
  setDiscount: (discount: number) => void,
  newProducts: FacturaDetalle[],
  handleChangeProduct: (event: React.ChangeEvent<HTMLInputElement>, productCode: string) => void,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleProductRemove: (product: FacturaDetalle) => void,
}

export default function InvoiceTable({
  user,
  invoice,
  discount,
  setDiscount,
  newProducts,
  handleChangeProduct,
  handleChange,
  handleProductRemove,
}: Props) {
  const [isDisabled, setDisabled] = useState(true);

  function descuentoValidation(event: React.ChangeEvent<HTMLInputElement>, code: string) {
    if (Number(event.target.value) <= 100 && Number(event.target.value) >= 0) {
      handleChangeProduct(event, code);
    }
  }

  function handleDisabled() {
    setDisabled(!isDisabled);
    setDiscount(0);
  }

  return (
    <div className="invoice-table">
      <div className="product-table">
        <div>
          <div
            className={`invoice-row invoice-first-row ${user.EMP_AUTOMATICO === 1 ? "detCantidad" : ""
              }`}
          >
            <span>Borrar</span>
            <span>Codigo</span>
            <span>Descripcion</span>
            {user.EMP_AUTOMATICO === 1 ? <span>Det. Cantidad</span> : null}
            <span>Cantidad</span>
            <span>Descuento %</span>
            <span>Precio unitario</span>
            <span>Precio unitario + IVA</span>
            <span>Valor</span>
          </div>
          <div className="data-table">
            {newProducts?.map((product) => (
              <div
                key={product.ITE_CODIGO}
                className={`invoice-row ${user.EMP_AUTOMATICO === 1 ? "detCantidad" : ""
                  }`}
              >
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleProductRemove(product)}
                >
                  -
                </button>
                <span>{product.ITE_CODIGO}</span>
                <span>{product.ITE_DESCRIPCION}</span>
                {user.EMP_AUTOMATICO === 1 ? (
                  <span>{product.VED_DET_CANTIDAD}</span>
                ) : null}
                <input
                  name="VED_CANTIDAD"
                  type="number"
                  className="amount"
                  value={product.VED_CANTIDAD}
                  min={1}
                  placeholder="Cantidad"
                  onChange={(event) => handleChangeProduct(event, product.ITE_CODIGO)}
                />
                <input
                  name="VED_DESCUENTO"
                  type="number"
                  className="amount"
                  value={product.VED_DESCUENTO}
                  placeholder="Descueto"
                  onChange={(event) => descuentoValidation(event, product.ITE_CODIGO)}
                />
                <span>
                  {Number(product.VED_PUNITARIO).toFixed(user.EMP_PRECISION)}
                </span>
                <input
                  name="VED_PUNITARIOIVA"
                  type="number"
                  className="amount"
                  value={Number(product.VED_PUNITARIOIVA).toFixed(2)}
                  placeholder="Precio Unit."
                  onChange={(event) => handleChangeProduct(event, product.ITE_CODIGO)}
                />
                <span>{Number(product.VED_VALOR).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="adicional">
        <div className="data-aditional">
          <h5>Informacion Adicional:</h5>
          <div className="aditional-input-container">
            <input
              className={`form-control ${invoice.VEN_CAMPO1 === "" && invoice.VEN_VALOR1 !== ""
                ? "is-invalid"
                : ""
                }`}
              name="VEN_CAMPO1"
              value={invoice.VEN_CAMPO1}
              placeholder="Nombre"
              onChange={handleChange}
            />
            <input
              className={`form-control ${invoice.VEN_CAMPO1 !== "" && invoice.VEN_VALOR1 === ""
                ? "is-invalid"
                : ""
                }`}
              name="VEN_VALOR1"
              value={invoice.VEN_VALOR1}
              placeholder="Valor"
              onChange={handleChange}
            />
          </div>

          <div className="aditional-input-container">
            <input
              className={`form-control ${invoice.VEN_CAMPO2 === "" && invoice.VEN_VALOR2 !== ""
                ? "is-invalid"
                : ""
                }`}
              name="VEN_CAMPO2"
              value={invoice.VEN_CAMPO2}
              placeholder="Nombre"
              onChange={handleChange}
            />
            <input
              className={`form-control ${invoice.VEN_CAMPO2 !== "" && invoice.VEN_VALOR2 === ""
                ? "is-invalid"
                : ""
                }`}
              name="VEN_VALOR2"
              value={invoice.VEN_VALOR2}
              placeholder="Valor"
              onChange={handleChange}
            />
          </div>

          <div className="aditional-input-container">
            <input
              className={`form-control ${invoice.VEN_CAMPO3 === "" && invoice.VEN_VALOR3 !== ""
                ? "is-invalid"
                : ""
                }`}
              name="VEN_CAMPO3"
              value={invoice.VEN_CAMPO3}
              placeholder="Nombre"
              onChange={handleChange}
            />
            <input
              className={`form-control ${invoice.VEN_CAMPO3 !== "" && invoice.VEN_VALOR3 === ""
                ? "is-invalid"
                : ""
                }`}
              name="VEN_VALOR3"
              value={invoice.VEN_VALOR3}
              placeholder="Valor"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div className="invoice-totals">
            <div className="discount">
              <label>
                <input
                  type="checkbox"
                  checked={!isDisabled}
                  onChange={handleDisabled}
                />{" "}
                %Desc
              </label>
              <label>
                <input
                  type="number"
                  name="VEN_DESCUENTO_POR"
                  value={discount}
                  min={0}
                  max={100}
                  placeholder="%"
                  onChange={handleChange}
                  disabled={isDisabled}
                />
              </label>
            </div>
            <span>{invoice.VEN_DESCUENTO.toFixed(2)}</span>
          </div>
          <div className="invoice-totals">
            <span>Subtotal</span>
            <span className="totals">
              {Number(invoice.VEN_SUBTOTAL).toFixed(2)}
            </span>
          </div>
          <div className="invoice-totals">
            <span>Subtotal 0%</span>
            <span className="totals">
              {Number(invoice.VEN_SUBTOTAL0).toFixed(2)}
            </span>
          </div>
          <div className="invoice-totals">
            <span>Subtotal IVA</span>
            <span className="totals">
              {Number(invoice.VEN_SUBTOTAL12).toFixed(2)}
            </span>
          </div>
          <div className="invoice-totals">
            <span>I.V.A. 12%</span>
            <span className="totals">
              {Number(invoice.VEN_SUBTOTAL12 * 0.12).toFixed(2)}
            </span>
          </div>
          <div className="invoice-totals">
            <span>Total</span>
            <span className="totals">
              {Number(invoice.VEN_TOTAL).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
