import React from "react";
import { NavLink } from "react-router-dom";
import DisconnectButton from "./DisconnectButton";

const Navbar = ({user, setUser}) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Signin</NavLink>
        </li>
        <li>{user && <DisconnectButton setUser={setUser}/>}</li>
      </ul>
      <ul>
        <li>
          <NavLink to="/comments">All Comments</NavLink>
        </li>
        <li>
          <NavLink to="/my-comments">My Comments</NavLink>
        </li>
        <li>
          <NavLink to="/post-comment">Post Comment</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
