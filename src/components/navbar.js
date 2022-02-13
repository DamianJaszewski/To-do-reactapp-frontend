import React from "react";
import {Link} from 'react-router-dom'

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import Login from "./login";
import Logout from "./logout";
 
// Here, we display our Navbar
export default function Navbar() {

 return (
  <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <Link class='btn btn-primary' to='/'>Panel zadań</Link>

  <div class="row">
    <Login/>
    <Logout/>
  </div>
</header>
 );
}