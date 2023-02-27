import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import {
  postInvoice,
  updateUserData,
  openLoading,
  closeLoading,
} from "../../../redux/actions";

import SideBar from "../SideBar/SideBar";
import AddData from "./AddData/AddData";
import InvoiceData from "./InvoiceData/InvoiceData";
import InvoiceTable from "./invoiceTable/InvoiceTable";
import AddProduct from "./AddProduct/AddProduct";
import AddClient from "./AddClient/AddClient";
import PDF from "../PDF/PDF";

import "./InvoicesForm.css";

const initialInvoice = {
  CLI_CODIGO: 0,
  CLI_DIRECCION: "S/N",
  CLI_EMAIL: "-",
  CLI_IDENTIFICACION: "9999999999999",
  CLI_NOMBRE: "CONSUMIDOR FINAL",
  CLI_TELEFONO: "-",
  CLI_TIPOIDE: "-",
  EMP_CODIGO: 0,
  ITE_CODIGO: 0,
  ITE_COSTO: 0,
  ITE_EXISTENCIA: 0,
  LOC_CODIGO: 0,
  PTO_CODIGO: 0,
  USU_CODIGO: 0,
  VDR_CODIGO: 0,
  VED_CODIGO: 0,
  VEN_CAMPO1: "",
  VEN_CAMPO2: "",
  VEN_CAMPO3: "",
  VEN_CLAVEACCESO: "",
  VEN_CODIGO: 0,
  VEN_COMISION: 0,
  VEN_DESCUENTO: 0,
  VEN_ESTABLECIMIENTO: "001",
  VEN_ESTADO: 1,
  VEN_FAUTORIZA: 1,
  VEN_FECHA: new Date().toLocaleDateString().split("/").join("-"),
  VEN_FPAGO: "01",
  VEN_GUIA: "-",
  VEN_ICE: 0.0,
  VEN_IMPRESO: 0.0,
  VEN_IVA: 0.0,
  VEN_NUMERO: 1,
  VEN_PTOEMISION: "001",
  VEN_RETENCION: 0.0,
  VEN_SRI: 0.0,
  VEN_SUBTOTAL: 0.0,
  VEN_SUBTOTAL0: 0.0,
  VEN_SUBTOTAL12: 0.0,
  VEN_SUBTOTALEXCENTIVA: 0.0,
  VEN_SUBTOTALNOIVA: 0.0,
  VEN_TIPODOC: "",
  VEN_TOTAL: 0.0,
  VEN_UKEY: "",
  VEN_VALOR1: "",
  VEN_VALOR2: "",
  VEN_VALOR3: "",
};

export default function InvoicesForm({
  addInvoice,
  handleAddInvoice,
  handleAddProduct,
  handleAddClient,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDB);
  const [formProduct, setFormproduct] = useState(false);
  const [formClient, setFormClient] = useState(false);
  const [newProducts, setNewProduct] = useState([]);
  const [invoice, setInvoice] = useState();
  const [invoicePDF, setPDF] = useState(null);
  const [error, setError] = useState({
    VEN_GUIA: false,
    INFO: false,
  });

  /* Valores del usuario */
  useEffect(() => {
    setInvoice({
      ...initialInvoice,
      VEN_ESTABLECIMIENTO: user.EMP_ESTABLECIMIENTO,
      VEN_PTOEMISION: user.EMP_PTOEMISION,
      VEN_NUMERO: user.EMP_NUMERO + 1,
    });
  }, [user]);

  /* Calcular totales por cada cambio */
  useEffect(() => {
    let subtotal = 0;
    let subtotalPorcentual = 0;
    let subtotalIVA = 0;
    let total = 0;

    newProducts.forEach((p) => {
      subtotal += p.VED_PUNITARIO * p.VED_CANTIDAD;

      if (p.VED_IMPUESTO === "2") {
        total += (p.VED_PUNITARIOIVA * p.VED_CANTIDAD) / (1 + (p.VED_DESCUENTO / 100));
        subtotalIVA += Number(p.VED_PUNITARIO * p.VED_CANTIDAD);
      } else {
        total += p.VED_PUNITARIO * p.VED_CANTIDAD;
        subtotalPorcentual += Number(p.VED_PUNITARIO * p.VED_CANTIDAD) / (1 + (p.VED_DESCUENTO / 100));
      }
    });

    setInvoice({
      ...invoice,
      
      VEN_SUBTOTAL: subtotal.toFixed(user.EMP_PRECISION),
      VEN_SUBTOTAL0: subtotalPorcentual.toFixed(user.EMP_PRECISION),
      VEN_SUBTOTAL12: subtotalIVA.toFixed(user.EMP_PRECISION),
      VEN_TOTAL: total.toFixed(user.EMP_PRECISION),
    });
  }, [newProducts]);

  function handleChange(e) {
    console.log(invoice);
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (user.EMP_SECUENCIAL < 100) {
      if (handleValidations()) {
        dispatch(openLoading());
        const newInvoice = {
          ...invoice,
          ITE_DETELLES: newProducts,
        };

        dispatch(postInvoice(newInvoice))
          .then((d) => {
            dispatch(
              updateUserData({
                EMP_NUMERO: user.EMP_NUMERO + 1,
                EMP_SECUENCIAL: user.EMP_SECUENCIAL + 1,
              })
            ).then(() => {
              dispatch(closeLoading());
              setPDF(newInvoice);
              setInvoice({
                ...initialInvoice,
                VEN_ESTABLECIMIENTO: user.EMP_ESTABLECIMIENTO,
                VEN_PTOEMISION: user.EMP_PTOEMISION,
                VEN_NUMERO: user.EMP_NUMERO + 2,
              });
              setNewProduct([]);
              swal(
                "Guardado!",
                "Su factura se agrego correctamente",
                "success"
              );
            });
          })
          .catch((e) => {
            dispatch(closeLoading());
            swal(
              "Error",
              "Surgio un error desconocido al agregar la factura",
              "error"
            );
            console.log(e);
          });
      } else {
        swal(
          "Faltan datos",
          "\tDebes revisar los datos: productos, guia, info adicional, etc.",
          "info"
        );
      }
    } else {
      swal("¡Atencion!", "Llegaste a tu limite de 100 facturas", "warning");
    }
  }

  function handleValidations() {
    if (invoice.ITE_DETELLES && invoice.ITE_DETELLES.length <= 0) return false;
    return true;
  }

  function handleClear() {
    swal({
      title: "¡Atencion!",
      text: "¿Seguro que quiere vaciar la factura?",
      icon: "warning",
      buttons: {
        eliminar: true,
        cancel: true,
      },
    }).then((r) => {
      if (r) {
        setInvoice(initialInvoice);
        setNewProduct([]);
      }
    });
  }

  function handleClearClient() {
    setInvoice({
      ...initialInvoice,
      CLI_CODIGO: 0,
      CLI_DIRECCION: "S/N",
      CLI_EMAIL: "-",
      CLI_IDENTIFICACION: "9999999999999",
      CLI_NOMBRE: "CONSUMIDOR FINAL",
      CLI_TELEFONO: "-",
      CLI_TIPOIDE: "-",
    });
  }

  function handleFormProduct() {
    setFormproduct(!formProduct);
  }

  function handleFormClient() {
    setFormClient(!formClient);
  }

  function handleProduct(product) {
    if (!newProducts.find((pi) => pi.ITE_CODIGO === product.ITE_CODIGO)) {
      setNewProduct([
        ...newProducts,
        {
          ITE_BARRAS: product.ITE_BARRAS,
          ITE_CODIGO: product.ITE_CODIGO,
          ITE_DESCRIPCION: product.ITE_DESCRIPCION,
          VED_CANTIDAD: 1,
          VED_DESCUENTO: 0,
          VED_IMPUESTO: product.ITE_IMPUESTO,
          VED_PORCENTAJE: "",
          VED_PUNITARIO: product.ITE_PVP,
          VED_PUNITARIOIVA:
            product.ITE_IMPUESTO === "2"
              ? (product.ITE_PVP * 1.12).toFixed(user.EMP_PRECISION)
              : product.ITE_PVP,
          VED_UKEY: product.USU_KEY,
          VED_VALOR: product.ITE_PVP,
          VEN_CODIGO: 0,
        },
      ]);
    }
  }

  function handleClient(client) {
    setInvoice({
      ...invoice,
      CLI_CODIGO: client.CLI_CODIGO,
      CLI_DIRECCION: client.CLI_DIRECCION,
      CLI_EMAIL: client.CLI_EMAIL,
      CLI_IDENTIFICACION: client.CLI_IDENTIFICACION,
      CLI_NOMBRE: client.CLI_NOMBRE,
      CLI_TELEFONO: client.CLI_TELEFONO,
    });
    setFormClient(false);
  }

  function handleRemove(p) {
    setNewProduct(newProducts.filter((pf) => pf.code !== p.code));
  }

  function handleSetGuia(value) {
    if (invoice.VEN_GUIA !== value) {
      setInvoice({
        ...invoice,
        VEN_GUIA: value,
      });
    }
  }

  function handleChangeProduct(e, code) {
    const { name, value } = e.target;

    setNewProduct(
      newProducts.map((p) => {
        if (p.ITE_CODIGO === code) {
          let newProduct;
          if(name === "VED_PUNITARIOIVA"){
          newProduct = {
            ...p,
            VED_PUNITARIOIVA: value,
            VED_PUNITARIO:
              p.VED_IMPUESTO === "2"
                ? (value / 1.12).toFixed(user.EMP_PRECISION)
                : value
          };
          }else{
            newProduct = {
              ...p,
              [name]: value,
              VED_PUNITARIOIVA:
                p.VED_IMPUESTO === "2" && name === "VED_PUNITARIO"
                  ? (value * 1.12).toFixed(user.EMP_PRECISION)
                  : name === "VED_PUNITARIO"
                  ? value
                  : p.VED_PUNITARIOIVA,
            };
          }

          return {
            ...newProduct,
            VED_VALOR: (
              newProduct.VED_CANTIDAD *
              newProduct.VED_PUNITARIO *
              ((100 - newProduct.VED_DESCUENTO) / 100)
            ).toFixed(user.EMP_PRECISION),
          };
        }
        return p;
      })
    );
  }

  function handleClosePDF(i) {
    setPDF(null);
  }

  function handleViewPDF() {
    const currentInvoice = {
      ...invoice,
      ITE_DETELLES: newProducts,
    };
    setPDF(currentInvoice);
  }

  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />

      <div className="dashboard__invoice  to-left">
        {invoicePDF ? (
          <PDF invoice={invoicePDF} handleClosePDF={handleClosePDF}></PDF>
        ) : null}
        <div className="invoice__top">
          <AddData
            invoice={invoice}
            handleChange={handleChange}
            handleFormClient={handleFormClient}
            handleFormProduct={handleFormProduct}
            handleClient={handleClient}
            handleProduct={handleProduct}
            handleAddProduct={handleAddProduct}
            handleAddClient={handleAddClient}
            handleClearClient={handleClearClient}
          />
          <InvoiceData
            invoice={invoice}
            handleChange={handleChange}
            handleSetGuia={handleSetGuia}
          />
        </div>

        <div className="invoice__mid">
          <InvoiceTable
            user={user}
            invoice={invoice}
            newProducts={newProducts}
            handleChangeProduct={handleChangeProduct}
            handleChange={handleChange}
          />
        </div>

        <div className="buttons">
          <button className="btn btn-primary" onClick={handleClear}>
            Nueva factura
          </button>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Guardar factura
          </button>

          <button className="btn btn-primary" onClick={handleViewPDF}>
            RIDE
          </button>
        </div>

        {/* VENTANA PARA AGREGAR PRODUCTOS */}
        {formProduct ? (
          <AddProduct
            handleFormProduct={handleFormProduct}
            handleProduct={handleProduct}
            handleRemove={handleRemove}
            handleAddProduct={handleAddProduct}
          />
        ) : null}

        {/* VENTANA PARA AGREGAR CLIENTES */}
        {formClient ? (
          <AddClient
            handleFormClient={handleFormClient}
            handleClient={handleClient}
            handleClearClient={handleClearClient}
            handleAddClient={handleAddClient}
          />
        ) : null}
      </div>
    </div>
  );
}
