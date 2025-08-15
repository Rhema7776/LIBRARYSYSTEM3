import { useEffect, useState } from "react";
import api from "../api/axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function LibraryDashboard() {
  const [borrowed, setBorrowed] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Array of cover images for variety
  const bookImages = [
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    "https://images.unsplash.com/photo-1526318472351-3a33c5cbd0de",
  ];

  const gradients = [
    "linear-gradient(to bottom, #001f3f, #004080)",
    "linear-gradient(to bottom, #ff7e5f, #feb47b)",
    "linear-gradient(to bottom, #43cea2, #185a9d)",
    "linear-gradient(to bottom, #ff6a00, #ee0979)",
    "linear-gradient(to bottom, #8360c3, #2ebf91)",
  ];

  // Fetch borrowed books
  useEffect(() => {
    api.get("/transactions/borrowed/")
      .then(res => setBorrowed(res.data))
      .catch(err => console.log(err));

    api.get("/transactions/")
      .then(res => setHistory(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle return
  const handleReturn = async (transaction) => {
    if (transaction.fine > 0) {
      setSelectedTransaction(transaction);
      setModalVisible(true);
      return;
    }
    await returnBook(transaction.id);
  };

  const returnBook = async (transactionId) => {
    try {
      const res = await api.post(`/return/`, { transaction_id: transactionId });
      setMessage(res.data.message || "Book returned successfully!");
      setBorrowed(prev => prev.filter(t => t.id !== transactionId));
      setModalVisible(false);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Failed to return book.");
      setModalVisible(false);
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
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)", zIndex: 0,
      }}></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>My Borrowed Books</h2>
        {message && <p style={{ textAlign: "center", color: "yellow" }}>{message}</p>}

        {/* Borrowed Books Carousel */}
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          emulateTouch
          centerMode
          centerSlidePercentage={30}
        >
          {borrowed.map((item, idx) => {
            const book = item.book;
            if (!book) return null;
            const imgUrl = book.cover || bookImages[idx % bookImages.length];

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
                minHeight: "350px",
                justifyContent: "space-between",
              }}>
                <img
                  src={imgUrl}
                  alt={book.title}
                  style={{ width: "150px", height: "220px", objectFit: "cover", borderRadius: "5px" }}
                />
                <div>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <p>Due: {item.due_date}</p>
                  <p>Fine: {item.fine || 0}</p>
                  {item.fine > 0 && (
                    <p style={{ color: "yellow", fontWeight: "bold" }}>
                      Pay NGN {item.fine} to account: xxxxx-xxx--xx. Show receipt on return.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleReturn(item)}
                  style={{
                    padding: "8px 12px",
                    background: "#27ae60",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Return
                </button>
              </div>
            );
          })}
        </Carousel>

        {/* Transaction History Carousel */}
        <h2 style={{ textAlign: "center", margin: "40px 0 20px", color: "#fff" }}>Transaction History</h2>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          emulateTouch
          centerMode
          centerSlidePercentage={25}
        >
          {history.map((item, idx) => {
            const book = item.book;
            if (!book) return null;
            const imgUrl = book.cover || bookImages[(idx + 2) % bookImages.length]; // different image

            return (
              <div key={item.id} style={{
                background: gradients[idx % gradients.length],
                color: "#fff",
                padding: "15px",
                borderRadius: "8px",
                width: "180px",
                textAlign: "center",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "300px",
                justifyContent: "space-between",
              }}>
                <img
                  src={imgUrl}
                  alt={book.title}
                  style={{ width: "140px", height: "200px", objectFit: "cover", borderRadius: "5px" }}
                />
                <div>
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  <p>Borrowed: {item.borrow_date}</p>
                  <p>Returned: {item.return_date || "Not yet"}</p>
                  <p>Fine: {item.fine || 0}</p>
                </div>
              </div>
            );
          })}
        </Carousel>

        {/* Modal for fine acknowledgment */}
        {modalVisible && selectedTransaction && (
          <div style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}>
            <div style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "8px",
              width: "400px",
              textAlign: "center",
            }}>
              <h3 style={{ marginBottom: "15px" }}>Fine Payment Notice</h3>
              <p style={{ marginBottom: "20px" }}>
                Fine: NGN {selectedTransaction.fine}. Pay to bank account xxxxx-xxx--xx and present receipt.
                Otherwise, it will be deducted from your fees.
              </p>
              <button
                onClick={() => returnBook(selectedTransaction.id)}
                style={{
                  padding: "8px 12px",
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Acknowledge & Return
              </button>
              <button
                onClick={() => setModalVisible(false)}
                style={{
                  padding: "8px 12px",
                  background: "#aaa",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
