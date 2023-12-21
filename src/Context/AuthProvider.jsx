import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

// Create an empty object for the initial state of the AuthContext
const AuthContext = createContext({});

// Export the AuthProvider component that accepts any child components
// and provides access to the AuthContext via its value prop
export const AuthProvider = ({ children }) => {
  // Use `useState` to manage the authentication state
  const [auth, setAuth] = useState({}); // initially no user logged in

  const logout = () => {
    // Clear authentication data
    setAuth({});
    // Clear token from local storage
    localStorage.removeItem("token");
  }
  // Wrap the children components with the AuthContext Provider
  return (
   
    <AuthContext.Provider value={{auth, setAuth, logout}}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;