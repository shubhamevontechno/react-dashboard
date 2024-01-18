import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import AuthUser from "../api/axios";
import Register from "./Register";
import ViewUser from "./Users/ViewUser";
import MyExpenses from "./Expenses/MyExpenses";
import BankAccount from "./Master/BankAccount";
import BankAccountInfo from "./Master/BankAccountInfo";
import Categories from "./Master/Category/Categories";

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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Master
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/categories">
                    Category
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/bank-account">
                    Accounts
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    A third link
                  </a>
                </li>
              </ul>
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
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-info" element={<ViewUser />} />
          <Route path="/my-expenses" element={<MyExpenses />} />
          <Route path="/bank-account" element={<BankAccount/>}/>
          <Route path="/bank-account-info" element={<BankAccountInfo/>}/>
          <Route path="/categories" element={<Categories />}/>
        </Routes>
      </div>
    </>
  );
}

export default Header;
