import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 


// Here, we display our Navbar
function Navbar() {
    
 return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
            <a href="https://getbootstrap.com/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            </a>
            <span class="text-muted">© 2021 Fistaszki, Inc</span>
        </div>
        
        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li class="ms-3"><a class="text-muted" href="https://getbootstrap.com/docs/5.1/examples/footers/#"></a></li>
            <li class="ms-3"><a class="text-muted" href="https://getbootstrap.com/docs/5.1/examples/footers/#"></a></li>
            <li class="ms-3"><a class="text-muted" href="https://getbootstrap.com/docs/5.1/examples/footers/#"></a></li>
        </ul>
    </footer>
 );
}

export default Navbar



