import './Users.css'

import UserForm from './UserForm/UserForm';
import UserList from './UserList/UserList';

export default function Users(){
    return(
        <div className="users">
            <UserList/>
            <UserForm/>
        </div>
    )    
}