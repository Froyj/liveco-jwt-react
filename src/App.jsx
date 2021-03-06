import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signin from "./components/Signin";
import cookies from "js-cookie";
import Profile from "./components/Profile";

function App() {
  const registeredUser = parseInt(cookies.get("id"));
  const [user, setUser] = useState(registeredUser || null);

  return (
    <div className="App">
      <h1>Best Forum ever!</h1>
      <Navbar user={user} setUser={setUser} />
      <Switch>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/signin">
          <Signin setUser={setUser}/>
        </Route>
        <Route path="/profile">
          {user ? (
            <>
              <Profile user={user}/>
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
