import { useSelector } from "react-redux";
import { pdf } from "@react-pdf/renderer";
import { RootState } from "../../../models/RootState";
import { Factura } from "../../../models/factura";
import { ReporteKardex } from "../../../models/kardex";
import JsBarcode from "jsbarcode";

import InvoicePDF from "./InvoicePDF";
import KardexPDF from "./KardexPDF";

export function usePDF() {
  const user = useSelector((state: RootState) => state.user.userDB);
  const products = useSelector((state: RootState) => state.products);

  function generateBarCode(VEN_CLAVEACCESO: string) {
    let barCode = "";
    const canvasRef = document.createElement("canvas");

    JsBarcode(canvasRef, VEN_CLAVEACCESO, { displayValue: false });
    try {
      barCode = canvasRef.toDataURL("image/png");
    } catch (e) {
      console.log(e);
    }
    return barCode;
  }
  async function openInvoicePDF(invoice: Factura) {
    let barCode = "";

    // Generate Barcode
    if (invoice.VEN_CLAVEACCESO) {
      barCode = generateBarCode(invoice.VEN_CLAVEACCESO);
    }

    // Generate PDF
    const blob = await pdf(
      <InvoicePDF invoice={invoice} user={user} barCode={barCode} />
    ).toBlob();

    // Create url and open PDF
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  async function openKardexPDF(
    kardexList: ReporteKardex[],
    productSelected: string,
    localSelected: string,
    date: string
  ) {
    // Generate PDF
    const blob = await pdf(
      <KardexPDF
        kardexList={kardexList}
        product={productSelected}
        local={localSelected}
        products={products}
        date={date}
      />
    ).toBlob();

    // Create url and open PDF
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  return { openInvoicePDF, openKardexPDF, generateBarCode };
}
