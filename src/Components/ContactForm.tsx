import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import process from "process";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID!,
        process.env.REACT_APP_TEMPLATE_ID!,
        e.currentTarget,
        process.env.REACT_APP_PUBLIC_KEY!
      )
      .then(
        (result) => {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        },
        (error) => {
          setStateMessage("Something went wrong, please try again later");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        }
      );

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={sendEmail}>
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
