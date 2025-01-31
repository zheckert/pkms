import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const PUBLIC_ROUTES = ["/auth/login", "/users"];

api.interceptors.request.use((config) => {
  // Skip token check for public routes
  if (PUBLIC_ROUTES.some((route) => config.url?.includes(route))) {
    return config;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    config.headers = {};
    window.location.href = "/";
    throw new Error("No token found");
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    api.defaults.headers.common = {};
  }
};

export default api;
