import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import "./InvoicesForm.css";
import { toast } from "react-toastify";

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
  VEN_ESTADO: 3,
  VEN_FAUTORIZA: new Date(),
  VEN_FECHA: new Date().toLocaleDateString().split("/").join("-"),
  VEN_FPAGO: "01",
  VEN_GUIA: "-",
  VEN_ICE: 0,
  VEN_IMPRESO: 0,
  VEN_IVA: 0,
  VEN_NUMERO: "",
  VEN_PTOEMISION: "001",
  VEN_RETENCION: 0,
  VEN_SRI: 0,
  VEN_SUBTOTAL: 0,
  VEN_SUBTOTAL0: 0,
  VEN_SUBTOTAL12: 0,
  VEN_SUBTOTALEXCENTIVA: 0,
  VEN_SUBTOTALNOIVA: 0,
  VEN_TIPODOC: "",
  VEN_TOTAL: 0,
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
  const [invoice, setInvoice] = useState(initialInvoice);

  /* Valores del usuario */
  useEffect(() => {
    setInvoice({
      ...invoice,
      VEN_ESTABLECIMIENTO: user.EMP_ESTABLECIMIENTO,
      VEN_PTOEMISION: user.EMP_PTOEMISION,
      VEN_NUMERO: Number(user.EMP_NUMERO),
    });
  }, [user, setInvoice]);

  /* Calcular totales por cada cambio */
  useEffect(() => {
    let subtotal = 0;
    let subtotalPorcentual = 0;
    let subtotalIVA = 0;
    let total = 0;

    newProducts.forEach((p) => {
      subtotal += p.VED_PUNITARIO * p.VED_CANTIDAD;

      if (p.VED_IMPUESTO === "2") {
        total += p.VED_PUNITARIO * 1.12 * p.VED_CANTIDAD;
        subtotalIVA += Number(p.VED_PUNITARIO * p.VED_CANTIDAD);
      } else {
        total += p.VED_PUNITARIO * p.VED_CANTIDAD;
        subtotalPorcentual += Number(p.VED_PUNITARIO * p.VED_CANTIDAD);
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
          setInvoice(initialInvoice);
          setNewProduct([]);
          toast.success("¡Factura agregada exitosamente!");
        });
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast.error("Error al agregar la factura");
        console.log(e);
      });
  }
  
  function handleClear(){
    setInvoice(initialInvoice);
    setNewProduct([]);
  }

  function handleFormProduct() {
    setFormproduct(!formProduct);
  }

  function handleFormClient() {
    setFormClient(!formClient);
  }

  function handleProduct(product) {
    console.log(product);
    console.log(newProducts);
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
  }

  function handleRemove(p) {
    setNewProduct(newProducts.filter((pf) => pf.code !== p.code));
  }

  function handleSelect(client) {
    setFormClient(false);
  }

  function handleChangeProduct(e, code) {
    const { name, value } = e.target;
    console.log(name, value, code);

    setNewProduct(
      newProducts.map((p) => {
        if (p.ITE_CODIGO === code) {
          const newProduct = {
            ...p,
            [name]: value,
            VED_PUNITARIOIVA:
              p.VED_IMPUESTO === "2" && name === "VED_PUNITARIO"
                ? (value * 1.12).toFixed(2)
                : name === "VED_PUNITARIO"
                ? value
                : p.VED_PUNITARIOIVA,
          };
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

  function handleTotal() {}

  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />

      <div className="dashboard__invoice  to-left">
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
          />
          <InvoiceData invoice={invoice} handleChange={handleChange} />
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
          <button className="btn btn-primary" onClick={handleSubmit}>
            Agregar factura
          </button>

          <button className="btn btn-primary" onClick={handleClear}>
            Vaciar factura
          </button>
        </div>

        {/* VENTANA PARA AGREGAR PRODUCTOS */}
        {formProduct ? (
          <AddProduct
            handleFormProduct={handleFormProduct}
            handleAdd={handleProduct}
            handleRemove={handleRemove}
            newProducts={newProducts}
          />
        ) : null}

        {/* VENTANA PARA AGREGAR CLIENTES */}
        {formClient ? (
          <AddClient
            handleFormClient={handleFormClient}
            handleSelect={handleSelect}
            newProducts={newProducts}
          />
        ) : null}
      </div>
    </div>
  );
}
