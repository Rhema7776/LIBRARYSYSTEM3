// // src/pages/Login.js
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext); // use AuthContext

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/login/", { username, password });

//       // Use AuthContext login function
//       login({
//         accessToken: res.data.token,
//         username: username,
//         isStaff: res.data.is_staff || false,
//       });

//       navigate("/books"); // redirect after login
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: "400px",
//       margin: "80px auto",
//       padding: "30px",
//       border: "1px solid #ccc",
//       borderRadius: "10px",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//     }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #ccc"
//           }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #ccc"
//           }}
//         />

//         {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

//         <button type="submit" style={{
//           width: "100%",
//           padding: "12px",
//           background: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//           fontWeight: "bold"
//         }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios";

// // export default function Login() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const res = await api.post("/login/", { username, password });

// //       // Save token & staff status
// //       localStorage.setItem("access_token", res.data.token);
// //       localStorage.setItem("username", username);
// //       localStorage.setItem("is_staff", res.data.is_staff || false);

// //       navigate("/books");
// //     } catch (err) {
// //       setError("Invalid username or password");
// //     }
// //   };

// //   return (
// //     <div style={{
// //       maxWidth: "400px",
// //       margin: "80px auto",
// //       padding: "30px",
// //       border: "1px solid #ccc",
// //       borderRadius: "10px",
// //       boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
// //     }}>
// //       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
// //       <form onSubmit={handleLogin}>
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           required
// //           style={{
// //             width: "100%",
// //             padding: "10px",
// //             marginBottom: "15px",
// //             borderRadius: "5px",
// //             border: "1px solid #ccc"
// //           }}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //           style={{
// //             width: "100%",
// //             padding: "10px",
// //             marginBottom: "15px",
// //             borderRadius: "5px",
// //             border: "1px solid #ccc"
// //           }}
// //         />

// //         {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

// //         <button type="submit" style={{
// //           width: "100%",
// //           padding: "12px",
// //           background: "#4CAF50",
// //           color: "#fff",
// //           border: "none",
// //           borderRadius: "6px",
// //           cursor: "pointer",
// //           fontWeight: "bold"
// //         }}>
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/login/", { username, password });

//       // Save access token & staff status
//       login({
//         accessToken: res.data.access,   // ensure your backend returns access token
//         username: username,
//         isStaff: res.data.is_staff || false
//       });

//       localStorage.setItem("refresh_token", res.data.refresh); // save refresh token
//       navigate("/books");
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "80px auto", padding: "30px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }} />
//         {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
//         <button type="submit" style={{ width: "100%", padding: "12px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/login/", { username, password });

//       // Call context login
//       login({
//         accessToken: res.data.access,
//         username: username,
//         isStaff: res.data.is_staff || false,
//       });

//       // Optionally save refresh token for auto-refresh
//       if (res.data.refresh) {
//         localStorage.setItem("refresh_token", res.data.refresh);
//       }

//       navigate("/books"); // Redirect after login
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: "400px",
//       margin: "80px auto",
//       padding: "30px",
//       border: "1px solid #ccc",
//       borderRadius: "10px",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//     }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #ccc"
//           }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #ccc"
//           }}
//         />

//         {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

//         <button type="submit" style={{
//           width: "100%",
//           padding: "12px",
//           background: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//           fontWeight: "bold"
//         }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/login/", { username, password });

    // Save access & refresh tokens
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    localStorage.setItem("username", username);
    localStorage.setItem("is_staff", res.data.is_staff || false);

    login({
      accessToken: res.data.access,
      username,
      isStaff: res.data.is_staff || false,
    });

    navigate("/books");
  } catch (err) {
    setError("Invalid username or password");
  }
  };


  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", padding: "30px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }} />
        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: "12px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Login
        </button>
      </form>
    </div>
  );
}
