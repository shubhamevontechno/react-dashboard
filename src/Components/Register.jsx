import React, { useState } from "react";
import AuthUser from "../api/axios";
import { Link } from "react-router-dom";
import { showSuccessMessage } from "../utils/swalUtils";
import SubmitButton from "../utils/SubmitButton";

const Register = () => {
  const { http } = AuthUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await http
      .post("/register", { name:name, email:email, password:password });
        setTimeout(() => {
          setLoading(false);
          showSuccessMessage(res.data.message);
          setName('');
          setEmail('');
          setPassword('');
        }, 2000);      
    } catch (error) {
      console.error("catch error", error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="card">
            <div className="mt-4 mb-4">
              <div className="mt-1 mb-1">
                <h4 className="text-justify text-md-left text-nowrap float-start">
                  User Registration
                </h4>
                <Link to="/user-info">
                  <button className="btn btn-secondary btn-sm float-end">
                    View Users
                  </button>
                </Link>
              </div>
              <br />
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <SubmitButton loading={loading} onClick={handleSubmit}>
                  Submit
                </SubmitButton>
                {/* <button type="submit" className="btn btn-primary">
                  Submit
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
