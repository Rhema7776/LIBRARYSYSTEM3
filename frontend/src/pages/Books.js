import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Books() {
  const { logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books/");
      setBooks(res.data);
    } catch (err) {
      // If token expired or unauthorized
      if (err.response?.status === 401) {
        setError("Unauthorized or token expired. Logging out...");
        logout();
      } else {
        setError("Failed to load books");
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Books 📚</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author} (ISBN: {book.isbn}) - Available Copies: {book.available_copies}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
