import './App.css';
import HomePage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  const [user, setLoginUser] = useState({});

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  const updateUser = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user))
    setLoginUser(user)
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {
              user && user._id
                ?
                <HomePage updateUser={updateUser} />
                :
                <Login updateUser={updateUser} />
            }
          </Route>
          <Route path="/login">
            <Login updateUser={updateUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
