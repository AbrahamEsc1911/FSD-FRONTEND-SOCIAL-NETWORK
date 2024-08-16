import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PostProvider } from "./Context/postContext/postContex.jsx";
import { AnyUserProvider } from "./Context/AnyUserProfileContext/anyUserProfileContext.jsx";
import { NewPostProvider } from "./Context/NewPostContext/NewPostContext.jsx";
import { NavBarProvider } from "./Context/NavBarContext/NavBarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PostProvider>
        <AnyUserProvider>
          <NewPostProvider>
            <NavBarProvider>
              <App />
            </NavBarProvider>
          </NewPostProvider>
        </AnyUserProvider>
      </PostProvider>
    </BrowserRouter>
  </React.StrictMode>
);
