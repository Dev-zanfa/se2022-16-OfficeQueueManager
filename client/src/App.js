import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import API from "./API";

import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { LoginForm } from "./Components/LoginForm";
import { Customer } from "./Components/Customer";
import { Counter } from "./Components/Counter";

function App() {
  return <Router>
    <Main/>
  </Router>;
}

function Main(){

  const [loggedIn, setLoggedIn] = useState(false);
  //const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [service, setService] = useState(null);
  const [nextTicket, setNextTicket] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user=await API.getUserInfo(); // we have the user info here
      if(user!==undefined)
      {
        setUser(user);
        setLoggedIn(true);
      }
    
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      //setMessage('')
      const user = await API.logIn(credentials);
     setUser(user);
     setLoggedIn(true);
    //setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
    }catch(err) {
      console.log(err);
      throw err;
    }
  };

  const handleNextCustomer = async () => {
    try {
      const result = await API.nextCustomer();
     setService(result.service);
     setNextTicket(result.ticket);
    }catch(err) {
      console.log(err);
      throw err;
    }
  };

  return (

  <Routes>   
    <Route path="/">  </Route>
      <Route path="login" element={<LoginForm login={handleLogin} />}/> 
      <Route path="customer" element={<Customer/>}/> 
      <Route path="counter" element={<Counter nextCustomer={handleNextCustomer} ticketNo={nextTicket} service={service}/>}/> 
  
  </Routes>

  );
}

export default App;
