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
            Herzlich Willkommen in unserem Makramee Online Shop!

            Wir freuen uns, dass Sie den Weg zu uns gefunden haben. Hier erwarten Sie einzigartige, handgefertigte Makramee-Kreationen, die mit viel Liebe zum Detail und Sorgfalt hergestellt wurden. Jedes unserer Stücke erzählt seine eigene Geschichte und bringt einen Hauch von Boho-Chic in Ihr Zuhause oder in Ihren Alltag.
            <br />
            Unsere Leidenschaft für das traditionelle Handwerk spiegelt sich in jedem Knoten wider. Ob es sich um Wandbehänge, Pflanzenhänger, Schmuck oder andere Dekorationsartikel handelt – bei uns finden Sie stilvolle Unikate, die mit hochwertigen Materialien und einer Extraportion Herzblut gefertigt wurden.
            <br />
            Schauen Sie sich um und lassen Sie sich von unserer Auswahl inspirieren. Wir sind sicher, dass auch für Sie das perfekte Makramee-Stück dabei ist, das Ihrem Zuhause oder Ihrem Leben das gewisse Etwas verleiht.

            Viel Spaß beim Stöbern und Einkaufen!


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
