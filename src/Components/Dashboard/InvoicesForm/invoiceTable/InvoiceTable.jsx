import "./InvoiceTable.css";

export default function InvoiceTable({ user, invoice, newProducts, setAmount }) {
  return (
    <div className="invoice-products">
      <div className="invoice-row invoice-first-row">
        <span>Codigo</span>
        <span>Descripcion</span>
        <span>Det. Cantidad</span>
        <span>Cantidad</span>
        <span>Descuento %</span>
        <span>Precio unitario</span>
        <span>Precio unitario + IVA</span>
        <span>Monto</span>
      </div>
      {newProducts?.map((p) => (
        <div className="invoice-row">
          <span>{p.ITE_CODIGO}</span>
          <span>{p.ITE_DESCRIPCION}</span>
          <span>{p.detCantidad}</span>
          <input
            className="amount"
            type="number"
            value={p.VED_CANTIDAD}
            onChange={(e) => setAmount(e.target.value, p.ITE_CODIGO)}
          />
          <span>{p.VED_DESCUENTO}</span>
          <span>{p.VED_PUNITARIO}</span>
          <span>{p.VED_PUNITARIOIVA}</span>
          <span>{p.VED_PUNITARIO * p.VED_CANTIDAD}</span>
        </div>
      ))}
      <div className="adicional">
        <div className="data-aditional">
          <h5>Informacion Adicional:</h5>
          <div className="aditional-input-container">
            <input className="form-control" name="type" placeholder="Nombre" />
            <input className="form-control" name="type" placeholder="Valor" />
          </div>

          <div className="aditional-input-container">
            <input className="form-control" name="type" placeholder="Nombre" />
            <input className="form-control" name="type" placeholder="Valor" />
          </div>

          <div className="aditional-input-container">
            <input className="form-control" name="type" placeholder="Nombre" />
            <input className="form-control" name="type" placeholder="Valor" />
          </div>
        </div>
        <div>
          <div className="invoice-totals">
            <span>Subtotal</span>
            <span className="totals">{invoice.VEN_SUBTOTAL}</span>
          </div>
          <div className="invoice-totals">
            <span>Subtotal 0%</span>
            <span className="totals">{invoice.VEN_SUBTOTAL0}</span>
          </div>
          <div className="invoice-totals">
            <span>Subtotal IVA</span>
            <span className="totals">{invoice.VEN_SUBTOTAL12}</span>
          </div>
          <div className="invoice-totals">
            <span>I.V.A. 12%</span>
            <span className="totals">{invoice.VEN_SUBTOTALEXCENTIVA}</span>
          </div>
          <div className="invoice-totals">
            <span>Total</span>
            <span className="totals">{invoice.VEN_TOTAL}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
