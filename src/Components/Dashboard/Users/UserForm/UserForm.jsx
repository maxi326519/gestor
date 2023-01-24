import './UserForm.css'

export default function UserForm(){
    return(
        <form className="userForm" >
            {/* Name */}
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input className="form-control"/>
            </div>

            {/* Usuario */}
            <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input className="form-control"/>
            </div>

            {/* Email*/}
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control"/>
            </div>

            {/* Adress */}
            <div className="mb-3">
                <label className="form-label">Direccion</label>
                <input className="form-control"/>
            </div>

            {/* Phone */}
            <div className="mb-3">
                <label className="form-label">Telefono</label>
                <input className="form-control"/>
            </div>

            <button type='submit' className='btn btn-success'>
                Agregar usuario
            </button>
        </form>
    )    
}