import { useEffect, useState } from "react";
import "./ProfileLogo.css";

export default function ProfileLogo({ logo, userData, disabled, handleLogo }) {
  const [logoImage, setLogoImage] = useState(null);

  useEffect(() => {
    console.log(logo);
    if (logo) {
      setLogoImage(URL.createObjectURL(logo));
    } else if (userData.EMP_LOGO) {
      setLogoImage(userData.EMP_LOGO);
    }
  }, [logo, userData.EMP_LOGO]);

  return (
    <div className="profile_logo_container">
      <div className="logo-container">
        {logoImage ? (
          <img src={logoImage} alt="your-logo" />
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
          onChange={handleLogo}
        />
      )}
    </div>
  );
}
