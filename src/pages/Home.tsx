import React from "react";
import Footer from "../Components/Footer";
import shopImage from "/BlatGruen.jpeg";
import headerImage from "/MakraSymetrie.jpeg";
import Slider from "../Components/Slider";
import ImageModal from "../Components/ImageModal";
import "../styles/index.css";
// import Rating from "@mui/material/Rating";
import Rating from "../Components/Rating";

function Home(): React.JSX.Element {
  return (
    <>
      <Slider />

      <header style={{ backgroundImage: "" }}></header>
      <div>
        <h1
          style={{
            fontFamily: "monospace",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Welcome to Creative Store for Makramee
        </h1>
        <Rating />
      </div>
      <div
        style={{
          marginTop: "250px",
          border: "5px solid grey",
          padding: "20px",
          backgroundColor: "#14532d",
        }}
        className="  home-container"
      >
        <div
          style={{
            marginTop: "50px",
            border: "5px solid grey",
            padding: "20px",
          }}
          className=" welcome-section"
        >
          <p
            style={{
              fontFamily: "revert-layer",
              textAlign: "center",
              color: "white",
            }}
            className=" welcome-text"
          >
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            earum!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            earum!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            earum!
          </p>
        </div>

        <header className=" shop-header">
          <div style={{ marginTop: "100px", marginLeft: "50px" }}>
            {" "}
            <ImageModal src={shopImage} alt="Shop" />
          </div>

          <div
            className="header-image-container"
            style={{ position: "relative", left: "60%" }}
          >
            {" "}
            <ImageModal src={headerImage} alt="Shop" />
          </div>
        </header>

        <div className="space-below" style={{ marginTop: "200px" }}></div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
