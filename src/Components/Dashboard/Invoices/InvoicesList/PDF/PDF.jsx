import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import "./PDF.css";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#444",
    color: "white",
  },
  viewer: {
    width: "100%", //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  info: {
    borderBottom: "1px solid red",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    margin: 10,
    padding: 10,
  },
  tablaRows: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    padding: "10px",
    border: "1px solid white",
  },
});

// Create Document Component
export default function PDF({ invoice }) {
  return (
    <div className="pdf-container">
      {console.log(invoice)}
      {console.log(invoice.client)}
      <button>X</button>
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Text>Nombre de la empresa</Text>
            </View>
            <View>
              <Text>Ruc: </Text>
              <Text>Dirección: </Text>
              <Text>Correo: </Text>
              <Text>Teléfono: </Text>
            </View>
            <View style={styles.info}>
              <Text>Cliente: {invoice.client}</Text>
              <Text>Fecha: {invoice.date}</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tablaRows}>
                <Text style={{ ...styles.text, width: "50%" }}>Nombre</Text>
                <Text style={styles.text}>Precio</Text>
                <Text style={styles.text}>Cantidad</Text>
              </View>
              {invoice.product.map((p) => (
                <View style={styles.tablaRows}>
                  <Text style={{ ...styles.text, width: "50%" }}>{p.name}</Text>
                  <Text style={styles.text}>{p.unitPrice}</Text>
                  <Text style={styles.text}>{p.amount}</Text>
                </View>
              ))}
            <View>
              <Text>Subtotal: </Text>
              <Text>Impuestos: </Text>
              <Text>Total: </Text>
            </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
