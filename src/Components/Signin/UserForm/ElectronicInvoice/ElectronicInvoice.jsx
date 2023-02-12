import "./ElectronicInvoice.css";

export default function ElectronicInvoice(  ){
    return (
        <div className="electronicInvoice">
            <hr></hr>
              <h5>Facturacion electronica</h5>

              <div className="container_invoice_n">
                <div className="form-floating mb-3 ">
                  <input
                    type="email"
                    className="form-control"
                    name="claveDeLaFirma"
                    required
                  />
                  <label htmlFor="floatingInput">Establecimietno</label>
                </div>
                <div className="form-floating mb-3 ">
                  <input
                    type="email"
                    className="form-control"
                    name="claveDeLaFirma"
                    required
                  />
                  <label htmlFor="floatingInput">Emisión</label>
                </div>
                <div className="form-floating mb-3 ">
                  <input
                    type="email"
                    className="form-control"
                    name="claveDeLaFirma"
                    required
                  />
                  <label htmlFor="floatingInput">Numero secuencial</label>
                </div>
              </div>

              <div className="form-floating mb-3 ">
                  <input
                    type="email"
                    className="form-control"
                    name="claveDeLaFirma"
                    required
                  />
                  <label htmlFor="floatingInput">Emisión</label>
                </div>

              <label>Subir Firma electronica</label>
              <input
                type="file"
                name="file"
                accept="image/*"
                className="form-control"
                required
              />

              {/* CLAVE DE LA FIRMA */}
              <div className="form-floating mb-3 ">
                <input
                  type="email"
                  className="form-control"
                  name="claveDeLaFirma"
                  required
                />
                <label htmlFor="floatingInput">Clave de la firma</label>
              </div>
        </div>
    )
}