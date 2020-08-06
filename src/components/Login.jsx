import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", {
        email,
        password,
      })
      .then((res) => res.data)
      .then((res) => res.userId)
      // On met à jour le state/context de notre appli de manière à avoir les infos de notre utilisateur à portée
      .then(setUser)
      // dès lors qu'on a récupéré l'id de notre utilisateur on redirige vers sa page de profil
      .then(() => history.push("/profile"));
  };

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
