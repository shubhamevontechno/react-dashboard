import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "./../Context/AuthProvider";
// import axiosAPI from "../api/axios";
import { useNavigate } from "react-router-dom";
import AuthUser from "../api/axios";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const { http, setToken } = AuthUser();
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username", password);
    try {
      const response = await http
        .post("/login", { email: username, password: password })
        .then((res) => {
          setToken(res.data.access_token, res.data.user);
        });

      console.log("hello", response);
      // console.log(JSON.stringify(response?.data));
      // const accessToken = response.data?.token;
      // setAuth({ username, password, accessToken });

      // store token in localstorage--
      // if (accessToken) {
      //   localStorage.setItem('token', accessToken);
      //   setauthenticated(true);
      //   navigate("/dashboard");
      //   return;
      // }

      // setUsername("");
      // setPassword("");
      // setSuccess(true);
    } catch (err) {
      console.log("error", err);
      if (!err?.response) {
        setErrorMsg("no server reponse");
      } else if (err.response?.status == 400) {
        setErrorMsg("Missing username and password");
      } else if (err.response?.status == 401) {
        setErrorMsg("Unauthorized user");
      } else {
        setErrorMsg("Login failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      <div className="container mt-3">
        <h2>Login Form</h2>
        <p
          ref={errRef}
          className={errorMsg ? "errorMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              ref={userRef}
              placeholder="Enter email"
              name="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
