import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signin">Signin</NavLink></li>
      </ul>
      <ul>
        <li><NavLink to="/comments">All Comments</NavLink></li>
        <li>My posts</li>
      </ul>
    </nav>
  );
}

export default Navbar;