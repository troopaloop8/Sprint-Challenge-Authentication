import React from 'react';
import SignUpForm from './components/SignUpForm';
import NavBar from './components/NavBar'
import { Route } from "react-router-dom";
import Login from './components/Login'
import JokesList from './components/JokesList';
import PrivateRoute from './components/PrivateRoutes'
import './App.css';

function App() {
  return (
    <div className="App">
       <NavBar />
       <Route exact path="/" component={Login} />
       <Route exact path="/register" component={SignUpForm} />
       {/* <PrivateRoute exact path="/jokes" component={JokesList} /> */}
       hello
    </div>
  );
}

export default App;
