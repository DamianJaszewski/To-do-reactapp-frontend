import React, { useState, useEffect } from "react";
import Axios from "axios"; 
import "./App.css"

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
 
function GetDay(props){
  const currentDate = new Date();
  
  currentDate.setDate(currentDate.getDate() + props.day);

  switch(currentDate.getDay()){
    case 1:
      return <h1>Poniedziałek</h1>
    case 2:
      return <h1>Wtorek</h1>
    case 3:
      return <h1>Środa</h1>
    case 4:
      return <h1>Czwartek</h1>
    case 5:
      return <h1>Piątek</h1>
    case 6:
      return <h1>Sobota</h1>
    case 0:
      return <h1>Niedziela</h1>
    default:
      return <h1>{currentDate.getDate()}</h1>
  } 
}

function App(){

  const currentDate = new Date();

  const[listOfTodo, setListOfTodo] = useState([])
  const[filteredTodo,setFilteredTodo] = useState(listOfTodo);

  useEffect(() => {
    Axios.get("http://localhost:3000/zadania")
    .then((res) => {
      setListOfTodo(res.data.info)
      setFilteredTodo(res.data.info);
    })
  }, []);

  //const [filteredData,setFilteredData] = useState(allData);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    console.log(value);
    result = listOfTodo.filter((data)=>{
      return data.title.search(value) != -1;
    })
    setFilteredTodo(result);
  }

  const[title, setTitle] = useState('');
  const[category, setCategory] = useState('');
  const[time, setTime] = useState(0);

  const addToList = () =>{
    Axios.post("http://localhost:3000/zadania", {category: category, title: title, time: time})
    refreshPage();
  }

  const[newTitle, setNewTitle] = useState('')

  const updateTodo = (id) =>{
    Axios.put(`http://localhost:3000/zadania/${id}`,{ newTitle: newTitle})
    refreshPage();
  }

  const deleteTodo = (id) =>{
    Axios.delete(`http://localhost:3000/zadania/${id}`)
    refreshPage();
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return(
    <div className="App">
      <div class="row">
        <div class="col">
        <form>
          <legend>Dodaj zadanie</legend>
            <div class="d-grid gap-3">
              <div class="row g-2">
              <div class="col">
                <label class="col-form-label">Filtruj</label>
              </div>
              <div class="col">
                <input class="form-control" onChange={(event) =>handleSearch(event)}/>
              </div>
            </div>
            <div class="row g-2">
              <div class="col">
                <label class="col-form-label">Kategoria</label>
              </div>
              <div class="col">
                <input type="text" class="form-control" onChange={(event) => {
                  setCategory(event.target.value);
                }}/>
              </div>
            </div>
            <div class="row g-2">
            <div class="col">
              <label class="col-form-label">Kategoria</label>
            </div>
            <div class="col">
              <input type="text" class="form-control" onChange={(event) => {
                setCategory(event.target.value);
              }}/>
            </div>
          </div>
          <div class="row g-2">
            <div class="col">
              <label class="col-form-label">Czas</label>
            </div>
            <div class="col">
              <input type="number" class="form-control" onChange={(event) => {
                setCategory(event.target.value);
              }}/>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" onClick={addToList}>Dodaj zadanie</button>
          </div>
        </form>
        </div>
        <div class="col-auto">
        <div className="todoDisplay">
          <GetDay day={-1}/>
            <ul class="list-group list-group-flush">
              {filteredTodo.map((todo)=> {
                return <li class="list-group-item">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    {/* <button type="button"  class="btn btn-outline-warning btn-sm mx-2" >{todo.category}</button>  */}
                    <input type="text" placeholder={todo.title} onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}/>
                    {/* <button type="button" class="btn btn-info btn-sm mx-2"> {todo.date}</button> */}
                    <button class="btn" onClick={()=>updateTodo(todo._id)}><i class="fa fa-edit"></i></button>
                    <button class="btn" onClick={()=>deleteTodo(todo._id)}><i class="fa fa-trash"></i></button>
                  </div> 
                </li>
              })}
            </ul>
          </div>
        </div>
        <div class="col-auto border border-warning rounded">
          <div className="todoDisplay">
          <GetDay day={0}/>
            <ul class="list-group list-group-flush">
              {filteredTodo.map((todo)=> {
                return <li class="list-group-item">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    {/* <button type="button"  class="btn btn-outline-warning btn-sm mx-2" >{todo.category}</button>  */}
                    <input type="text" placeholder={todo.title} onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}/>
                    {/* <button type="button" class="btn btn-info btn-sm mx-2"> {todo.date}</button> */}
                    <button class="btn" onClick={()=>updateTodo(todo._id)}><i class="fa fa-edit"></i></button>
                    <button class="btn" onClick={()=>deleteTodo(todo._id)}><i class="fa fa-trash"></i></button>
                  </div> 
                </li>
              })}
            </ul>
          </div>
        </div>
        <div class="col-auto">
          <GetDay day={1}/>
          <ul class="list-group list-group-flush">
              {filteredTodo.map((todo)=> {
                return <li class="list-group-item">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    {/* <button type="button"  class="btn btn-outline-warning btn-sm mx-2" >{todo.category}</button>  */}
                    <input type="text" placeholder={todo.title} onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}/>
                    {/* <button type="button" class="btn btn-info btn-sm mx-2"> {todo.date}</button> */}
                    <button class="btn" onClick={()=>updateTodo(todo._id)}><i class="fa fa-edit"></i></button>
                    <button class="btn" onClick={()=>deleteTodo(todo._id)}><i class="fa fa-trash"></i></button>
                  </div> 
                </li>
              })}
            </ul>
        </div>
        <div class="col-auto">
          <GetDay day={2}/>
          <ul class="list-group list-group-flush">
              {filteredTodo.map((todo)=> {
                return <li class="list-group-item">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    {/* <button type="button"  class="btn btn-outline-warning btn-sm mx-2" >{todo.category}</button>  */}
                    <input type="text" placeholder={todo.title} onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}/>
                    {/* <button type="button" class="btn btn-info btn-sm mx-2"> {todo.date}</button> */}
                    <button class="btn" onClick={()=>updateTodo(todo._id)}><i class="fa fa-edit"></i></button>
                    <button class="btn" onClick={()=>deleteTodo(todo._id)}><i class="fa fa-trash"></i></button>
                  </div> 
                </li>
              })}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default App