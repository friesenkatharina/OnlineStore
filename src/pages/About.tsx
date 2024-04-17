import React from "react";
import ContactForm from "../Components/ContactForm";
import "../styles/slider.css";
import Image from "../assets/DreamWhite.jpeg";

function About() {
  return (
    <>
      <div style={{ color: "green", padding: "0 1rem" }}>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
          consectetur corrupti consequuntur ipsum officiis quibusdam molestiae.
          Magnam, molestias sed...
        </p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <img
          src={Image}
          alt="Dreamy Scene"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div style={{ padding: "1rem", textAlign: "center", marginTop: "1rem" }}>
        <p style={{ fontSize: "1rem" }}>
          always excited to hear from you! 😃 Whether you have a question about
          services, need assistance, or just want to give feedback, feel free to
          drop a message using the contact form below. We strive to respond to
          all inquiries as swiftly as possible and look forward to connecting
          with you!
        </p>
      </div>
      <div>
        <ContactForm />
      </div>
    </>
  );
}

export default About;
