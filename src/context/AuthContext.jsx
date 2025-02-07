import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (token) => {
    localStorage.setItem("auth_token", token);
    setIsAuthenticated(true);

    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Logged in successfully");
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      (async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          logout();
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
