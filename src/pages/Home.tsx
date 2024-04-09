import React from "react";
import Footer from "../Components/Footer";
import shopImage from "../assets/BlatGruen.jpeg";
import headerImage from "../assets/FlowerRegal.jpeg";
import "../index.css";

function Home(): React.JSX.Element {
  return (
    <div
      style={{ marginTop: "50px", border: "5px solid grey", padding: "20px" }}
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
        <h1
          style={{ fontFamily: "monospace", textAlign: "center" }}
          className=" welcome-title"
        >
          Willkommen!
        </h1>
        <p
          style={{ fontFamily: "revert-layer", textAlign: "center" }}
          className=" welcome-text"
        >
          Welcome to my soon-to-be-launched online shop!
          <br />
          I am in the process of crafting a unique and immersive shopping
          experience just for you.
          <br />
          At my shop, you'll discover a curated selection of high-quality
          Makramee Decoration products
          <br />
          designed to enhance your lifestyle and bring joy to your everyday
          moments.
        </p>
      </div>
      <header className=" shop-header">
        <img
          className="shop-image"
          src={shopImage}
          alt="Shop"
          style={{
            marginTop: "100px",
            marginLeft: "50px",
            width: "30%",
            height: "65vh",
            border: "5px solid green",
            borderRadius: "50%",
          }}
        />
        <div
          className="header-image-container"
          style={{ position: "relative", left: "60%" }}
        >
          {" "}
          <img
            className="header-image"
            src={headerImage}
            alt="Shop"
            style={{
              width: "30%",
              height: "55vh",
              border: "5px solid green",
              borderRadius: "50%",
            }}
          />
        </div>
      </header>
      <div className="space-below" style={{ marginTop: "200px" }}></div>
      <Footer />
    </div>
  );
}

export default Home;
