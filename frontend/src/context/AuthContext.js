import React, { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") || "");

  const login = ({ accessToken, username, isStaff }) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("username", username);
    localStorage.setItem("is_staff", isStaff);
    setAccessToken(accessToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_staff");
    setAccessToken("");
    setIsLoggedIn(false);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      logout();
      return false;
    }

    try {
      const res = await api.post("/token/refresh/", { refresh: refreshToken });
      localStorage.setItem("access_token", res.data.access);
      setAccessToken(res.data.access);
      return true;
    } catch (err) {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, accessToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
