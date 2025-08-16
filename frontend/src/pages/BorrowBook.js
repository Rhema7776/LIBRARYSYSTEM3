import { useEffect, useState } from "react";
import api from "../api/axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function BorrowBook() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [borrowed, setBorrowed] = useState([]); // store borrowed transactions

  const gradients = [
    "linear-gradient(to bottom, #001f3f, #004080)",
    "linear-gradient(to bottom, #ff7e5f, #feb47b)",
    "linear-gradient(to bottom, #43cea2, #185a9d)",
    "linear-gradient(to bottom, #ff6a00, #ee0979)",
    "linear-gradient(to bottom, #8360c3, #2ebf91)",
  ];

  // Fetch available books
  useEffect(() => {
    api.get("/books/")
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, []);

  // Fetch borrowed transactions
  useEffect(() => {
    api.get("/transactions/borrowed/")
      .then(res => setBorrowed(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      const res = await api.post(`/borrow/`, { book_id: bookId });
      setMessage("Book borrowed successfully!");

      // Update available books
      setBooks(prev =>
        prev.map(book => book.id === bookId ? { ...book, available_copies: book.available_copies - 1 } : book)
      );

      // Add to borrowed list
      setBorrowed(prev => [...prev, res.data]);

    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to borrow book.");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "20px",
        backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", zIndex: 0
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>Borrow Books</h2>
        {message && <p style={{ textAlign: "center", color: "yellow" }}>{message}</p>}

        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          emulateTouch
          centerMode
          centerSlidePercentage={30}
          dynamicHeight={false}
        >
          {books.map((book, idx) => (
            <div
              key={book.id}
              style={{
                background: gradients[idx % gradients.length],
                color: "#fff",
                padding: "15px",
                borderRadius: "8px",
                width: "200px",
                textAlign: "center",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "350px",
                justifyContent: "space-between",
              }}
            >
              <img
                src={book.cover || "https://static.vecteezy.com/system/resources/thumbnails/046/861/693/small/a-white-book-cover-mockup-free-png.png"}
                alt={book.title}
                style={{ width: "150px", height: "220px", objectFit: "cover", borderRadius: "5px" }}
              />
              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>Available: {book.available_copies}</p>
              </div>
              <button
                disabled={book.available_copies === 0}
                onClick={() => handleBorrow(book.id)}
                style={{
                  padding: "8px 12px",
                  background: book.available_copies === 0 ? "#aaa" : "#27ae60",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: book.available_copies === 0 ? "not-allowed" : "pointer",
                  marginTop: "10px",
                }}
              >
                Borrow
              </button>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
