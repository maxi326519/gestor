import { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmObligaciones, openLoading, closeLoading } from "../../../../redux/actions";

import "./Obligations.css";

export default function Obligations() {
  const dispatch = useDispatch();
  const initialState = {
    EMP_REGIMEN: 0,
    EMP_SOCIEDAD: false,
    EMP_AGENTE_RETENCION: false,
    EMP_INCLUYEIVA: false,
  };

  const [obligaciones, setObligaciones] = useState(initialState);

  function handleChange(e) {
    setObligaciones({
      ...obligaciones,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheck(e) {
    setObligaciones({
      ...obligaciones,
      [e.target.name]: e.target.checked,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(openLoading());
    dispatch(confirmObligaciones(obligaciones))
    .then(() => dispatch(closeLoading()))
    .catch((e) => {
      dispatch(closeLoading());
/*       toast(e.message); */
      console.log(e.message);
    })
  }

  return (
    <form className="obligations to-left" onSubmit={handleSubmit}>
      <hr></hr>
      <h5>Obligaciones</h5>
      <div className="form-floating mb-3">
        <select
          className="form-select select-input"
          id="floatingInput"
          name="EMP_REGIMEN"
          onChange={handleChange}
          required
        >
          <option value="0">Seleccionar</option>
          <option value="1">General</option>
          <option value="2">Emprendedor</option>
        </select>
        <label htmFor="floatingInput">Regimen</label>
      </div>
      <div className="check-container">
        <label>
          <input name="EMP_SOCIEDAD" type="checkbox" onChange={handleCheck} />
          Obligado a llevar contabilidad
        </label>
        <label>
          <input
            name="EMP_AGENTE_RETENCION"
            type="checkbox"
            onChange={handleCheck}
          />
          Agente de retención
        </label>
        <label>
          <input
            name="EMP_INCLUYEIVA"
            type="checkbox"
            onChange={handleCheck}
          />
          Incluir IVA
        </label>
      </div>
      <button className="btn btn-primary" onSubmit={handleSubmit}>
        Guardar datos
      </button>
    </form>
  );
}
