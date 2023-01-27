import React from 'react';

import SideBar from "../SideBar/SideBar";
import InvoicesForm from "./InvoicesForm/InvoicesForm";
import InvoicesList from "./InvoicesList/InvoicesList";

import './Invoices.css';

export default function Invoices() {
  return (
    <div className="invoices">
      <SideBar />
      <div className="invoices__container">
        <InvoicesList />
        <InvoicesForm />
      </div>
    </div>
  );
}
