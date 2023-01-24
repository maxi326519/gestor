import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClient } from '../../../../redux/actions';

import './ClientForm.css'

export default function ClientForm(){

    const dispatch = useDispatch();
    const [client, setclient] = useState({
        name: "",
        clientName: "",
        email: "",
        address: "",
        phone: ""
    });

    function handleChange(e){
        setclient({ ...client, [e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addClient(client));
    }

    return(
        <form className="clientForm" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input className="form-control" name="name" onChange={handleChange}/>
            </div>

            {/* Usuario */}
            <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input className="form-control" name="clientName" onChange={handleChange}/>
            </div>

            {/* Email*/}
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" name="email" onChange={handleChange}/>
            </div>

            {/* Adress */}
            <div className="mb-3">
                <label className="form-label">Direccion</label>
                <input className="form-control" name="adress" onChange={handleChange}/>
            </div>

            {/* Phone */}
            <div className="mb-3">
                <label className="form-label">Telefono</label>
                <input className="form-control" name="phone" onChange={handleChange}/>
            </div>

            <button type='submit' className='btn btn-success'>
                Agregar usuario
            </button>
        </form>
    )    
}