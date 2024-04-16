import React from "react";
import ContactForm from "../Components/ContactForm";
import "../styles/slider.css";
import Image from "../assets/DreamWhite.jpeg";

function About() {
  return (
    <>
      <div>
        <p style={{ color: "green" }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
          consectetur corrupti consequuntur ipsum officiis quibusdam molestiae.
          Magnam, molestias sed. Nostrum, dolores eius. Voluptate ipsam,
          excepturi quo eum blanditiis iusto distinctio sit nesciunt autem
          similique non cumque mollitia consequatur harum neque porro. Esse,
          possimus! Veniam debitis alias, facere est aspernatur soluta fuga
          impedit ipsa temporibus laboriosam, magnam reprehenderit illo odit
          sunt quibusdam animi modi placeat perspiciatis expedita molestiae
          doloremque. Nihil, nesciunt quo, quae tempore aliquid fuga maxime
          impedit suscipit unde rem magnam officiis vitae eaque architecto!
          Asperiores doloribus quidem quis nam. Fuga modi ipsum inventore
          officia explicabo sit excepturi temporibus quam?
        </p>
      </div>
      <div>
        <img
          style={{
            width: "250px",
            position: "absolute",
            left: "45%",
            top: "60%",
          }}
          src={Image}
        />
      </div>
      <div style={{ width: "500px", height: "200px", marginTop: "300px" }}>
        <p
          style={{
            fontSize: "15px",
            fontFamily: "monospace",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          always excited to hear from you! 😃
          <br />
          Whether you have a question about services, need assistance, or just
          want to give feedback, feel free to drop a message using the contact
          form below.
          <br /> We strive to respond to all inquiries as swiftly as possible
          and look forward to connecting with you!
        </p>
      </div>
      <div style={{ marginTop: "30px" }}>
        {" "}
        <ContactForm />
      </div>
    </>
  );
}

export default About;
