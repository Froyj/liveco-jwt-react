import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Signin = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/signin", { name, email, password })
      .then(res => res.data)
      .then(res => {
        axios
          .post("/api/login", {
            email,
            password,
          })
          .then((res) => res.data)
          .then((res) => res.userId)
          // On met à jour le state/context de notre appli de manière à avoir les infos de notre utilisateur à portée
          .then(setUser)
          //dès lors qu'on a récupéré l'id de notre utilisateur on redirige vers sa page de profil
          .then(() => history.push("/profile"));
      });
  };

  return (
    <>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
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
        <button type="submit">Signin</button>
      </form>
    </>
  );
};

export default Signin;
