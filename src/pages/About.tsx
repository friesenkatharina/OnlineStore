import React from "react";
import ContactForm from "../Components/ContactForm";
import "../styles/slider.css";
// import Image from "../assets/";

function About() {
  return (
    <>
      {/* <div>
        
        <img src={} />
      </div> */}
      <div style={{ width: "500px", height: "200px", marginTop: "550px" }}>
        <p
          style={{
            fontFamily: "monospace",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          always excited to hear from you! <br />
          Whether you have a question about services, need assistance, or just
          want to give feedback, feel free to drop a message using the contact
          form below. We strive to respond to all inquiries as swiftly as
          possible and look forward to connecting with you!
        </p>
      </div>
      <div style={{ marginTop: "100px" }}>
        {" "}
        <ContactForm />
      </div>
    </>
  );
}

export default About;
