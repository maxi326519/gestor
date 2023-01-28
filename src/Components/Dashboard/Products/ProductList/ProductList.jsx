import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../../redux/actions";
import { toast } from "react-toastify";

import DataGrid from 'react-data-grid';
import addSquare from '../../../../assets/svg/add-square.svg';

import 'react-data-grid/lib/styles.css';
import "./ProductList.css";

export default function ProductList({ handleAddProduct }) {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.products);
  const userId = useSelector((state) => state.user.id);
  const [filterRows, setFilters] = useState(null);
  const columns = [
    { key: "name", name: "Nombre"},
    { key: "price", name: "Precio"},
    { key: "taxes", name: "Impuesto"},
    { key: "type", name: "tipo"},
    { key: "code", name: "Codigo"},
    { key: "stock", name: "Stock"},
    { key: "state", name: "Estado"},
    { key: "description", name: "description"}
  ]

  useEffect(()=>{
    if(rows.length <= 0){
      dispatch(getProducts(userId))
      .catch(e => toast(e.message.split(':')[1]))
    }
  },[userId])

  function handleChange(e){
    const value = e.target.value;

    setFilters(rows.filter(row => {
      if(value === '') return true;
      if(row.name.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.code.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.taxes.toLowerCase().includes(value.toLowerCase())) return true;
      if(row.type.toLowerCase().includes(value.toLowerCase())) return true;
      return false;
    }));
  }

  return (
    <div className="dashboardList">
      <h3>Listado de Productos</h3>
      <div className="dashboardList__searchBar">
        <input className="form-control" placeholder="Buscar producto" onChange={handleChange}/>
        <button className='btn btn-primary' onClick={handleAddProduct}>
          <img src={addSquare} alt='export'/>
          <span>Producto</span>
        </button>
      </div>
      <DataGrid columns={columns} rows={filterRows ? filterRows : rows}/>
    </div>
  );
}