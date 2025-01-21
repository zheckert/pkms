import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLoginSuccess, createUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const response = await axios.post("http://localhost:5000/auth/login", {
          email,
          password,
        });
        const { token, user } = response.data;
        onLoginSuccess(response.data.token, response.data.user);
        setMessage("Login successful!");
      } else if (mode === "create") {
        const response = await axios.post("http://localhost:5000/users", {
          user: { email, password, name },
        });
        onLoginSuccess(response.data.token, response.data.user);
        setMessage("Account created successfully!");
      }
    } catch (error) {
      console.error("Login failed!", error.response?.data || error.message);
      setMessage("Invalid credentials; please try again");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "create" : "login"));
    setMessage("");
  };

  return (
    <div>
      <h1>{mode === "login" ? "Login" : "Create Account"}</h1>
      <form onSubmit={handleLogin}>
        {mode === "create" && (
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}
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
        {/* todo: split button into its own component? */}
        <button type="submit" disabled={loading}>
          {loading
            ? "Loading..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={toggleMode}>
        {mode === "login" ? "Create New Account" : "Back to Login"}
      </button>
    </div>
  );
};

export default LoginForm;
