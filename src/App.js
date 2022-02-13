import React, { useState, useEffect } from "react";
import "./App.css"
import "react-datepicker/dist/react-datepicker.css";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

function App(){

  return(
   <Routes>
     <Route path="/" element={<Dashboard/>}/>
   </Routes>
  )
}

export default App