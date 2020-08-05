import React, { useState } from "react";
import axios from "axios";
const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/signin", {
        name,
        email,
        password,
      })
      .then((res) => res.data)
      .then(() => setMessage("You got registered !"))
      .catch(err => {
        if(err.message === "Request failed with status code 409")
        setMessage("User already registered with this email")
      })
  };

  return (
    <>
      <h2>Signin</h2>
      {message && <p className="alert">{message}</p>}
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
