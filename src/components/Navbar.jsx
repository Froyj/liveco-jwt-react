import React from "react";
import { NavLink } from "react-router-dom";
import DisconnectButton from "./DisconnectButton";

const Navbar = ({user, setUser}) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          {!user &&  <NavLink to="/login">Login</NavLink>}
        </li>
        <li>
        {!user &&  <NavLink to="/signin">Signin</NavLink>}
        </li>
        <li>{user && <DisconnectButton setUser={setUser}/>}</li>
      </ul>
      <ul>
        <li>
        {user && <NavLink to="/profile">My profile</NavLink>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
