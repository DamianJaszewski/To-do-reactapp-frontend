import React from "react";
import Axios from "axios"; 

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// Here, we display our Navbar
export default function Navbar() {

  const getEvent = () =>{
    Axios.get("http://localhost:3000/kalendarz")
  }
  
 return (
  <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
  <a href="https://getbootstrap.com/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
  </a>

  <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    <button type="submit" class="btn btn-primary" onClick={getEvent}>Połącz z kalendarzem</button>
  </ul>

  <div class="col-md-3 text-end">
    <button type="button" class="btn btn-outline-primary me-2">Login</button>
    <button type="button" class="btn btn-primary">Sign-up</button>
  </div>
</header>
 );
}