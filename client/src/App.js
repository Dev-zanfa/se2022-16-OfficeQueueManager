import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { LoginForm } from "./Components/LoginForm";
import { Customer } from "./Components/Customer";
import { Counter } from "./Components/Counter";

function App() {
  return <Router>
    <Main/>
  </Router>;
}

function Main(){

  return <Routes>   
    <Route path="/">
      <Route path=""/>  
      <Route path="login" element={<LoginForm/>}/> 
      <Route path="customer" element={<Customer/>}/> 
      <Route path="counter" element={<Counter/>}/> 
    </Route>
  </Routes>;
}

export default App;
