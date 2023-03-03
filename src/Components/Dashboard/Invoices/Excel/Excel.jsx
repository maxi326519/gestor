import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Excel({ invoices }) {

    /* DATOS CONSOLIDADOS */
/*     const data = invoices.map((invoice) => {
        return {...invoice,
        comprobante: "Factura",
        iva: Number(invoice.VEN_SUBTOTAL0 * 0.12).toFixed(2),
        VEN_ESTADO: Number(invoice.VEN_ESTADO) === 1 ? "Generada"
        : Number(invoice.VEN_ESTADO) === 2 ? "Anulada"
        : Number(invoice.VEN_ESTADO) === 3 ? "Autorizada" : "Error"}
    }) */

    /* DATOS DETALLADOS */
    const data = [];

    invoices.forEach((invoice) => {
      invoice.ITE_DETALLES.forEach((d) => {
        data.push({
          ...invoice,
          COMPROBANTE: "Factura",
          IVA: Number(invoice.VEN_SUBTOTAL0 * 0.12).toFixed(2),
          VEN_ESTADO:
            Number(invoice.VEN_ESTADO) === 1
              ? "Generada"
              : Number(invoice.VEN_ESTADO) === 2
              ? "Anulada"
              : Number(invoice.VEN_ESTADO) === 3
              ? "Autorizada"
              : "Error",
          ...d,
          VALOR: Number(d.VED_PUNITARIO) * Number(d.VED_CANTIDAD)
        });
      });
    });

    return (
    <ExcelFile element={<button className="btn btn-primary">Exportar</button>}>
      <ExcelSheet data={data} name="Employees">
        <ExcelColumn label="Fecha" value="VEN_FECHA" />
        <ExcelColumn label="Comprobante" value="COMPROBANTE" />
        <ExcelColumn label="Est." value="VEN_ESTABLECIMIENTO" />
        <ExcelColumn label="Pto." value="VEN_PTOEMISION" />
        <ExcelColumn label="Nro" value="VEN_NUMERO" />
        <ExcelColumn label="RUC/Ced/Pas" value="CLI_IDENTIFICACION" />
        <ExcelColumn label="Cliente" value="CLI_NOMBRE" />
        <ExcelColumn label="Sub. 0" value="VEN_SUBTOTAL0" />
        <ExcelColumn label="Sub IVA" value="VEN_SUBTOTAL12" />
        <ExcelColumn label="Descuento" value="VEN_DESCUENTO" />
        <ExcelColumn label="Subtotal" value="VEN_SUBTOTAL" />
        <ExcelColumn label="IVA" value="IVA" />
        <ExcelColumn label="Total" value="VEN_TOTAL" />
        <ExcelColumn label="FP" value="VEN_FPAGO" />
        <ExcelColumn label="Estado" value="VEN_ESTADO" />

        <ExcelColumn label="Codigo Item" value="ITE_CODIGO" />
        <ExcelColumn label="Cantidad" value="VED_CANTIDAD" />
        <ExcelColumn label="Descripcion" value="ITE_DESCRIPCION" />
        <ExcelColumn label="Precio" value="VED_PUNITARIO" />
        <ExcelColumn label="Valor" value="VALOR" />
      </ExcelSheet>
    </ExcelFile>
  );
}
