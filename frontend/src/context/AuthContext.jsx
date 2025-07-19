import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setCurrentUser(decodedUser);
      } catch (error) {
        console.error("Invalid or expired token:", error.message);
        localStorage.removeItem("token");
        setCurrentUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
