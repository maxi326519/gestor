import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { addClient } from '../../../../redux/actions';

import './ClientForm.css'

export default function ClientForm(){
    const userId = useSelector((state) => state.user.id);
    const dispatch = useDispatch();
    const [client, setclient] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    function handleChange(e){
        setclient({ ...client, [e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addClient(userId, client));
    }

    return(
        <form className="clientForm" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input className="form-control" name="name" onChange={handleChange}/>
            </div>

            {/* Email*/}
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" name="email" onChange={handleChange}/>
            </div>

            {/* Adress */}
            <div className="mb-3">
                <label className="form-label">Direccion</label>
                <input className="form-control" name="address" onChange={handleChange}/>
            </div>

            {/* Phone */}
            <div className="mb-3">
                <label className="form-label">Telefono</label>
                <input className="form-control" name="phone" onChange={handleChange}/>
            </div>

            <button type='submit' className='btn btn-success'>
                Agregar Cliente
            </button>
        </form>
    )    
}