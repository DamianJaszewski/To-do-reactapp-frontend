import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
 
function GetDay(props){
  const currentDate = new Date();
  
  currentDate.setDate(currentDate.getDate() + props.day);

  switch(currentDate.getDay()){
    case 1:
      return <h1 class="display-6">Poniedziałek</h1>
    case 2:
      return <h1 class="display-6">Wtorek</h1>
    case 3:
      return <h1 class="display-6">Środa</h1>
    case 4:
      return <h1 class="display-6">Czwartek</h1>
    case 5:
      return <h1 class="display-6">Piątek</h1>
    case 6:
      return <h1 class="display-6">Sobota</h1>
    case 0:
      return <h1 class="display-6">Niedziela</h1>
    default:
      return <legend>{currentDate.getDate()}</legend>
  } 
}

function Dashboard(){

  const today = new Date()
  const yesterday = new Date(today)
  const tomorrow = new Date(today)
  const dayAfterTomorrow = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  tomorrow.setDate(tomorrow.getDate() + 1)
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

  const[listOfTodo, setListOfTodo] = useState([])
  const[filteredTodo,setFilteredTodo] = useState(listOfTodo);

  const[title, setTitle] = useState('');
  const[category, setCategory] = useState('');
  const[time, setTime] = useState(0);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    Axios.get("http://localhost:3000/zadania")
    .then((res) => {
      setListOfTodo(res.data.info);
      setFilteredTodo(res.data.info);
    })
  }, []);

  //const [filteredData,setFilteredData] = useState(allData);
  //{(new Date(todo.date)).getDate()}</div>
  //{todayDate.getDate() + "." + todayDate.getMonth() + "." + todayDate.getFullYear()}</div>

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    result = listOfTodo.filter((data)=>{
      return data.title.search(value) != -1;
    })
    setFilteredTodo(result);
  }

  const addToList = () =>{
    Axios.post("http://localhost:3000/zadania", {category: category, title: title, time: time, date: startDate})
    refreshPage();
  }

  const[newTitle, setNewTitle] = useState('')

  const updateTodo = (id) =>{
    Axios.put(`http://localhost:3000/zadania/${id}`,{newTitle: newTitle})
    refreshPage();
  }

  const updateTodoDone = (id, completed) =>{
    Axios.put(`http://localhost:3000/zadania/ukonczone/${id}`,{completed: completed})
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
    <div className="Dashboard">
      <div class="row mt-5">
        <div class="col fs-5">
        <form>
          <h1 class="display-6">Dodaj zadanie</h1>
            <div class="d-grid gap-3 mt-5">
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
                <label class="col-form-label">Tytuł</label>
              </div>
              <div class="col">
                <input type="text" class="form-control" onChange={(event) => {
                  setTitle(event.target.value);
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
                setTime(event.target.value);
              }}/>
            </div>
          </div>
          <div class="row g-2">
            <div class="col">
              <label class="col-form-label">Data</label>
            </div>
            <div class="col">
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
          </div>
          <button type="submit" class="btn btn-primary" onClick={addToList}>Dodaj zadanie</button>
          </div>
        </form>
        </div>
        <div class="col">
        <div className="todoDisplay">
          <GetDay day={-1}/>
            <ul class="list-group list-group-flush mt-3">
              {filteredTodo.filter((data)=>{
                return (new Date(data.date))
                .toLocaleDateString()
                .search(yesterday.toLocaleDateString()) != -1;}).map((todo)=> {
                return <li class="list-group-item">
                  <div class="form-check fs-5">
                    <input class="form-check-input" type="checkbox" value="true" id="flexCheckDefault" onChange={()=>updateTodoDone(todo._id,todo.completed)} checked={todo.completed}/>
                    {/* <button type="button"  class="btn btn-outline-warning btn-sm mx-2" >{todo.category}</button>  */}
                    <input type="text" placeholder={todo.title} onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}/>
                    {/* <button type="button" class="btn btn-info btn-sm mx-2"> {todo.date}</button> */}
                    <button class="btn btn-small" onClick={()=>updateTodo(todo._id)}><i class="fa fa-edit"></i></button>
                    <button class="btn btn-small" onClick={()=>deleteTodo(todo._id)}><i class="fa fa-trash"></i></button>
                  </div> 
                </li>
              })}
            </ul>
          </div>
        </div>
        <div class="col border border-warning rounded">
          <div className="todoDisplay">
          <GetDay day={0}/>
            <ul class="list-group list-group-flush">
              {filteredTodo.filter((data)=>{
                return (new Date(data.date))
                .toLocaleDateString()
                .search(today.toLocaleDateString()) != -1;})
                .map((todo)=> {
                  return <li class="list-group-item">
                    <div class="form-check fs-5">
                    <input class="form-check-input" type="checkbox" value="true" id="flexCheckDefault" onChange={()=>updateTodoDone(todo._id,todo.completed)} checked={todo.completed}/>
                      {/* <button type="button"  class="btn btn-outline-warning btn-sm mx-2" >{todo.category}</button>  */}
                      <input type="text" placeholder={todo.title} onChange={(event) => {
                        setNewTitle(event.target.value);
                      }}/>
                      {/* <button type="button" class="btn btn-info btn-sm mx-2"> {todo.date}</button> */}
                      <button class="btn btn-small" onClick={()=>deleteTodo(todo._id)}><i class="fa fa-trash"></i></button>
                      <button class="btn btn-small" onClick={()=>updateTodo(todo._id)}><i class="fa fa-edit"></i></button>
                    </div> 
                  </li>
              })}
            </ul>
          </div>
        </div>
        <div class="col">
          <GetDay day={1}/>
          <ul class="list-group list-group-flush">
              {filteredTodo.filter((data)=>{
                return (new Date(data.date))
                .toLocaleDateString()
                .search(tomorrow.toLocaleDateString()) != -1;})
                .map((todo)=> {
                return <li class="list-group-item">
                  <div class="form-check fs-5">
                  <input class="form-check-input" type="checkbox" value="true" id="flexCheckDefault" onChange={()=>updateTodoDone(todo._id,todo.completed)} checked={todo.completed}/>
                    {/* <button type="button"  class="btn btn-outline-warning btn-sm mx-2" >{todo.category}</button>  */}
                    <input type="text" placeholder={todo.title} onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}/>
                    {/* <button type="button" class="btn btn-info btn-sm mx-2"> {todo.date}</button> */}
                    <button class="btn btn-small" onClick={()=>updateTodo(todo._id)}><i class="fa fa-edit"></i></button>
                    <button class="btn btn-small" onClick={()=>deleteTodo(todo._id)}><i class="fa fa-trash"></i></button>
                  </div> 
                </li>
              })}
            </ul>
        </div>
        <div class="col">
          <GetDay day={2}/>
          <ul class="list-group list-group-flush">
              {filteredTodo.filter((data)=>{
                return (new Date(data.date))
                .toLocaleDateString()
                .search(dayAfterTomorrow.toLocaleDateString()) != -1;}).map((todo)=> {
                return <li class="list-group-item">
                  <div class="form-check fs-5">
                  <input class="form-check-input" type="checkbox" value="true" id="flexCheckDefault" onChange={()=>updateTodoDone(todo._id,todo.completed)} checked={todo.completed}/>
                    {/* <button type="button"  class="btn btn-outline-warning btn-sm mx-2" >{todo.category}</button>  */}
                    <input type="text" placeholder={todo.title} onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}/>
                    {/* <button type="button" class="btn btn-info btn-sm mx-2"> {todo.date}</button> */}
                    <button class="btn btn-small" onClick={()=>updateTodo(todo._id)}><i class="fa fa-edit"></i></button>
                    <button class="btn btn-small" onClick={()=>deleteTodo(todo._id)}><i class="fa fa-trash"></i></button>
                  </div> 
                </li>
              })}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard