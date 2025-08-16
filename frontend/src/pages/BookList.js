import { useEffect, useState } from "react";
import api from "../api/axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function BookList() {
  const [books, setBooks] = useState([]);

  const gradients = [
    "linear-gradient(to bottom, #001f3f, #004080)",
    "linear-gradient(to bottom, #ff7e5f, #feb47b)",
    "linear-gradient(to bottom, #43cea2, #185a9d)",
    "linear-gradient(to bottom, #ff6a00, #ee0979)",
    "linear-gradient(to bottom, #8360c3, #2ebf91)",
  ];

  const images = [
    "https://i.etsystatic.com/51832690/r/il/acb8ee/6767648590/il_600x600.6767648590_nuu6.jpg",
    "https://i.pinimg.com/1200x/ea/bf/19/eabf19a502fe6865e84ae9b5362fd818.jpg",
    "https://thumbs.dreamstime.com/b/diverse-group-people-working-together-concept-85116773.jpg?w=768",
    "https://www.dreamstime.com/stock-photos-teacher-children-looking-bird-s-nest-image6081763",
    "linear-gradient(to bottom, #8360c3, #2ebf91)",
  ];

  useEffect(() => {
    api.get("/books/")
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "20px",
        backgroundImage: "url('https://thumbs.dreamstime.com/b/diversity-people-reading-book-inspiration-concept-64705552.jpg?w=1400')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>All Books</h2>

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
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <img
                
                src={book.cover && book.cover.length > 0 ? book.cover : "https://static.vecteezy.com/system/resources/thumbnails/046/861/693/small/a-white-book-cover-mockup-free-png.png"}
                alt={book.title}
                style={{ width: "150px", height: "220px", objectFit: "cover", borderRadius: "5px" }} 
              />
              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Available: {book.available_copies}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
