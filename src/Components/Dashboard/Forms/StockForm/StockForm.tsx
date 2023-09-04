import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../models/RootState";
import {
  postProduct,
  openLoading,
  closeLoading,
} from "../../../../redux/actions";
import swal from "sweetalert";

import SearchProduct from "../../InvoicesForm/AddData/SearchProduct/SearchProduct";

import "../Form.css";
import { Producto } from "../../../../models/productos";
import Table from "./Table/Table";
import { ReporteKardex, initReporteKardex } from "../../../../models/kardex";
import useProducto from "../../../../hooks/useProductos";

interface Props {
  handleAddProduct: () => void;
  handleAddStock: () => void;
}

export default function StockForm({ handleAddProduct, handleAddStock }: Props) {
  const dispatch = useDispatch();
  const product = useProducto();
  const [productsSelected, setProductsSelected] = useState<Producto[]>([]);
  const [kardex, setKardex] = useState<ReporteKardex[]>([]);


  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    /* AGREGAR VALIDACION DE ERRORES */
    product.existencias.agregar(productsSelected, kardex);
  }

  function handleClose() {
    handleAddStock();
  }
  function handleSelectedProduct(product: Producto) {
    setProductsSelected([...productsSelected, { ...product }]);
    setKardex([...kardex, { ...initReporteKardex(), ITE_CODIGO: product.ITE_CODIGO }]);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, productId: string) {
    const name = event.target.name;
    const value = event.target.value

    setKardex(kardex.map((kardex) => kardex.ITE_CODIGO === productId ? { ...kardex, [name]: value } : kardex));
  }

  function handleRemove(productId: string) {
    setProductsSelected(productsSelected.filter((product) => product.ITE_CODIGO !== productId));
    setKardex(kardex.filter((kardex) => kardex.ITE_CODIGO !== productId));
  }

  return (
    <div className="container__form">
      <form className="form to-left" onSubmit={handleSubmit}>
        <div className="form__close">
          <h2>Nuevo inventario</h2>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <SearchProduct
          handleProduct={handleSelectedProduct}
          handleFormProduct={handleAddProduct}
        />
        <Table
          products={productsSelected}
          kardex={kardex}
          handleChange={handleChange}
          handleRemove={handleRemove}
        />
        <button type="submit" className="btn btn-primary">
          Agregar producto
        </button>
      </form >
    </div >
  );
}
