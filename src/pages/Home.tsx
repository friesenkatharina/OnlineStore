import React from "react";
import { Footer } from "../Components/Footer";
import shopImage from "../assets/BlatGruen.jpeg";
import headerImage from "../assets/FlowerRegal.jpeg";
import "../index.css";

function Home(): React.JSX.Element {
  return (
    <div
      style={{ marginTop: "50px" }}
      className=" min-h-screen flex flex-col items-center justify-center"
    >
      <div
        style={{ marginTop: "50px" }}
        className="relative z-10 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg"
      >
        <h1
          style={{ fontFamily: "monospace" }}
          className="text-2xl font-bold text-center mb-4"
        >
          Willkommen!
        </h1>
        <p
          style={{ fontFamily: "revert-layer" }}
          className="text-lg text-gray-600 text-center"
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
      <header className="w-full absolute top-0 z-50 p-6">
        {/* <video
          autoPlay
          loop
          muted
          style={{
            maxWidth: "200%",
            maxHeight: "100vh",
            objectFit: "contain",
            marginLeft: "50px",
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Ihr Browser unterstützt kein Video.
        </video> */}

        <img
          src={shopImage}
          alt="Shop"
          style={{
            marginTop: "100px",
            width: "50%",
            height: "65vh",
            borderRadius: "50%",
          }}
        />
        <div style={{ position: "relative", left: "60%" }}>
          {" "}
          <img
            src={headerImage}
            alt="Shop"
            style={{ width: "50%", height: "105vh", borderRadius: "50%" }}
          />
        </div>
      </header>
      <div style={{ marginTop: "200px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
