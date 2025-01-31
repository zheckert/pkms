import { useState, useEffect } from "react";
import api from "../api";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!authToken) return;
    api
      .get("/auth/profile")
      .then((response) => setUserName(response.data.name))
      .catch(handleLogout);
  }, [authToken]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        handleLogout();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUserName("");
    api.defaults.headers.common = {};
    window.location.reload();
  };

  const handleLogin = (token, user) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setUserName(user.name);
  };

  return { authToken, userName, handleLogin, handleLogout };
};
