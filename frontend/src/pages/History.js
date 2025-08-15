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
    "https://thumbs.dreamstime.com/b/african-students-library-29022118.jpg?w=768",
    "https://thumbs.dreamstime.com/b/diversity-people-reading-book-inspiration-concept-64705552.jpg?w=1400",
    "https://img.freepik.com/free-vector/school-library-scene-with-happy-children_1308-79813.jpg?t=st=1755262559~exp=1755266159~hmac=b5591cda87973bf976df15f582d9958eb6ab2b97d9d94305c3d6f79bb34f8b5b&w=1060",
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
