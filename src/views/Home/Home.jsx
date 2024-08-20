import React, { useContext, useEffect } from "react";
import { CInputs } from "../../components/CInputs/CInputs";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let token = null;
  if (passport) {
    token = passport.token;
  }

  const navigate = useNavigate();

  const navRegister = () => {
    navigate("/register");
  };

  const navLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (passport) {
      navigate("/timeline");
    }
  }, [passport]);

  return (
    <>
      <div className="home-view-main">
        <div className="section-home-image">
          <img src="./images/home-image.svg" alt="home-social-network-image" id="banner-home-main"/>
        </div>
        <div className="section-home-container">
          <div className="text-home-container">
            <h1>Share with the World, what happend in your world</h1>
          </div>
          <div className="button-home-container">
            <CInputs type="button" value="Sing Up" onClick={navRegister} className='register-button'/>
            <CInputs type="button" value="Login" onClick={navLogin} className='login-button'/>
          </div>
        </div>
      </div>
    </>
  );
};
