import { useEffect, useState } from "react";
import { showSessionExpirePopup } from "../utils/swalUtils";

const UseAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      // Simulate an asynchronous operation (e.g., fetching user data)
      setTimeout(() => {
        setAuthenticated(true);
        setLoading(false);
      }, 400); // Adjust the delay as needed
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    // Display SweetAlert popup before logging out
    showSessionExpirePopup().then(() => {
      // Perform logout actions, e.g., clear token from localStorage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setAuthenticated(false);
      window.location.href = "/";
    });
  };

  return { authenticated, loading, logout };
};

export default UseAuth;
