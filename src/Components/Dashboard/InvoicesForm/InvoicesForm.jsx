import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import clave2 from "../../../functions/Clave.ts";
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
import { usePDF } from "../PDF/usePDF.js";

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
  VEN_CLAVEACCESO: null,
  VEN_CODIGO: 0,
  VEN_COMISION: 0,
  VEN_DESCUENTO: 0,
  VEN_ESTABLECIMIENTO: 1,
  VEN_ESTADO: 1,
  VEN_FAUTORIZA: 1,
  VEN_FECHA: new Date().toISOString().split("T")[0],
  VEN_FPAGO: "01",
  VEN_GUIA: "-",
  VEN_ICE: 0.0,
  VEN_IMPRESO: 0.0,
  VEN_IVA: 0.0,
  VEN_NUMERO: 1,
  VEN_PTOEMISION: 1,
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
  handleAddInvoice,
  handleAddProduct,
  handleAddClient,
  handleProfile,
}) {
  const dispatch = useDispatch();
  const pdf = usePDF();
  const user = useSelector((state) => state.user.userDB);
  const [formProduct, setFormproduct] = useState(false);
  const [formClient, setFormClient] = useState(false);
  const [newProducts, setNewProduct] = useState([]);
  const [invoice, setInvoice] = useState(initialInvoice);
  const [discount, setDiscount] = useState(0);

  /* Calcular totales por cada cambio */
  useEffect(() => {
    setInvoice({
      ...invoice,
      ...update(),
    });
  }, [newProducts, user, discount]);

  function handleChange(e) {
    if (e.target.name === "VEN_DESCUENTO_POR") {
      if (Number(e.target.value) <= 100 && Number(e.target.value) >= 0)
        setDiscount(Number(e.target.value));
    } else {
      setInvoice({ ...invoice, [e.target.name]: e.target.value });
    }
  }

  function update() {
    let subtotal = 0;
    let subtotalPorcentual = 0;
    let subtotalIVA = 0;
    let total = 0;
    let productDiscount = 0;

    newProducts.forEach((p) => {
      subtotal +=
        p.VED_PUNITARIO * p.VED_CANTIDAD * (1 - p.VED_DESCUENTO / 100);
      productDiscount += p.VED_PUNITARIOIVA * (p.VED_DESCUENTO / 100);

      if (p.VED_IMPUESTO === "2") {
        total +=
          p.VED_PUNITARIOIVA * p.VED_CANTIDAD * (1 - p.VED_DESCUENTO / 100);
        subtotalIVA +=
          p.VED_PUNITARIO * p.VED_CANTIDAD * (1 - p.VED_DESCUENTO / 100);
      } else {
        total += p.VED_PUNITARIO * p.VED_CANTIDAD * (1 - p.VED_DESCUENTO / 100);
        subtotalPorcentual +=
          p.VED_PUNITARIO * p.VED_CANTIDAD * (1 - p.VED_DESCUENTO / 100);
      }
    });

    return {
      VEN_ESTABLECIMIENTO: user.EMP_ESTABLECIMIENTO,
      VEN_PTOEMISION: user.EMP_PTOEMISION,
      VEN_NUMERO: user.EMP_NUMERO,
      VEN_DESCUENTO: total * (discount / 100) + productDiscount,
      VEN_SUBTOTAL: subtotal.toFixed(user.EMP_PRECISION),
      VEN_SUBTOTAL0: subtotalPorcentual.toFixed(user.EMP_PRECISION),
      VEN_SUBTOTAL12: subtotalIVA.toFixed(user.EMP_PRECISION),
      VEN_TOTAL: (total * (1 - discount / 100)).toFixed(user.EMP_PRECISION),
    };
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (user.EMP_SECUENCIAL < 100) {
      if (handleValidations()) {
        dispatch(openLoading());
        const newInvoice = {
          ...invoice,
          ITE_DETALLES: newProducts,
          VEN_CLAVEACCESO: clave2(
            user.EMP_RUC,
            invoice.VEN_FECHA.split("-").reverse().join("-"),
            `00000000${invoice.VEN_NUMERO}`.slice(-9),
            `00${invoice.VEN_ESTABLECIMIENTO}`.slice(-3),
            `00${invoice.VEN_PTOEMISION}`.slice(-3),
            Number(user.EMP_CODIGO)
          ),
        };

        dispatch(postInvoice(newInvoice))
          .then(() => {
            dispatch(
              updateUserData({
                EMP_NUMERO: Number(user.EMP_NUMERO) + 1,
                EMP_SECUENCIAL: Number(user.EMP_SECUENCIAL) + 1,
              })
            ).then(() => {
              dispatch(closeLoading());
              pdf.openPDF(newInvoice);

              setInvoice({
                ...initialInvoice,
                VEN_ESTABLECIMIENTO: user.EMP_ESTABLECIMIENTO,
                VEN_PTOEMISION: user.EMP_PTOEMISION,
                VEN_NUMERO: user.EMP_NUMERO,
              });
              setNewProduct([]);
              swal(
                "Guardado!",
                "Su factura se agrego correctamente",
                "success"
              );
              handleOpenPDF();
            });
          })
          .catch((e) => {
            dispatch(closeLoading());
            if (e.message.includes("Ya existe ese numero de factura")) {
              swal("Error", "Ya existe ese numero de factura", "error");
            } else {
              swal(
                "Error",
                "Surgio un error desconocido al cargar la factura",
                "error"
              );
            }
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
    if (newProducts.length <= 0) return false;
    if (invoice.VEN_CAMPO1 !== "" && invoice.VEN_VALOR1 === "") return false;
    if (invoice.VEN_CAMPO2 !== "" && invoice.VEN_VALOR2 === "") return false;
    if (invoice.VEN_CAMPO3 !== "" && invoice.VEN_VALOR3 === "") return false;
    if (invoice.VEN_CAMPO1 === "" && invoice.VEN_VALOR1 !== "") return false;
    if (invoice.VEN_CAMPO2 === "" && invoice.VEN_VALOR2 !== "") return false;
    if (invoice.VEN_CAMPO3 === "" && invoice.VEN_VALOR3 !== "") return false;

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
    if (!newProducts.some((pi) => pi.ITE_CODIGO === product.ITE_CODIGO)) {
      let data = {
        ITE_BARRAS: product.ITE_BARRAS,
        ITE_CODIGO: product.ITE_CODIGO,
        ITE_DESCRIPCION: product.ITE_DESCRIPCION,
        VED_CANTIDAD: 1,
        VED_DESCUENTO: 0,
        VED_IMPUESTO: product.ITE_IMPUESTO,
        VED_PORCENTAJE: "",
        VED_PUNITARIO: 0,
        VED_PUNITARIOIVA: 0,
        VED_UKEY: product.USU_KEY,
        VED_VALOR: product.ITE_PVP,
        VEN_CODIGO: 0,
      };

      console.log("Iva:", user.EMP_INCLUYEIVA);

      if (user.EMP_INCLUYEIVA) {
        data.VED_PUNITARIO = product.ITE_PVP / 1.12;
        data.VED_PUNITARIOIVA = product.ITE_PVP;
      } else if (user.EMP_INCLUYEIVA === false) {
        data.VED_PUNITARIO = product.ITE_PVP;
        data.VED_PUNITARIOIVA =
          product.ITE_IMPUESTO === "2"
            ? (product.ITE_PVP * 1.12).toFixed(user.EMP_PRECISION)
            : product.ITE_PVP;
      }

      console.log("Add new product:", data);

      setNewProduct([...newProducts, data]);
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

  function handleRemove(product) {
    setNewProduct(
      newProducts.filter((p) => p.ITE_CODIGO !== product.ITE_CODIGO)
    );
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
    let { name, value } = e.target;

    setNewProduct(
      newProducts.map((p) => {
        if (p.ITE_CODIGO === code) {
          let newProduct;

          if (name === "VED_PUNITARIOIVA") {
            newProduct = {
              ...p,
              VED_PUNITARIOIVA: value,
              VED_PUNITARIO:
                p.VED_IMPUESTO === "2"
                  ? (value / 1.12).toFixed(user.EMP_PRECISION)
                  : value,
            };
          } else {
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

  function handleOpenRide() {
    const currentInvoice = {
      ...invoice,
      ITE_DETALLES: newProducts,
    };
    pdf.openPDF(currentInvoice);
  }

  return (
    <div className="dashboard">
      <SideBar
        handleAddInvoice={handleAddInvoice}
        handleAddProduct={handleAddProduct}
        handleAddClient={handleAddClient}
      />
      <div className="dashboard__invoice to-left">
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
            handleProfile={handleProfile}
          />
        </div>
        <InvoiceTable
          user={user}
          invoice={invoice}
          discount={discount}
          setDiscount={setDiscount}
          newProducts={newProducts}
          handleChangeProduct={handleChangeProduct}
          handleChange={handleChange}
          handleProductRemove={handleRemove}
        />
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleClear}>
            Nueva factura
          </button>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Guardar factura
          </button>

          <button className="btn btn-primary" onClick={handleOpenRide}>
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
