export default function ProfileLogo({ userData, disabled}) {
  return (
    <div>
      <div className="logo_flex">
        <div className="logo-container">
          {userData.EMP_LOGO ? (
            <img src={userData.EMP_LOGO} alt="your-logo" />
          ) : (
            <span>Seleccione una imagen</span>
          )}
        </div>
      </div>
      {disabled ? null : (
        <input
          type="file"
          name="file"
          accept="image/*"
          className="form-control"
          /*               onChange={handleFile} */
          required
        />
      )}
    </div>
  );
}
