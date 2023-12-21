import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
  const navigate = useNavigate();

  // Function to get token
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  // Function to get user details
  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const user_details = JSON.parse(userString);
    return user_details;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  // Function to save the token in session storage
  const saveToken = (token, user) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
     navigate('/dashboard')
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  }

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-type": "application/json",
    },
  });
  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    http,
    logout
  };
}
