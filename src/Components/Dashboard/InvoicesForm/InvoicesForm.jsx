import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postInvoice, openLoading, closeLoading } from "../../../redux/actions";

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
  CLI_EMAIL: "",
  CLI_IDENTIFICACION: "",
  CLI_NOMBRE: "CONSUMIDOR FINAL",
  CLI_TELEFONO: "",
  CLI_TIPOIDE: "",
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
  VEN_ESTABLECIMIENTO: "",
  VEN_ESTADO: 3,
  VEN_FAUTORIZA: new Date(),
  VEN_FECHA: new Date().toLocaleDateString(),
  VEN_FPAGO: 0,
  VEN_GUIA: "",
  VEN_ICE: 0,
  VEN_IMPRESO: 0,
  VEN_IVA: 0,
  VEN_NUMERO: "",
  VEN_PTOEMISION: "",
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

  useEffect(() => {
    setInvoice({
      ...invoice,
      VEN_ESTABLECIMIENTO: user.EMP_ESTABLECIMIENTO,
      VEN_PTOEMISION: user.EMP_PTOEMISION,
      VEN_NUMERO: user.EMP_NUMERO,
    });
  }, [user, setInvoice]);

  function handleChange(e) {
    console.log(e.target);
    console.log(invoice);
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());

    console.log(invoice);

    dispatch(postInvoice(invoice))
      .then((d) => {
        dispatch(closeLoading());
        toast("¡Factura agregada exitosamente!");
      })
      .catch((e) => {
        dispatch(closeLoading());
        toast("Error al agregar la factura");
        console.log(e);
      });
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
          VED_DESCUENTO: "",
          VED_IMPUESTO: product.ITE_IMPUESTO,
          VED_PORCENTAJE: "",
          VED_PUNITARIO: product.ITE_PVP,
          VED_PUNITARIOIVA: product.ITE_IMPUESTO
            ? (product.ITE_PVP * 1.12).toFixed(2)
            : product.ITE_PVP,
          VED_UKEY: product.USU_KEY,
          VED_VALOR: "",
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

  function setAmount(amount, code) {
    setNewProduct(
      newProducts.map((p) => {
        if (p.ITE_CODIGO === code) {
          return {
            ...p,
            VED_CANTIDAD: amount,
          };
        }
        return p;
      })
    );
  }

  useEffect(() => {
    let subtotal = 0;
    let subtotalPorcentual = 0;
    let subtotalIVA = 0;
    let iva = 0;
    let total = 0;

    newProducts.forEach((p) => {
      subtotal += p.VED_PUNITARIO * p.VED_CANTIDAD;

      if (p.VED_IMPUESTO) {
        total += p.VED_PUNITARIO * 1.12 * p.VED_CANTIDAD;
        subtotalIVA += Number(p.VED_PUNITARIO * p.VED_CANTIDAD);
        iva += p.VED_PUNITARIO * 1.12 * p.VED_CANTIDAD;
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
      VEN_SUBTOTALEXCENTIVA: iva.toFixed(user.EMP_PRECISION),
      VEN_TOTAL: total.toFixed(user.EMP_PRECISION),
    });
  }, [newProducts]);

  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />

      <div className="dashboard__invoice">
        <div className="invoice__top">
          <AddData
            invoice={invoice}
            handleChange={handleChange}
            handleFormClient={handleFormClient}
            handleFormProduct={handleFormProduct}
            handleClient={handleClient}
            handleProduct={handleProduct}
          />
          <InvoiceData invoice={invoice} handleChange={handleChange} />
        </div>

        <div className="invoice__mid">
          <InvoiceTable
            user={user}
            invoice={invoice}
            newProducts={newProducts}
            setAmount={setAmount}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Agregar factura
        </button>

        {/* VENTANA PARA AGREGAR PRODUCTOS */}
        {formProduct ? (
          <AddProduct
            handleFormProduct={handleFormProduct}
            handleAdd={handleProduct}
            handleRemove={handleRemove}
          />
        ) : null}

        {/* VENTANA PARA AGREGAR CLIENTES */}
        {formClient ? (
          <AddClient
            handleFormClient={handleFormClient}
            handleSelect={handleSelect}
          />
        ) : null}
      </div>
    </div>
  );
}
