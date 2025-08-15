// // src/components/PrivateRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// function PrivateRoute({ children }) {
//   const token = localStorage.getItem("access_token");
//   console.log("Token found:", token);
//   // If no token, redirect to login
//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default PrivateRoute;

import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, accessToken, logout, refreshAccessToken } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (!isLoggedIn) return setAuthorized(false);

      try {
        // Attempt to verify token with backend
        await api.post("/verify-token/", { token: accessToken });
        setAuthorized(true);
      } catch (err) {
        // If token expired, try refresh
        if (err.response && err.response.status === 401) {
          const refreshed = await refreshAccessToken();
          setAuthorized(refreshed);
        } else {
          logout();
          setAuthorized(false);
        }
      }
    };

    verify();
  }, [accessToken, isLoggedIn, logout, refreshAccessToken]);

  if (authorized === null) return <div>Loading...</div>; // Optional: spinner
  return authorized ? children : <Navigate to="/login" replace />;
}

