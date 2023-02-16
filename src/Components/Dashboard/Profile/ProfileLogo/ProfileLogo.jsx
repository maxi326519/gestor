import { useState } from "react";

import "./ProfileLogo.css";

export default function ProfileLogo({ userData, disabled }) {

    const [file, setFile] = useState();

  return (
    <div className="profile_logo_container">
      <div className="logo-container">
        {userData.EMP_LOGO ? (
          <img src={userData.EMP_LOGO} alt="your-logo" />
        ) : (
          <span>Seleccione una imagen</span>
        )}
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