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

// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isStaff, setIsStaff] = useState(false);

//   // Check token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     const staffStatus = localStorage.getItem("is_staff") === "true";
//     if (token) {
//       setIsLoggedIn(true);
//       setIsStaff(staffStatus);
//     }
//   }, []);

//   // Login function
//   const login = ({ accessToken, username, isStaff }) => {
//     localStorage.setItem("access_token", accessToken);
//     localStorage.setItem("username", username);
//     localStorage.setItem("is_staff", isStaff);
//     setIsLoggedIn(true);
//     setIsStaff(isStaff);
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("is_staff");
//     setIsLoggedIn(false);
//     setIsStaff(false);
//     window.location.href = "/login"; // force redirect
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, isStaff, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";
// import api from "../api/axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isStaff, setIsStaff] = useState(false);
//   const [accessToken, setAccessToken] = useState(null);

//   // Check token on page load
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     const staffStatus = localStorage.getItem("is_staff") === "true";
//     if (token) {
//       setAccessToken(token);
//       setIsLoggedIn(true);
//       setIsStaff(staffStatus);
//     }
//   }, []);

//   // Login function
//   const login = ({ accessToken, username, isStaff }) => {
//     localStorage.setItem("access_token", accessToken);
//     localStorage.setItem("username", username);
//     localStorage.setItem("is_staff", isStaff);
//     setAccessToken(accessToken);
//     setIsLoggedIn(true);
//     setIsStaff(isStaff);
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("is_staff");
//     setAccessToken(null);
//     setIsLoggedIn(false);
//     setIsStaff(false);
//   };

//   // Refresh token function
//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem("refresh_token");
//     if (!refreshToken) return false;

//     try {
//       const res = await api.post("/token/refresh/", { refresh: refreshToken });
//       localStorage.setItem("access_token", res.data.access);
//       setAccessToken(res.data.access);
//       return true;
//     } catch (err) {
//       logout();
//       return false;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, isStaff, accessToken, login, logout, refreshAccessToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isStaff, setIsStaff] = useState(false);
//   const [accessToken, setAccessToken] = useState(null);

//   // Check token and staff status on page load
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     const staffStatus = localStorage.getItem("is_staff") === "true"; // convert to boolean
//     if (token) {
//       setAccessToken(token);
//       setIsLoggedIn(true);
//       setIsStaff(staffStatus);
//     }
//   }, []);

//   // Login function
//   // const login = (token, staffStatus = false) => {
//   //   localStorage.setItem("access_token", token);
//   //   localStorage.setItem("is_staff", staffStatus);
//   //   setAccessToken(token);
//   //   setIsLoggedIn(true);
//   //   setIsStaff(staffStatus);
//   // };
//   const login = ({ accessToken, username, isStaff }) => {
//     localStorage.setItem("access_token", accessToken);
//     localStorage.setItem("username", username);
//     localStorage.setItem("is_staff", isStaff);
//     setIsLoggedIn(true);
//   };


//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("is_staff");
//     setAccessToken(null);
//     setIsLoggedIn(false);
//     setIsStaff(false);
//     window.location.href = "/login"; // redirect after logout
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         isStaff,
//         accessToken,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from "react";
// import api from "../api/axios";
// import {jwtDecode} from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [accessToken, setAccessToken] = useState(null);

//   // Check token on page load
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       setAccessToken(token);
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const login = (token, refreshToken) => {
//     localStorage.setItem("access_token", token);
//     localStorage.setItem("refresh_token", refreshToken);
//     setAccessToken(token);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     setAccessToken(null);
//     setIsLoggedIn(false);
//     window.location.href = "/login";
//   };

//   const isTokenExpired = (token) => {
//     if (!token) return true;
//     try {
//       const decoded = jwtDecode(token);
//       return Date.now() >= decoded.exp * 1000;
//     } catch {
//       return true;
//     }
//   };

//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem("refresh_token");
//     if (!refreshToken) return false;
//     try {
//       const res = await api.post("/token/refresh/", { refresh: refreshToken });
//       localStorage.setItem("access_token", res.data.access);
//       setAccessToken(res.data.access);
//       return true;
//     } catch {
//       logout();
//       return false;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         login,
//         logout,
//         accessToken,
//         isTokenExpired,
//         refreshAccessToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isStaff, setIsStaff] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     const staffFlag = localStorage.getItem("is_staff") === "true";
//     setIsLoggedIn(!!token);
//     setIsStaff(staffFlag);
//   }, []);

//   const login = (token, staff = false) => {
//     localStorage.setItem("access_token", token);
//     localStorage.setItem("is_staff", staff);
//     setIsLoggedIn(true);
//     setIsStaff(staff);
//   };

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("is_staff");
//     setIsLoggedIn(false);
//     setIsStaff(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, isStaff, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
