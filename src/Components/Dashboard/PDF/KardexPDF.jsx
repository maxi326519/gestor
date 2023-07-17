import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ReporteKardex } from "../../../models/kardex";
import { Producto } from "../../../models/productos";

const styles = StyleSheet.create({
  page: {
    padding: "30px",
    fontSize: "10px",
  },
  viewer: {
    width: "100%", //the pdf viewer will take up all of the width and height
    height: "calc(100% - 50px)",
  },
  userData: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
    border: "1px solid grey",
    borderTop: "10px solid #389",
  },
  logo: {
    width: "100px",
    height: "100px",
    margin: "auto",
    marginBottom: "20px",
  },
  comerceData: {
    flexGrow: 1,
    padding: 10,
    paddingRight: "20px",
    borderRight: "1px solid grey",
  },
  invoicingData: {
    padding: 10,
    paddingLeft: "10px",
  },
  invoiceHead: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "15px",
  },
  clientData: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    border: "1px solid grey",
    borderTop: "10px solid #389",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    marginTop: 10,
    fontSize: "10px",
    borderLeft: "1px solid grey",
    borderTop: "1px solid grey",
  },
  tablaRows: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottom: "1px solid grey",
  },
  text: {
    padding: "5px",
    textAlign: "center",
    borderRight: "1px solid grey",
  },
  endData: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "10px",
  },
  textEnd: {
    padding: "5px 10px",
    border: "1px solid gray",
  },
  dataEnd: {
    padding: "5px",
    border: "1px solid gray",
    textAlign: "right",
  },
});

// Create Document Component
export default function KardexPDF({
  kardexList,
  product,
  local,
  products,
  date,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View>
          <Text>Producto: {product || "Varios"}</Text>
          <Text>Local: {local || "Varios"}</Text>
          <Text>Fechas de movimientos</Text>
          <Text>{date}</Text>
        </View>

        {/* TABLE */}
        <View style={styles.table}>
          <View
            style={{
              ...styles.tablaRows,
              backgroundColor: "#389",
              color: "white",
            }}
          >
            <Text style={{ ...styles.text, width: "60px", padding: "8px 5px" }}>
              Fecha
            </Text>
            <Text style={{ ...styles.text, width: "60px", padding: "8px 5px" }}>
              Tipo
            </Text>
            <Text style={{ ...styles.text, width: "60px", padding: "8px 5px" }}>
              Codigo de producto
            </Text>
            <Text style={{ ...styles.text, flexGrow: 1, padding: "8px 5px" }}>
              Descripcion del producto
            </Text>
            <Text style={{ ...styles.text, width: "50px", padding: "8px 5px" }}>
              Cantidad
            </Text>
            <Text style={{ ...styles.text, width: "70px", padding: "8px 5px" }}>
              Precio U.
            </Text>
            <Text style={{ ...styles.text, width: "70px", padding: "8px 5px" }}>
              Saldo
            </Text>
          </View>

          {kardexList?.map((kardex) => (
            <View style={styles.tablaRows}>
              <Text style={{ ...styles.text, width: "60px" }}>
                {kardex.KDX_REGISTRO}
              </Text>
              <Text style={{ ...styles.text, width: "60px" }}>
                {kardex.KDX_TIPO}
              </Text>
              <Text style={{ ...styles.text, width: "60px" }}>
                {kardex.ITE_CODIGO}
              </Text>
              <Text style={{ ...styles.text, flexGrow: 1 }}>
                {
                  products.find(
                    (product) => kardex.ITE_CODIGO === product.ITE_CODIGO
                  )?.ITE_DESCRIPCION
                }
              </Text>
              <Text style={{ ...styles.text, width: "50px" }}>
                {Number(kardex.KDX_CANTIDAD).toFixed(2)}
              </Text>
              <Text style={{ ...styles.text, width: "70px" }}>
                {Number(kardex.KDX_PUNITARIO).toFixed(2)}
              </Text>
              <Text style={{ ...styles.text, width: "70px" }}>
                {Number(kardex.KDX_SALDO).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
