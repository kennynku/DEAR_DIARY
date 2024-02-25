"use client"
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState([]);

  const login = async (newAccessToken, newUserId) => {
    setAccessToken(newAccessToken);
    setUserId(newUserId);
    console.log("token: ", accessToken);
    console.log("user ID: ", userId);

  };

  const logout = () => {
    setAccessToken(null);
    setUserId(null);
  };

  const values = {
    accessToken,
    userId,
    login,
    logout,
    blogs,
    setBlogs
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
