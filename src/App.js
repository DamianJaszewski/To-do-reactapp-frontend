import React, { useState, useEffect } from "react";
import Axios from "axios"; 

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
 
function App(){
  const[listOfRecipe, setListOfRecipe] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3000/przepisy")
    .then(res => {
      console.log(res)
      setListOfRecipe(res.data.info)
    })
    .catch(err => {
      console.log(err)
    })
  });

  return(
    <div className="App">
      <div className="recipeDisplay">
        <ul class="list-group list-group-flush">
          {listOfRecipe.map((recipe)=> {
            return <li class="list-group-item">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                  <label class="form-check-label" for="flexCheckDefault">
                  Name: {recipe.name} Difficulty: {recipe.difficulty} Time: {recipe.time} 
                  </label>
              </div> 
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

// const App = () => {
//  return (
//    <div>
//      <Navbar />
//      <Routes>
//        <Route exact path="/" element={<RecipeList />} />
//        <Route/>
//        <Route/>
//      </Routes>
//    </div>
//  );
// };
 
export default App;