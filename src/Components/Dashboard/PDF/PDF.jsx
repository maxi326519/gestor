import { useEffect, useState, useRef } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";

import "./PDF.css";

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
    display: "grid",
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
    display: "grid",
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

const formasDePago = [
  { value: "01", name: "SIN UTILIZACION DEL SISTEMA FINANCIERO" },
  { value: "15", name: "COMPENSACIÓN DE DEUDAS" },
  { value: "16", name: "TARJETA DE DÉBITO" },
  { value: "17", name: "DINERO ELECTRÓNICO" },
  { value: "18", name: "TARJETA PREPAGO" },
  { value: "19", name: "TARJETA DE CRÉDITO" },
  { value: "20", name: "OTROS CON UTILIZACIÓN DEL SISTEMA FINANCIERO" },
  { value: "21", name: "ENDOSO DE TÍTULOS" },
];

// Create Document Component
export default function PDF({ invoice, user, barCode }) {
  useEffect(() => {
    console.log("BarCode:", barCode);
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* INVOICING DATA */}
        <View style={styles.userData}>
          {/* COMERCE DATA */}
          <View style={styles.comerceData}>
            <Image style={styles.logo} src={user.EMP_LOGO} />
            <Text>Nombre: {user.EMP_NOMBRE}</Text>
            <Text>Ruc: {user.EMP_RUC}</Text>
            <Text>Dirección: {user.EMP_DIRECCION}</Text>
            <Text>Teléfono: {user.EMP_TELEFONO}</Text>
            <Text>Correo: {user.EMP_EMAIL}</Text>
            <Text>
              OBLIGADO A LLEVAR CONTABILIDAD: {user.EMP_SOCIEDAD ? "SI" : "NO"}
            </Text>
            <Text>
              CONTRIBUYENTE RÉGIMEN{" "}
              {user.EMP_RUC === "1" ? "GENERAL" : "EMPRENDEDOR"}
            </Text>
          </View>

          {/* USER DATA */}
          <View style={styles.invoicingData}>
            <View style={styles.invoiceHead}>
              <Text>Factura </Text>
              <Text>
                Nro:{" "}
                {`${invoice.VEN_ESTABLECIMIENTO}-${
                  invoice.VEN_PTOEMISION
                }-${`00000000${invoice.VEN_NUMERO}`.slice(-9)}`}
              </Text>
            </View>
            <Text style={{ marginBottom: "30px" }}>
              FECHA Y HORA DE AUTORIZACION:
            </Text>
            <Text>
              AMBIENTE: {user.EMP_CODIGO === 1 ? "Pueba" : "Produccion"}
            </Text>
            <Text>EMISION: {user.EMP_LICENCIA}</Text>
            <Text>AUTORIZACION Y CLAVE DE ACCESO: </Text>
            {/* AGREGAR CODIGO DE BARRAS */}
            <View
              style={{
                flexGrow: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {barCode ? (
                <View>
                  <Image src={barCode} style={{ width: "270px" }} />
                  <Text style={{ fontSize: "10px" }}>
                    {invoice.VEN_CLAVEACCESO}
                  </Text>
                </View>
              ) : (
                <Text style={{ color: "red", fontSize: "25px" }}>
                  NO REGISTRADO
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* CLIENT DATA */}
        <View style={styles.clientData}>
          <View style={{ flexGrow: 1 }}>
            <Text>Razón social: {invoice.CLI_NOMBRE}</Text>
            <Text>Ci/Ruc: {invoice.CLI_IDENTIFICACION} </Text>
            <Text>Fecha Emisión: {invoice.VEN_FECHA} </Text>
            <Text>Dirección: {invoice.CLI_DIRECCION} </Text>
          </View>
          <View style={{ flexGrow: 1 }}>
            <Text>Correo: {invoice.CLI_EMAIL} </Text>
            <Text>Teléfono: {invoice.CLI_TELEFONO} </Text>
            <Text>Guia: {invoice.VEN_GUIA} </Text>
          </View>
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
              Codigo
            </Text>
            <Text style={{ ...styles.text, width: "60px", padding: "8px 5px" }}>
              Cantidad
            </Text>
            <Text style={{ ...styles.text, flexGrow: "1" }}>Descripcion</Text>
            <Text style={{ ...styles.text, width: "60px", padding: "8px 5px" }}>
              Precio U.
            </Text>
            <Text style={{ ...styles.text, width: "70px", padding: "8px 5px" }}>
              Descuento
            </Text>
            <Text style={{ ...styles.text, width: "80px", padding: "8px 5px" }}>
              Valor
            </Text>
          </View>
          {invoice.ITE_DETALLES.map((p) => (
            <View style={styles.tablaRows}>
              <Text style={{ ...styles.text, width: "60px" }}>
                {p.ITE_CODIGO}
              </Text>
              <Text style={{ ...styles.text, width: "60px" }}>
                {Number(p.VED_CANTIDAD).toFixed(2)}
              </Text>
              <Text style={{ ...styles.text, flexGrow: "1" }}>
                {p.ITE_DESCRIPCION}
              </Text>
              <Text style={{ ...styles.text, width: "60px" }}>
                {Number(p.VED_PUNITARIO).toFixed(2)}
              </Text>
              <Text style={{ ...styles.text, width: "70px" }}>
                {p.VED_DESCUENTO.toFixed(2)}
              </Text>
              <Text style={{ ...styles.text, width: "80px" }}>
                {Number(p.VED_VALOR).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.endData}>
          <View style={{ width: "60%" }}>
            {/* LEFT COLUMN */}
            <View>
              <View style={{ ...styles.table, width: "95%", marginTop: "0" }}>
                <View
                  style={{
                    ...styles.tablaRows,
                    backgroundColor: "#389",
                    color: "white",
                  }}
                >
                  <Text style={{ ...styles.text, flexGrow: 1 }}>
                    Forma de pago
                  </Text>
                  <Text style={{ ...styles.text, width: "90px" }}>Valor</Text>
                </View>
                <View style={{ ...styles.tablaRows, width: "100%" }}>
                  <Text
                    style={{ ...styles.text, flexGrow: 1, fontSize: "8px" }}
                  >
                    {
                      formasDePago.find((f) => f.value === invoice.VEN_FPAGO)
                        ?.name
                    }
                  </Text>
                  <Text style={{ ...styles.text, width: "90px" }}>
                    {Number(invoice.VEN_TOTAL).toFixed(2)}
                  </Text>
                </View>
              </View>

              {invoice.VEN_CAMPO1 !== "" ||
              invoice.VEN_CAMPO2 !== "" ||
              invoice.VEN_CAMPO3 !== "" ? (
                <View style={{ ...styles.table, width: "95%" }}>
                  <View
                    style={{
                      ...styles.tablaRows,
                      backgroundColor: "#389",
                      color: "white",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.text,
                        flexGrow: 1,
                        textAlign: "left",
                      }}
                    >
                      Informacion Adicional
                    </Text>
                  </View>

                  {invoice.VEN_CAMPO1 ? (
                    <View style={{ ...styles.tablaRows, width: "100%" }}>
                      <Text
                        style={{
                          ...styles.text,
                          width: "50%",
                          textAlign: "left",
                        }}
                      >
                        {invoice.VEN_CAMPO1}
                      </Text>
                      <Text
                        style={{
                          ...styles.text,
                          width: "50%",
                          textAlign: "left",
                        }}
                      >
                        {invoice.VEN_VALOR1}
                      </Text>
                    </View>
                  ) : null}

                  {invoice.VEN_CAMPO2 ? (
                    <View style={{ ...styles.tablaRows, width: "100%" }}>
                      <Text
                        style={{
                          ...styles.text,
                          width: "50%",
                          textAlign: "left",
                        }}
                      >
                        {invoice.VEN_CAMPO2}
                      </Text>
                      <Text
                        style={{
                          ...styles.text,
                          width: "50%",
                          textAlign: "left",
                        }}
                      >
                        {invoice.VEN_VALOR2}
                      </Text>
                    </View>
                  ) : null}

                  {invoice.VEN_CAMPO3 ? (
                    <View style={{ ...styles.tablaRows, width: "100%" }}>
                      <Text
                        style={{
                          ...styles.text,
                          width: "50%",
                          textAlign: "left",
                        }}
                      >
                        {invoice.VEN_CAMPO3}
                      </Text>
                      <Text
                        style={{
                          ...styles.text,
                          width: "50%",
                          textAlign: "left",
                        }}
                      >
                        {invoice.VEN_VALOR3}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>

          {/* RIGHT COLUMN */}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ flexGrow: 1 }}>
              <Text style={styles.textEnd}>SUBTOTAL 12%:</Text>
              <Text style={styles.textEnd}>SUBTOTAL 0%:</Text>
              <Text style={styles.textEnd}>SUBTOTAL No OBJETO de IVA:</Text>
              <Text style={styles.textEnd}>SUBTOTAL EXCENTO DE IVA:</Text>
              <Text style={styles.textEnd}>SUBTOTAL SIN IMPUESTO:</Text>
              <Text style={styles.textEnd}>TOTAL DESCUENTO:</Text>
              <Text style={styles.textEnd}>ICE:</Text>
              <Text style={styles.textEnd}>IVA 12%:</Text>
              <Text style={styles.textEnd}>IRBPNR:</Text>
              <Text style={styles.textEnd}>PROPINA:</Text>
              <Text style={styles.textEnd}>TOTAL:</Text>
            </View>
            <View style={{ width: "80px" }}>
              <Text style={styles.dataEnd}>
                {Number(invoice.VEN_SUBTOTAL12).toFixed(2)}
              </Text>
              <Text style={styles.dataEnd}>
                {Number(invoice.VEN_SUBTOTAL0).toFixed(2)}
              </Text>
              <Text style={styles.dataEnd}>
                {Number(invoice.VEN_SUBTOTALNOIVA).toFixed(2)}
              </Text>
              <Text style={styles.dataEnd}>
                {Number(invoice.VEN_SUBTOTALEXCENTIVA).toFixed(2)}
              </Text>
              <Text style={styles.dataEnd}>
                {Number(invoice.VEN_SUBTOTAL).toFixed(2)}
              </Text>
              <Text style={styles.dataEnd}>
                {Number(invoice.VEN_DESCUENTO).toFixed(2)}
              </Text>
              <Text style={styles.dataEnd}>
                {Number(invoice.VEN_ICE).toFixed(2)}
              </Text>
              <Text style={styles.dataEnd}>
                {(invoice.VEN_SUBTOTAL12 * 0.12).toFixed(2)}
              </Text>
              <Text style={styles.dataEnd}>0.00</Text>
              <Text style={styles.dataEnd}>0.00</Text>
              <Text style={styles.dataEnd}>
                {Number(invoice.VEN_TOTAL).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
