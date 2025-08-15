import { useState, useEffect } from "react";
import api from "../api/axios";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/books/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(res.data);
      } catch (err) {
        setError("Failed to fetch books");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Available Books</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
        {books.map(book => (
          <div key={book.id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Available:</strong> {book.available_copies}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
