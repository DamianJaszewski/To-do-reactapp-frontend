import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// const {google} = require('googleapis');
// const{OAuth2} = google.auth

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      
      <App />

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
