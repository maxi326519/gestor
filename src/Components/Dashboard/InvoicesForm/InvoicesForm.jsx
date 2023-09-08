import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, get } from "firebase/database";
import { usePDF } from "../PDF/usePDF";
import { auth, db } from "../../../firebase.js";
import { initFactura } from "../../../models/factura";
import {
  updateUserData,
  openLoading,
  closeLoading,
} from "../../../redux/actions";
import swal from "sweetalert";
import clave2 from "../../../functions/Clave.ts";
import useInvoice from "../../../hooks/useInvoice";

import SideBar from "../SideBar/SideBar";
import AddData from "./AddData/AddData";
import InvoiceData from "./InvoiceData/InvoiceData";
import InvoiceTable from "./invoiceTable/InvoiceTable";
import AddProduct from "./AddProduct/AddProduct";
import AddClient from "./AddClient/AddClient";

import "./InvoicesForm.css";

export default function InvoicesForm({
  handleAddInvoice,
  handleAddStock,
  handleAddProduct,
  handleAddClient,
  handleProfile,
}) {
  const dispatch = useDispatch();
  const pdf = usePDF();
  const user = useSelector((state) => state.user.userDB);
  const invoices = useInvoice();
  const [formProduct, setFormproduct] = useState(false);
  const [formClient, setFormClient] = useState(false);
  const [newProducts, setNewProduct] = useState([]);
  const [invoice, setInvoice] = useState(initFactura());
  const [discount, setDiscount] = useState(0);

  /* Calcular totales por cada cambio */
  useEffect(() => {
    setInvoice({
      ...invoice,
      ...update(),
    });
  }, [newProducts, user, discount]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "VEN_DESCUENTO_POR") {
      if (Number(value) <= 100 && Number(value) >= 0) {
        setDiscount(Number(value));
        setNewProduct(
          newProducts.map((detalle) => ({
            ...detalle,
            VED_DESCUENTO: value,
            VED_VALOR:
              detalle.VED_PUNITARIO * detalle.VED_CANTIDAD * (1 - value / 100),
          }))
        );
      }
    } else {
      setInvoice({ ...invoice, [name]: value });
    }
  }

  function update() {
    let subtotal = 0;
    let subtotalPorcentual = 0;
    let subtotalIVA = 0;
    let total = 0;
    let descuento = 0;

    newProducts.forEach((p) => {
      subtotal += Number(
        (
          p.VED_PUNITARIO *
          p.VED_CANTIDAD *
          (1 - p.VED_DESCUENTO / 100)
        ).toFixed(2)
      );

      descuento += p.VED_PUNITARIO *  p.VED_CANTIDAD * (p.VED_DESCUENTO / 100);

      if (p.VED_IMPUESTO === "2") {
        subtotalIVA +=
          p.VED_PUNITARIO * p.VED_CANTIDAD * (1 - p.VED_DESCUENTO / 100);
      } else {
        subtotalPorcentual +=
          p.VED_PUNITARIO * p.VED_CANTIDAD * (1 - p.VED_DESCUENTO / 100);
      }
    });

    total = subtotal + subtotalIVA * 0.12;

    return {
      VEN_ESTABLECIMIENTO: user.EMP_ESTABLECIMIENTO,
      VEN_PTOEMISION: user.EMP_PTOEMISION,
      VEN_NUMERO: user.EMP_NUMERO,
      VEN_DESCUENTO: descuento,
      VEN_SUBTOTAL: subtotal.toFixed(2),
      VEN_SUBTOTAL0: subtotalPorcentual.toFixed(2),
      VEN_SUBTOTAL12: subtotalIVA.toFixed(2),
      VEN_TOTAL: total.toFixed(2),
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

        handlePostInvoice(newInvoice, 1).catch(async (e) => {
          dispatch(closeLoading());
          if (e.message.includes("Ya existe ese numero de factura")) {
            dispatch(openLoading());
            newInvoice.VEN_NUMERO = await checkNumber(invoice.VEN_NUMERO);
            newInvoice.VEN_CLAVEACCESO = clave2(
              user.EMP_RUC,
              newInvoice.VEN_FECHA.split("-").reverse().join("-"),
              `00000000${newInvoice.VEN_NUMERO}`.slice(-9),
              `00${newInvoice.VEN_ESTABLECIMIENTO}`.slice(-3),
              `00${newInvoice.VEN_PTOEMISION}`.slice(-3),
              Number(user.EMP_CODIGO)
            );
            handlePostInvoice(newInvoice).catch(() => {
              dispatch(closeLoading());
              swal(
                "Error",
                "Surgio un error desconocido al cargar la factura",
                "error"
              );
            });
            dispatch(closeLoading());
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

  async function handlePostInvoice(invoice) {
    return invoices.cargarFacturaDeVenta(invoice).then(() => {
      dispatch(
        updateUserData({
          EMP_NUMERO: Number(invoice.VEN_NUMERO) + 1,
          EMP_SECUENCIAL: Number(user.EMP_SECUENCIAL) + 1,
        })
      ).then(() => {
        // MOSTRAR EL PDF
        pdf.openInvoicePDF(invoice);

        // REINICIAR LOS DATOS
        setInvoice({
          ...initFactura(),
          VEN_ESTABLECIMIENTO: user.EMP_ESTABLECIMIENTO,
          VEN_PTOEMISION: user.EMP_PTOEMISION,
          VEN_NUMERO: user.EMP_NUMERO,
        });
        setNewProduct([]);
        dispatch(closeLoading());
        swal("Guardado!", "Su factura se agrego correctamente", "success");
      });
    });
  }

  async function checkNumber(number) {
    try {
      const url = `users/${auth.currentUser.uid}/invoices/numbers`;
      const snapshot = await get(ref(db, url));
      const numbers = [];
      let newNumber = Number(number);

      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.keys(data).forEach((id) => {
          numbers.push(id);
        });

        while (numbers.some((n) => Number(n) === newNumber)) {
          newNumber++;
        }

        return newNumber;
      }
    } catch (err) {
      console.log(err);
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
        setInvoice(initFactura());
        setNewProduct([]);
      }
    });
  }

  function handleClearClient() {
    setInvoice(initFactura());
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
        ITE_CANTIDAD: product.ITE_CANTIDAD,
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

      if (user.EMP_INCLUYEIVA) {
        data.VED_PUNITARIO =
          product.ITE_IMPUESTO === "2"
            ? (product.ITE_PVP / 1.12).toFixed(user.EMP_PRECISION)
            : product.ITE_PVP;
        data.VED_PUNITARIOIVA = product.ITE_PVP;
      } else if (user.EMP_INCLUYEIVA === false) {
        data.VED_PUNITARIO = product.ITE_PVP;
        data.VED_PUNITARIOIVA =
          product.ITE_IMPUESTO === "2"
            ? (product.ITE_PVP * 1.12).toFixed(user.EMP_PRECISION)
            : product.ITE_PVP;
      }

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
        handleAddStock={handleAddStock}
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
