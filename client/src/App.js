import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import API from "./API";

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

  const handleLogin = async (credentials) => {
    try {
      //setMessage('')
      const user = await API.logIn(credentials);
    //  setUser(user);
    // setLoggedIn(true);
    //setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
    }catch(err) {
      console.log(err);
      throw err;
    }
  };

  return <Routes>   
    <Route path="/">
      <Route path=""/>  
      <Route path="login" element={<LoginForm login={handleLogin} />}/> 
      <Route path="customer" element={<Customer/>}/> 
      <Route path="counter" element={<Counter/>}/> 
    </Route>
  </Routes>;
}

export default App;
