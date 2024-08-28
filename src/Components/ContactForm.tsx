import React, { useState } from "react";
import emailjs from "@emailjs/browser";

type FormStatus = "idle" | "submitting" | "success" | "error";

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!serviceId || !templateId || !publicKey) {
      console.error("Email service configuration is missing.");
      setStatusMessage("Email service is not properly configured.");
      setFormStatus("error");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setFormStatus("submitting");

    emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey).then(
      (result) => {
        console.log("Email successfully sent!", result);
        setStatusMessage("Message sent!");
        setFormStatus("success");
        setIsSubmitting(false);
        setTimeout(() => {
          setStatusMessage(null);
          setFormStatus("idle");
        }, 5000);
      },
      (error) => {
        console.error("Failed to send email", error);
        setStatusMessage("Something went wrong, please try again later.");
        setFormStatus("error");
        setIsSubmitting(false);
        setTimeout(() => {
          setStatusMessage(null);
          setFormStatus("idle");
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
      <input type="text" name="user_name" required />
      <label>Email</label>
      <input type="email" name="user_email" required />
      <label>Message</label>
      <textarea name="message" required />
      <input type="submit" value="Send" disabled={isSubmitting} />
      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

export default ContactForm;
