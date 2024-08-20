import React, { useContext, useState } from "react";
import { CInputs } from "../../components/CInputs/CInputs";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/auth.services";
import { jwtDecode } from "jwt-decode";
import { PostContext } from "../../Context/postContext/postContex";
import { AnyUserContex } from "../../Context/AnyUserProfileContext/anyUserProfileContext";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";
import { NavBarContext } from "../../Context/NavBarContext/NavBarContext";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [warningMessage, setWarningMessage] = useState(false);
  const [invalidAccesMessage, setInvalidAccesMessage] = useState(false);
  const [passwordChart, setPasswordChart] = useState(false);
  const navigate = useNavigate();
  const { postId, setPostId } = useContext(PostContext);
  const { setNavBar } = useContext(NavBarContext);
  const { navigationPath, setNavigationPath } = useContext(AnyUserContex);

  const handleChangeLog = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginButton = async () => {
    if (credentials.email.length === 0 || credentials.password.length === 0) {
      setWarningMessage(true);
      setInvalidAccesMessage(false);
    } else if (
      credentials.password.length < 8 ||
      credentials.password.length > 12
    ) {
      setWarningMessage(false);
      setPasswordChart(true);
      setInvalidAccesMessage(false);
    } else {
      const response = await login(credentials);
      setPasswordChart(false);

      if (response.success) {
        setNavBar('profile');
        const tokenDecoded = jwtDecode(response.data);
        const passport = {
          token: response.data,
          tokenData: tokenDecoded,
        };
        localStorage.setItem("passport", JSON.stringify(passport));
        if (postId !== null) {
          navigate(`/post/${postId}`);
          setPostId(null);
        } else if (navigationPath !== null) {
          navigate(`/user/${navigationPath}`);
          setNavigationPath(null);
        } else {
          navigate("/profile");
        }
      } else {
        setInvalidAccesMessage(true);
      }
    }
  };

  const goToRegister = () => {
    navigate("../register");
  };

  return (
    <>
      <div className="login-view-main">
        <div className="section-login-container">
          <CBlockContent
            content={
              <div className="login-container">
                <h2 className="text-no-margin">Login</h2>
                <div>
                  <CInputs
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChangeLog}
                    className="input-login"
                  />
                </div>
                <div>
                  <CInputs
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChangeLog}
                    className="input-login"
                  />
                </div>
                <p className={warningMessage ? "" : "hidden-content"}>
                  Email and password are required.
                </p>
                <p className={passwordChart ? "" : "hidden-content"}>
                  The password must be greater than 8 and less than 12
                  characters.
                </p>
                <p className={invalidAccesMessage ? "" : "hidden-content"}>
                  Incorrect email or password.
                </p>
                <div>
                  <CInputs
                    type="button"
                    name="login"
                    value="Login"
                    onClick={loginButton}
                    className="button-login"
                  />
                  <p className="text-no-margin">
                    Don't have an acoutn yet?{" "}
                    <span className="special-text" onClick={goToRegister}>
                      Sing up
                    </span>
                  </p>
                </div>
              </div>
            }
          />
        </div>
        <div className="section-login-image">
          <img src="./images/login-image.svg" alt="login-main-image" id="banner-home-main" />
        </div>
      </div>
    </>
  );
};
