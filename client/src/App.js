import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { LoginForm } from "./Components/LoginForm";
import { Customer } from "./Components/Customer";

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
    </Route>
  </Routes>;
}

export default App;
