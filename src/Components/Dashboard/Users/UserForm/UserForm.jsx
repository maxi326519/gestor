import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../../redux/actions';

import './UserForm.css'

export default function UserForm(){

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "",
        userName: "",
        email: "",
        adress: "",
        phone: ""
    });

    function handleChange(e){
        console.log(user);
        setUser({ ...user, [e.target.name]: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addUser(user));
    }

    return(
        <form className="userForm" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input className="form-control" name="name" onChange={handleChange}/>
            </div>

            {/* Usuario */}
            <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input className="form-control" name="userName" onChange={handleChange}/>
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