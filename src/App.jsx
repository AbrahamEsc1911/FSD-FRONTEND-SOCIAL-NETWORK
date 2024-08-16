import { useContext } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Body } from "./views/Body/Body";
import { NavBar } from "./views/NavBar/NavBar";
import { NavBarContext } from "./Context/NavBarContext/NavBarContext";

function App() {
  const passport = JSON.parse(localStorage.getItem("passport"));
  const {navBar, setNavBar} = useContext(NavBarContext)
  let token = null;
  if (passport) {
    token = passport.token;
    setNavBar(true)
  }

  return (
    <>
      <div>
        {navBar && (
          <div className="app-container">
            <div className="navbar-container">
              <NavBar />
            </div>
            <div className="content-container">
              <Body />
              <Footer />
            </div>
          </div>
        )}
      </div>
      <div>
        {!passport && (
          <div className="content-container-full-width">
            <div>
              <Body />
            </div>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
