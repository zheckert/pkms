import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // todo: use correct endpoint (auth/login)
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data.token;

      onLoginSuccess(token, user);

      //todo: provide Message to user: login successful
      //todo: provide feedback to the user when their token is invalid or expired.
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
