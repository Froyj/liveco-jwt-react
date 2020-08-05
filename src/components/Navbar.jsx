import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signin">Signin</Link></li>
      </ul>
      <ul>
        <li>Profile</li>
        <li>My posts</li>
        <li></li>
      </ul>
    </>
  );
}

export default Navbar;