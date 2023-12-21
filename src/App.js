// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Guest from "./Components/Navbar/Guest";
import AuthUser from "./api/axios";

function App() {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <Guest />;
  }
  return <Header />;
}

export default App;
