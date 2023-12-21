import { Routes, Route, Link } from "react-router-dom";
import Login from "../Login";

function Guest() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Login
            </Link>
          </li>
          
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
        
        </Routes>
      </div>
    </>
  );
}

export default Guest;
