import React, { useState } from "react";


export default function ExportForm({ exportInvoice, handleExportInvoice }) {
  const [exportData, setInvoice] = useState({
    dateFrom: "",
    dateTo: "",
  });

  function handleChange(e) {
    console.log(exportData);
    setInvoice({ ...exportData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      className="container__form"
      style={exportInvoice ? null : { display: "none" }}
    >
      <form className="form to-left" onSubmit={handleSubmit}>
        <div className="form__close">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleExportInvoice}
          ></button>
        </div>

        {/* Date from */}
        <div className="mb-3">
          <label className="form-label">Desde</label>
          <input
            type="date"
            name="dateFrom"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {/* Date to */}
        <div className="mb-3">
          <label className="form-label">Hasta</label>
          <input
            type="date"
            name="dateTo"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

      </form>
    </div>
  );
}
