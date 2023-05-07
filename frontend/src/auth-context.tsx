import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchUser, logoutUser } from "./state/users/UserSlice";
import { store } from "./state/store";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  useEffect(() => {
    fetchUserData();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("/api/v1/user/login", {
        username,
        password,
      });
      const token = response.data.accessToken;
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login:", error);
    }
    store.dispatch(fetchUser());
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    store.dispatch(logoutUser());
    setIsLoggedIn(false);
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      await axios.get("/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      store.dispatch(fetchUser());
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during fetching user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
