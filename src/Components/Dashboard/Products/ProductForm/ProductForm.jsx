import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../../../redux/actions';

import './ProductForm.css'

export default function ProductForm(){
    const userId = useSelector((state) => state.user.id);
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        taxes: "",
        type: "",
        code: "",
        stock: "",
        state: "",
        description: ""
    });

    function handleChange(e){
        setProduct({ ...product, [e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addProduct(userId, product));
    }

    return(
        <form className="userForm" onSubmit={handleSubmit}>

            {/* Code */}
            <div className="mb-3">
                <label className="form-label">Codigo</label>
                <input className="form-control" name="code" onChange={handleChange}/>
            </div>

            {/* Description */}
            <div className="mb-3">
                <label className="form-label">Descripcion</label>
                <textarea className="form-control" name="description" onChange={handleChange}/>
            </div>

            {/* Type */}
            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select className="form-control" name="type" onChange={handleChange}>
                    <option>Seleccione un tipo</option>
                    <option>Producto</option>
                    <option>Servicio</option>
                </select>
            </div>

            {/* Price */}
            <div className="mb-3">
                <label className="form-label">Precio</label>
                <input className="form-control" name="price" onChange={handleChange}/>
            </div>

            {/* Impuesto */}
            <div className="mb-3">
                <label className="form-label">Impuesto</label>
                <select className="form-control" name="type" onChange={handleChange}>
                    <option>Seleccione si paga impuestos</option>
                    <option>Si</option>
                    <option>No</option>
                </select>
                <input className="form-control" name="impuesto" onChange={handleChange}/>
            </div>

            <button type='submit' className='btn btn-success'>
                Agregar producto
            </button>
        </form>
    )    
}