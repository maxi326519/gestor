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

            {/* Name */}
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input className="form-control" name="name" onChange={handleChange}/>
            </div>

            {/* Price */}
            <div className="mb-3">
                <label className="form-label">Precio</label>
                <input className="form-control" name="price" onChange={handleChange}/>
            </div>

            {/* Code */}
            <div className="mb-3">
                <label className="form-label">Codigo</label>
                <input className="form-control" name="code" onChange={handleChange}/>
            </div>

            {/* State */}
            <div className="mb-3">
                <label className="form-label">Estado</label>
                <input className="form-control" name="state" onChange={handleChange}/>
            </div>

            {/* Taxes*/}
            <div className="mb-3">
                <label className="form-label">Impuesto</label>
                <input className="form-control" name="taxes" onChange={handleChange}/>
            </div>
                        
            {/* Type*/}
            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <input className="form-control" name="type" onChange={handleChange}/>
            </div>
            
            {/* Stock */}
            <div className="mb-3">
                <label className="form-label">Stock</label>
                <input className="form-control" name="stock" onChange={handleChange}/>
            </div>
            
            {/* Description */}
            <div className="mb-3">
                <label className="form-label">Descripcion</label>
                <textarea className="form-control" name="description" onChange={handleChange}/>
            </div>

            <button type='submit' className='btn btn-success'>
                Agregar producto
            </button>
        </form>
    )    
}