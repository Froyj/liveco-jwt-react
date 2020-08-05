import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Signin from './components/Signin';
import CommentsContainer from './components/CommentsContainer';

function App() {
  return (
    <div className="App">
      <h1>Best Forum ever!</h1>
      <Navbar />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/comments'>
          <CommentsContainer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
