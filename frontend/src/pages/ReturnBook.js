import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ReturnBook() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  const handleReturn = async (id) => {
    try {
      await api.post(
        "/return/",
        { transaction_id: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      toast.success("Book returned successfully!");
    } catch (err) {
      toast.error("Failed to return book. Maybe already returned.");
    }
  };

  const slides = [
    "https://www.freepik.com/free-photo/young-student-learning-library_21138935.htm#fromView=keyword&page=1&position=1&uuid=38da8d4a-c950-43ce-ab89-3a6b78fa9925&query=African+Student+Library",
    "https://www.freepik.com/premium-ai-image/african-american-male-student-searching-through-books-library-shelf_369888784.htm#fromView=keyword&page=1&position=8&uuid=38da8d4a-c950-43ce-ab89-3a6b78fa9925&query=African+Student+Library",
    "https://www.freepik.com/free-photo/young-student-working-assignment_22377289.htm#fromView=keyword&page=1&position=0&uuid=38da8d4a-c950-43ce-ab89-3a6b78fa9925&query=African+Student+Library",
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
        <h1 style={{ marginBottom: "30px" }}>🔄 Return Books</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {transactions.map((t) => (
            <div
              key={t.id}
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
              <h3>{t.book.title}</h3>
              <p>{t.book.author}</p>
              <p>Borrowed: {t.borrow_date}</p>
              <p>Due: {t.due_date}</p>
              <button
                onClick={() => handleReturn(t.id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Return
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
