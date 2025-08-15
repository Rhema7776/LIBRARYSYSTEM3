import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import BorrowBook from "./pages/BorrowBook";
import ReturnBook from "./pages/ReturnBook";
import History from "./pages/History";
import Manage from "./pages/ManageBorrowers";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Always visible */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrow"
            element={
              <ProtectedRoute>
                <BorrowBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/return"
            element={
              <ProtectedRoute>
                <ReturnBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage"
            element={
              <ProtectedRoute>
                <Manage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<div style={{ padding: "50px", textAlign: "center" }}>Page not found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


// src/App.js
// import { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
// import BookList from "./pages/BookList";
// import BorrowBook from "./pages/BorrowBook";
// import ReturnBook from "./pages/ReturnBook";
// import History from "./pages/History";
// import Logout from "./pages/Logout";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   useEffect(() => {
//     if (process.env.NODE_ENV === "development") {
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//       localStorage.removeItem("username");
//       localStorage.removeItem("is_staff");
//       console.log("Old tokens cleared (development mode)");
//     }
//   }, []);

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/books"
//           element={
//             <ProtectedRoute>
//               <BookList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/borrow"
//           element={
//             <ProtectedRoute>
//               <BorrowBook />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/return"
//           element={
//             <ProtectedRoute>
//               <ReturnBook />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/history"
//           element={
//             <ProtectedRoute>
//               <History />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="*" element={<div>Page not found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PrivateRoute from "./components/PrivateRoute";
// import History from "./pages/History";
// import Home from "./pages/Home";
// import Signup from "./pages/SignUp";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";
// import BookList from "./pages/BookList";
// import BorrowBook from "./pages/BorrowBook";
// import ReturnBook from "./pages/ReturnBook";
// import Navbar from "./components/Navbar";
// import StaffDashboard from "./pages/StaffDashboard";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/logout" element={<Logout />} />

//           <Route
//             path="/books"
//             element={
//               <ProtectedRoute>
//                 <BookList />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/borrow"
//             element={
//               <ProtectedRoute>
//                 <BorrowBook />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/staff-dashboard" element={<StaffDashboard />} />
//           <Route path="/return" element={<ReturnBook />} />
//           <Route path="/history" element={<History />} />
//           <Route path="*" element={<div>Page not found</div>} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
