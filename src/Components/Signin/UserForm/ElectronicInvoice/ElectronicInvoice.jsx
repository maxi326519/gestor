import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { storage } from "../../../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  confirmFacturaElectronica,
  openLoading,
  closeLoading,
} from "../../../../redux/actions";
import "./ElectronicInvoice.css";
import { useNavigate } from "react-router-dom";

const initialState = {
  EMP_ESTABLECIMIENTO: "001",
  EMP_PTOEMISION: "001",
  EMP_NUMERO: 1,
  EMP_PRECISION: 2,
  EMP_ARCHIVO: "",
  EMP_KEY: "",
};

export default function ElectronicInvoice() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const user = useSelector((state) => state.user.userDB);
  const [file, setFile] = useState(null);
  const [facturacion, setFacturacion] = useState(initialState);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());
    await UploadFile()
      .then((fileUrl) => {
        dispatch(
          confirmFacturaElectronica({
            ...facturacion,
            EMP_ARCHIVO: fileUrl,
          })
        )
          .then(() => {
            redirect("/dashboard");
            dispatch(closeLoading());
          })
          .catch((err) => {
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error desconocido, vuelva a intentar mas tarde",
              "error"
            );
            console.log(err);
          });
      })
      .catch((err) => {
        dispatch(closeLoading());
        swal(
          "Error",
          "Ocurrió un error desconocido al cargar el archivo, vuelva a intentar mas tarde",
          "error"
        );
        console.log(err);
      });
  }

  function handleChange(e) {
    setFacturacion({
      ...facturacion,
      [e.target.name]: e.target.value,
    });
  }

  const UploadFile = async () => {
    try {
      console.log(user);
      const dir = `users/${user.EMP_USUKEY}/firma`;

      const storageRef = ref(storage, dir);
      const imageQuery = await uploadBytes(storageRef, file);

      // GET invoice image url
      const fileUrl = await getDownloadURL(imageQuery.ref);

      return fileUrl;
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <form className="electronicInvoice to-left" onSubmit={handleSubmit}>
      <hr></hr>
      <h5>Facturacion electronica</h5>

      <div className="container_invoice_n">
        <div className="factura-container">
          {/* ESTABLECIMIENTO */}
          <div className="form-floating mb-3 ">
            <input
              className="form-control"
              type="number"
              name="EMP_ESTABLECIMIENTO"
              value={facturacion.EMP_ESTABLECIMIENTO}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Establecimiento</label>
          </div>

          {/* PTO EMISION */}
          <div className="form-floating mb-3 ">
            <input
              className="form-control"
              type="number"
              name="EMP_PTOEMISION"
              value={facturacion.EMP_PTOEMISION}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Pto Emisión</label>
          </div>
        </div>
        <div className="form-floating mb-3 number">
          <input
            className="form-control"
            type="number"
            name="EMP_NUMERO"
            value={facturacion.EMP_NUMERO}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Numero secuencial</label>
        </div>
        <div>
          <span>Decimales:</span>
          <input
            className="form-control"
            type="number"
            name="EMP_PRECISION"
            value={facturacion.EMP_PRECISION}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <label>Subir Firma electronica</label>
      <input
        type="file"
        name="file"
        accept=".p12"
        className="form-control"
        onChange={(e) => setFile(e.target.files?.[0])}
        required
      />

      {/* CLAVE DE LA FIRMA */}
      <div className="form-floating mb-3 ">
        <input
          type="password"
          className="form-control"
          name="EMP_KEY"
          value={facturacion.EMP_KEY}
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingInput">Clave de la firma</label>
      </div>

      <button className="btn btn-primary">Guardar datos de facturacion</button>
    </form>
  );
}
