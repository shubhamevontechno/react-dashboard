import { useEffect, useState } from "react";

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

  return { authenticated, loading };
};

export default UseAuth;
