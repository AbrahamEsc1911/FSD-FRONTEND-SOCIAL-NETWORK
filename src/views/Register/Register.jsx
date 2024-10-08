import React, { useState } from "react";
import { CInputs } from "../../components/CInputs/CInputs";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../Services/auth.services";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";

export const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [emailAndPassRequired, setEmailAndPassRequired] = useState(false);
  const [passwordLong, setPasswordLong] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleChange = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerButton = async () => {
    if (credentials.email.length === 0 || credentials.password.length === 0) {
      setEmailAndPassRequired(true);
      setPasswordLong(false);
    } else if (
      credentials.password.length < 8 ||
      credentials.password.length > 12
    ) {
      setEmailAndPassRequired(false);
      setPasswordLong(true);
    } else {
      setEmailAndPassRequired(false);
      const response = await register(credentials);
      if (response.success) {
        navigate("/login");
        setShowErrorMessage(false)
      } else if (response.message === "Coulnt create a new user") {
        setShowErrorMessage(true)
        setErrorMessage(
          "No fue posible registrarse, intenta de nuevo con otro email"
        );
      }
    }
  };

  const goToLogin = () => {
    navigate('../login')
  }

  return (
    <>
      <div className="register-view-main">
        <div className="section-register-container">
          <CBlockContent
            content={
              <div className="register-container">
                <h2 className="text-no-margin">Sing Up</h2>
                <CInputs
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="input-register"
                />
                <CInputs
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="input-register"
                />
                <CInputs
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="input-register"
                />
                <p className={emailAndPassRequired ? "" : "hidden-content"}>
                  Email y contraseña son requeridos
                </p>
                <p className={passwordLong ? "" : "hidden-content"}>
                  La contraseña debe ser entre 8 y 12 caracteres
                </p>
                <p className={showErrorMessage ? "" : "hidden-content"}>{errorMessage}</p>
                <div>
                  <CInputs
                    type="button"
                    value="Sing Up"
                    onClick={registerButton}
                    className="button-register"
                  />
                  <p className="text-no-margin">Already have an acount? <span className="special-text" onClick={goToLogin}>Login</span></p>
                </div>
              </div>
            }
          />
        </div>
        <div className="section-register-image">
          <img src="./images/register-image.svg" alt="image-main-register" id="banner-home-main"/>
        </div>
      </div>
    </>
  );
};
