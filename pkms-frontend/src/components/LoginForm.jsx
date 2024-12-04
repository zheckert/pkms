import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("todo: remove login credz baby", email, password);
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log("todo: REMOVE THIS! SEVER RESPONSE", response.data);
      setLoggedInUser(response.data);
      console.log("todo: remove login USER", email, password);
      //todo: provide Message to user: login successful?
    } catch (error) {
      console.error("Login failed!", error.response.data);
      alert("Invalid credentials; please try again");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;