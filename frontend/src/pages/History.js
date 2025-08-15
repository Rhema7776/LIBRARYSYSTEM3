import { useEffect, useState } from "react";
import api from "../api/axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function History() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/transactions/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  const slides = [
    "https://images.unsplash.com/photo-1581091870620-0ec2d1d3513d?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1581091012184-6fda4f5a7bc8?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1596495577886-5d41c111e399?auto=format&fit=crop&w=1500&q=80",
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
        <h1 style={{ marginBottom: "30px" }}>📚 Borrowing History</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {transactions.length === 0 && <p>No transactions yet.</p>}
          {transactions.map((t) => (
            <div
              key={t.id}
              style={{
                background: "#fff",
                color: "#000",
                padding: "15px",
                borderRadius: "8px",
                width: "220px",
                textAlign: "center",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
              }}
            >
              <h3>{t.book.title}</h3>
              <p>{t.book.author}</p>
              <p>Borrowed: {t.borrow_date}</p>
              <p>Returned: {t.return_date || "Not yet"}</p>
              <p>Fine: ${t.fine}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
