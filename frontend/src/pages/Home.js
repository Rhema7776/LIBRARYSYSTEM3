import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  const slides = [
    {
      image: "https://img.freepik.com/free-vector/school-library-scene-with-happy-children_1308-79813.jpg?t=st=1755262559~exp=1755266159~hmac=b5591cda87973bf976df15f582d9958eb6ab2b97d9d94305c3d6f79bb34f8b5b&w=1060",
      subtitle: "Explore, Learn, and Grow",
    },
    {
      image: "https://thumbs.dreamstime.com/b/group-students-library-29017864.jpg?w=768",
      subtitle: "Books for Every Mind",
    },
    {
      image: "https://thumbs.dreamstime.com/b/african-students-library-29022118.jpg?w=768",
      subtitle: "Read, Borrow, Return with Ease",
    },
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Carousel Background */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
        emulateTouch
        dynamicHeight={false}
      >
        {slides.map((slide, idx) => (
          <div key={idx} style={{ height: "100vh" }}>
            <img
              src={slide.image}
              alt={slide.title}
              style={{ objectFit: "cover", height: "100vh", width: "100%" }}
            />
          </div>
        ))}
      </Carousel>

      {/* Overlay content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
          📚 Welcome to the Library System
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          {isLoggedIn
            ? "Navigate through the menu to borrow or return books."
            : "Please Sign Up or Login to continue."}
        </p>

        {!isLoggedIn && (
          <div>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                padding: "10px 20px",
                marginRight: "15px",
                background: "#27ae60",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                padding: "10px 20px",
                background: "#2980b9",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
