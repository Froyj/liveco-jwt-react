import React, { useState } from "react";
import axios from 'axios';
const Login = ({setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', {
      email,
      password
    })
    .then(res => res.data)
    .then(res => {
      setUser(res.id);
    })
    
  }

  return (
    <>
      <h2>Login</h2>
      <form name="login" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
