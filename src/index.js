import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <div class="container-fluid">
      <Navbar />
    </div>
    <div class="container-fluid">
      <App />
    </div>
    <div class="container-fluid">
      <Footer />
    </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
