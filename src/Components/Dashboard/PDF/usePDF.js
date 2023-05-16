import { useSelector } from "react-redux";
import { pdf } from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";

import PDF from "../PDF/PDF";

export function usePDF() {
  const user = useSelector((state) => state.user.userDB);

  function generateBarCode(VEN_CLAVEACCESO) {
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
  async function openPDF(invoice) {
    let barCode = "";

    // Generate Barcode
    if (invoice.VEN_CLAVEACCESO) {
      barCode = generateBarCode(invoice.VEN_CLAVEACCESO);
    }

    // Generate PDF
    const blob = await pdf(
      <PDF invoice={invoice} user={user} barCode={barCode} />
    ).toBlob();

    // Create url and open PDF
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  return { openPDF, generateBarCode };
}
