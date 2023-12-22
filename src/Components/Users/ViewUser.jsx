import React, { useState, useEffect } from "react";
import AuthUser from "../../api/axios";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const { http } = AuthUser();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    http.get("/user_info").then((res) => {
      console.log("user information", res.data[0]);
      setUsers(res.data[0]);
    });
  };

  const deleteUser = (id) =>{
    http.delete('/user_info/destroy/${id}').then((res)=>{
        console.log(res);
    });
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="card">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-default btn-sm">
                      <svg
                        class="feather feather-edit"
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={()=>deleteUser(user.id)}>
                        Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
