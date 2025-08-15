// import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axios";
// import { isTokenExpired } from "../utils/token";
// import { jwtDecode } from "jwt-decode";

// export default function ProtectedRoute({ children }) {
//   const { isLoggedIn, accessToken, isTokenExpired, refreshAccessToken } = useContext(AuthContext);
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     const verify = async () => {
//       if (!isLoggedIn) return setAuthorized(false);

//       if (isTokenExpired(accessToken)) {
//         // Try refresh
//         const refreshed = await refreshAccessToken();
//         setAuthorized(refreshed);
//       } else {
//         setAuthorized(true);
//       }
//     };
//     verify();
//   }, [accessToken, isLoggedIn, refreshAccessToken]);

//   if (authorized === null) return <div>Loading...</div>;
//   return authorized ? children : <Navigate to="/login" replace />;
// }


// // src/components/ProtectedRoute.js
// import { Navigate } from "react-router-dom";
// import { isTokenExpired } from "../helpers/token";
// import { jwtDecode } from "jwt-decode";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("access_token");

//   if (!token || isTokenExpired(token)) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// // src/components/ProtectedRoute.js
// import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const {
//     isLoggedIn,
//     accessToken,
//     isTokenExpired,
//     refreshAccessToken,
//   } = useContext(AuthContext);
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     const verify = async () => {
//       if (!isLoggedIn) return setAuthorized(false);

//       if (isTokenExpired(accessToken)) {
//         const refreshed = await refreshAccessToken();
//         setAuthorized(refreshed);
//       } else {
//         setAuthorized(true);
//       }
//     };
//     verify();
//   }, [accessToken, isLoggedIn, refreshAccessToken]);

//   if (authorized === null) return <div>Loading...</div>;

//   return authorized ? children : <Navigate to="/login" replace />;
// }

// import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { isLoggedIn, accessToken, refreshAccessToken } = useContext(AuthContext);
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     const verify = async () => {
//       if (!isLoggedIn) return setAuthorized(false);

//       // Token expiration logic can be handled via backend; try refresh
//       const refreshed = await refreshAccessToken();
//       setAuthorized(refreshed);
//     };
//     verify();
//   }, [accessToken, isLoggedIn, refreshAccessToken]);

//   if (authorized === null) return <div>Loading...</div>;
//   return authorized ? children : <Navigate to="/login" replace />;
// }

// import { useContext, useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { isLoggedIn } = useContext(AuthContext);
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     // Simply check login state
//     setAuthorized(isLoggedIn);
//   }, [isLoggedIn]);

//   if (authorized === null) return <div>Loading...</div>;
//   return authorized ? children : <Navigate to="/login" replace />;
// }

// import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axios";

// export default function ProtectedRoute({ children }) {
//   const { isLoggedIn, accessToken, refreshAccessToken } = useContext(AuthContext);
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     const verify = async () => {
//       if (!isLoggedIn) return setAuthorized(false);

//       try {
//         // Decode token expiration client-side (no verify-token call)
//         const token = accessToken;
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         const exp = payload.exp * 1000; // convert to ms
//         const now = Date.now();

//         if (now > exp) {
//           // token expired → try refresh
//           const refreshed = await refreshAccessToken();
//           setAuthorized(refreshed);
//         } else {
//           setAuthorized(true);
//         }
//       } catch (err) {
//         console.error("Error verifying token:", err);
//         setAuthorized(false);
//       }
//     };

//     verify();
//   }, [accessToken, isLoggedIn, refreshAccessToken]);

//   if (authorized === null) return <div>Loading...</div>;
//   return authorized ? children : <Navigate to="/login" replace />;
// }

// src/components/ProtectedRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // Otherwise, render the protected content
  return children;
}

