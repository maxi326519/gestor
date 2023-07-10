import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../redux/actions";

import ProductCard from "./ProductCard/ProductCard";

import addSquare from "../../../../assets/svg/add-square.svg";
import logout from "../../../../assets/svg/logout.svg";
import swal from "sweetalert";

export default function ProductList({ handleAddProduct, handleProfile }) {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDB);
  const products = useSelector((state) => state.products);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products);
  }, [products]);

  function handleChange(e) {
    const value = e.target.value;

    setRows(
      products.filter((p) => {
        if (value === "") return true;
        if (p.ITE_CODIGO.toLowerCase().includes(value.toLowerCase())) {
          console.log("Code", p.ITE_CODIGO);
          return true;
        }
        if (p.ITE_DESCRIPCION.toLowerCase().includes(value.toLowerCase())) {
          console.log("Description", p.ITE_DESCRIPCION);
          return true;
        }
        return false;
      })
    );
  }

  function handleLogOut() {
    swal({
      text: "¿Seguro que desea cerrar sesión?",
      icon: "warning",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(logOut())
          .then(() => {
            redirect("/login");
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    });
  }

  return (
    <div className="dashboardList">
      <div className="perfil">
        <h3>Listado de Productos</h3>
        <button
          className="btn btn-primary btn-sesion"
          type="button"
          onClick={handleLogOut}
        >
          <img src={logout} alt="logout" />
        </button>
        <button type="button" onClick={handleProfile}>
          <img src={user.EMP_LOGO} alt="logo" />
        </button>
      </div>
      <div className="dashboardList__searchBar">
        <input
          className="form-control"
          placeholder="Buscar producto"
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={handleAddProduct}>
          <img src={addSquare} alt="add product" />
          <span>Producto</span>
        </button>
      </div>
      <div className="dashboardList__grid">
        <div className="product-card first-row">
          <span>Codigo</span>
          <span>Descripcion</span>
          <span>Tipo</span>
          <span>Precio</span>
          <span>Impuesto</span>
          <span>Impuesto</span>
          <span>Editar</span>
          <span>Eliminar</span>
        </div>
        <div className="contentCard">
          {rows.length <= 0 ? (
            <div className="listEmpty">
              <span>No hay productos</span>
            </div>
          ) : (
            rows?.map((p) => <ProductCard key={p.ITE_CODIGO} product={p} />)
          )}
        </div>
      </div>
    </div>
  );
}
