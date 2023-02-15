export default function Buttons({ disabled, handleDisabled}) {
  return (
    <div>
      {disabled ? (
        <div className="profile-btn-container">
          <button className="btn btn-primary" onClick={handleDisabled}>
            Modificar perfil
          </button>
        </div>
      ) : (
        <div className="profile-btn-container">
          <button
            id="submit"
            type="submit"
            className="btn btn-success"
            onClick={handleDisabled}
          >
            Guardar
          </button>

          <button
            className="btn btn-danger"
            style={{ marginLeft: "20px" }}
            onClick={() => {
              handleDisabled();
/*               setUser(user); */
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
