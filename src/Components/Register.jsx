import React, { useState } from "react";
import AuthUser from "../api/axios";

const Register = () => {
  const {http} = AuthUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   await http.post('/register',{name:name, email:email, password:password}).then((res) => {
     console.log(res);
    });
  }
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
                <button className="btn btn-secondary btn-sm float-end">
                  View Users
                </button>
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
