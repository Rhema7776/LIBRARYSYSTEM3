import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout, isStaff } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#2c3e50", color: "#fff" }}>
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", marginRight: "15px" }}>
          Rhema's Library
        </Link>
      </div>
      <div>
        {!isLoggedIn && (
          <>
            <Link to="/signup" style={{ color: "#fff", marginRight: "15px" }}>Sign Up</Link>
            <Link to="/login" style={{ color: "#fff" }}>Login</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/books" style={{ color: "#fff", marginRight: "15px" }}>Books</Link>
            <Link to="/borrow" style={{ color: "#fff", marginRight: "15px" }}>Borrow</Link>
            <Link to="/return" style={{ color: "#fff", marginRight: "15px" }}>Return</Link>
            <Link to="/history" style={{ color: "#fff", marginRight: "15px" }}>History</Link>

            {isStaff && (
              <Link to="/manage" style={{ color: "#fff", marginRight: "15px" }}>Manage Borrowers</Link>
            )}

            <button onClick={logout} style={{ background: "#e74c3c", border: "none", color: "#fff", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
