import React from "react";
import AuthUser from "../api/axios";
const Dashboard = () => {
  const { user } = AuthUser();
  return (
    <div>
      <div className="container mt-5">
        <div className="card">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
