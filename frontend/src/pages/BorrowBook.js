import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function BorrowBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async (id) => {
    try {
      await api.post(
        "/borrow/",
        { book_id: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      toast.success("Book borrowed successfully!");
    } catch (err) {
      toast.error("Failed to borrow book. Maybe it's already borrowed or you lack permission.");
    }
  };

  const slides = [
    "https://thumbs.dreamstime.com/b/african-college-students-cheerful-using-laptop-together-56055175.jpg?w=768",
    "https://thumbs.dreamstime.com/b/eacher-children-looking-bird-s-nest-6081771.jpg?w=768",
    "https://thumbs.dreamstime.com/b/diversity-people-reading-book-inspiration-concept-64705552.jpg?w=1400",
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
        dynamicHeight={false}
      >
        {slides.map((img, idx) => (
          <div key={idx}>
            <img src={img} alt={`slide-${idx}`} style={{ objectFit: "cover", height: "100vh" }} />
          </div>
        ))}
      </Carousel>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          minHeight: "100vh",
          background: "rgba(0,0,0,0.5)",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>📖 Borrow Books</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                background: "#fff",
                color: "#000",
                padding: "15px",
                borderRadius: "8px",
                width: "200px",
                textAlign: "center",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
              }}
            >
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Available: {book.available_copies}</p>
              <button
                onClick={() => handleBorrow(book.id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Borrow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
