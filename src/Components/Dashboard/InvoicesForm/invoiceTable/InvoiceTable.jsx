import "./InvoiceTable.css";

export default function InvoiceTable({
  user,
  invoice,
  newProducts,
  handleChangeProduct,
  handleChange
}) {
  function descuentoValidation(e, code) {
    console.log(Number(e.target.value) <= 100);
    console.log(Number(e.target.value) >= 0);
    console.log(Number(e.target.value) <= 100 && Number(e.target.value) >= 0);
    if (Number(e.target.value) <= 100 && Number(e.target.value) >= 0) {
      handleChangeProduct(e, code);
    } else {
      console.log("fuera de rango");
    }
  }

  return (
    <div className="invoice-products">
      <div className="invoice-row invoice-first-row">
        <span>Codigo</span>
        <span>Descripcion</span>
        {/*         <span>Det. Cantidad</span> */}
        <span>Cantidad</span>
        <span>Descuento %</span>
        <span>Precio unitario</span>
        <span>Precio unitario + IVA</span>
        <span>Valor</span>
      </div>
      {newProducts?.map((p) => (
        <div key={p.ITE_CODIGO} className="invoice-row">
          <span>{p.ITE_CODIGO}</span>
          <span>{p.ITE_DESCRIPCION}</span>
          {/*           <span>{p.detCantidad}</span> */}
          <input
            className="amount"
            type="number"
            name="VED_CANTIDAD"
            value={p.VED_CANTIDAD}
            onChange={(e) => handleChangeProduct(e, p.ITE_CODIGO)}
          />
          <input
            className="amount"
            type="number"
            name="VED_DESCUENTO"
            value={p.VED_DESCUENTO}
            onChange={(e) => descuentoValidation(e, p.ITE_CODIGO)}
          />
            <span>{Number(p.VED_PUNITARIO).toFixed(user.EMP_PRECISION)}</span>
          <input
            className="amount"
            type="number"
            name="VED_PUNITARIOIVA"
            value={Number(p.VED_PUNITARIOIVA).toFixed(user.EMP_PRECISION)}
            onChange={(e) => handleChangeProduct(e, p.ITE_CODIGO)}
          />
          <span>{Number(p.VED_VALOR).toFixed(2)}</span>
        </div>
      ))}
      <div className="adicional">
        <div className="data-aditional">
          <h5>Informacion Adicional:</h5>
          <div className="aditional-input-container">
            <input className="form-control" name="VEN_CAMPO1" value={invoice.VEN_CAMPO1} placeholder="Nombre" onChange={handleChange}/>
            <input className="form-control" name="VEN_VALOR1" value={invoice.VEN_VALOR1} placeholder="Valor" onChange={handleChange}/>
          </div>

          <div className="aditional-input-container">
            <input className="form-control" name="VEN_CAMPO2" value={invoice.VEN_CAMPO2} placeholder="Nombre" onChange={handleChange}/>
            <input className="form-control" name="VEN_VALOR2" value={invoice.VEN_VALOR2} placeholder="Valor" onChange={handleChange}/>
          </div>

          <div className="aditional-input-container">
            <input className="form-control" name="VEN_CAMPO3" value={invoice.VEN_CAMPO3} placeholder="Nombre" onChange={handleChange}/>
            <input className="form-control" name="VEN_VALOR3" value={invoice.VEN_VALOR3} placeholder="Valor" onChange={handleChange}/>
          </div>
        </div>
        <div>
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
