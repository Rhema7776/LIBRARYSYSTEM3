import { useEffect, useState } from "react";
import api from "../api/axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ReturnBook() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const gradients = [
    "linear-gradient(to bottom, #001f3f, #004080)",
    "linear-gradient(to bottom, #ff7e5f, #feb47b)",
    "linear-gradient(to bottom, #43cea2, #185a9d)",
    "linear-gradient(to bottom, #ff6a00, #ee0979)",
    "linear-gradient(to bottom, #8360c3, #2ebf91)",
  ];

  // Fetch borrowed transactions
  useEffect(() => {
    api.get("/transactions/borrowed/")
      .then(res => setTransactions(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle returning a book
  const handleReturn = async (transactionId) => {
    try {
      const res = await api.post(`/return/`, { transaction_id: transactionId });
      setMessage(res.data.message + (res.data.fine ? ` | Fine: ${res.data.fine}` : ""));
      // Refresh transactions after return
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to return book.");
    }
  };

  // Handle paying a fine
  const handlePayFine = async (transactionId) => {
    try {
      const res = await api.post("/pay-fine/", { transaction_id: transactionId });
      setMessage(res.data.message);
      // Update the transaction fine to 0 locally
      setTransactions(prev =>
        prev.map(t => t.id === transactionId ? { ...t, fine: 0 } : t)
      );
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to pay fine.");
    }
  };

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      padding: "20px",
      backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {/* Dark overlay */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)", zIndex: 0
      }}></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>Return Books</h2>
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
          {transactions.map((item, idx) => {
            const book = item.book;
            if (!book) return null;

            return (
              <div key={item.id} style={{
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
                minHeight: "380px",
                justifyContent: "space-between",
              }}>
                <img
                  src={book.cover || "https://static.vecteezy.com/system/resources/thumbnails/046/861/693/small/a-white-book-cover-mockup-free-png.png"}
                  alt={book.title}
                  style={{ width: "150px", height: "220px", objectFit: "cover", borderRadius: "5px" }}
                />
                <div>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <p>Due: {item.due_date}</p>
                  {item.fine > 0 && <p style={{ color: "#ff6666" }}>Fine: {item.fine}</p>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button onClick={() => handleReturn(item.id)} style={{
                    padding: "8px 12px", background: "#27ae60",
                    color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer"
                  }}>
                    Return
                  </button>

                  {item.fine > 0 &&
                    <button onClick={() => handlePayFine(item.id)} style={{
                      padding: "8px 12px", background: "#e67e22",
                      color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer"
                    }}>
                      Pay Fine
                    </button>
                  }
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
