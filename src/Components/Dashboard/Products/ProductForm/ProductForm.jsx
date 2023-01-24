import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../../redux/actions';

import './ProductForm.css'

export default function ProductForm(){

    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        bars: "",
        code: "",
        state: "",
        ice: "",
        taxes: "",
        pvp: "",
        type: "",
        locCode: "",
        amount: "",
        description: ""
    });

    function handleChange(e){
        console.log(product);
        setProduct({ ...product, [e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addProduct(product));
    }

    return(
        <form className="userForm" onSubmit={handleSubmit}>

            {/* Bars */}
            <div className="mb-3">
                <label className="form-label">Barras</label>
                <input className="form-control" name="bars" onChange={handleChange}/>
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

            {/* ICE */}
            <div className="mb-3">
                <label className="form-label">ICE</label>
                <input className="form-control" name="ice" onChange={handleChange}/>
            </div>

            {/* Taxes*/}
            <div className="mb-3">
                <label className="form-label">Impuesto</label>
                <input className="form-control" name="taxes" onChange={handleChange}/>
            </div>
            
            {/* PVP*/}
            <div className="mb-3">
                <label className="form-label">PVP</label>
                <input className="form-control" name="pvp" onChange={handleChange}/>
            </div>
                        
            {/* Type*/}
            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <input className="form-control" name="type" onChange={handleChange}/>
            </div>

            {/* Loc-Code*/}
            <div className="mb-3">
                <label className="form-label">Loc Codigo</label>
                <input className="form-control" name="locCode" onChange={handleChange}/>
            </div>
            
            {/* Amount*/}
            <div className="mb-3">
                <label className="form-label">Cantidad</label>
                <input className="form-control" name="amount" onChange={handleChange}/>
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