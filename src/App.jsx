import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signin from "./components/Signin";
import CommentsContainer from "./components/CommentsContainer";
import UserCommentsContainer from "./components/UserCommentsContainer";
import cookies from "js-cookie";
import PostMessage from "./components/PostMessage";

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
          <Signin />
        </Route>
        <Route path="/comments">
          <CommentsContainer />
        </Route>
        <Route path="/my-comments">
          <UserCommentsContainer user={user} />
        </Route>
        <Route path="/post-comment">
          <PostMessage user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
