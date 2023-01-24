import React from 'react';

export default function UserCard({name, userName, email, adress, phone}){
    return(
        <div className='userCard'>
            <span>{name}</span>
            <span>{userName}</span>
            <span>{email}</span>
            <span>{adress}</span>
            <span>{phone}</span>
        </div>
    )
}