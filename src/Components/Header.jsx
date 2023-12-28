import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import AuthUser from "../api/axios";
import Register from "./Register";
import ViewUser from "./Users/ViewUser";
import MyExpenses from "./Expenses/MyExpenses";

function Header() {
  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token != undefined) {
      logout();
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-expenses">
              My Expenses
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <span role="button" className="nav-link" onClick={logoutUser}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-info" element={<ViewUser />} />
          <Route path="/my-expenses" element={<MyExpenses />} />
        </Routes>
      </div>
    </>
  );
}

export default Header;
