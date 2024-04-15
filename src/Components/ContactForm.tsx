import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = "service_i2pt7ql";
    const templateId = "template_lhcwv5e";
    const publicKey = "Hexgh2WaL894SwgtW";

    console.log("serviceId", serviceId);
    console.log("templetaID", templateId);
    console.log("Public Key:", publicKey);

    if (!serviceId || !templateId || !publicKey) {
      console.error("Email service configuration is missing.");
      setStateMessage("Email service is not properly configured.");
      setIsSubmitting(false);
      return;
    }

    emailjs.init({
      // serviceID = serviceId,
      // templateId = templateId,
      publicKey: publicKey,
    });

    setIsSubmitting(true);

    emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey).then(
      (result) => {
        console.log("Email successfully sent!", result);
        setStateMessage("Message sent!");
        setIsSubmitting(false);
        setTimeout(() => {
          setStateMessage(null);
        }, 5000);
      },
      (error) => {
        console.error("Failed to send email", error);
        setStateMessage("Something went wrong, please try again later.");
        setIsSubmitting(false);
        setTimeout(() => {
          setStateMessage(null);
        }, 5000);
      }
    );

    e.currentTarget.reset();
  };

  return (
    <form
      onSubmit={sendEmail}
      style={{
        width: "250px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" disabled={isSubmitting} />
      {stateMessage && <p>{stateMessage}</p>}
    </form>
  );
};

export default ContactForm;
