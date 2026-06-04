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
    <form onSubmit={sendEmail} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="user_name"
            required
            placeholder="Dein Name"
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 placeholder:text-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">E-Mail</label>
          <input
            type="email"
            name="user_email"
            required
            placeholder="deine@email.de"
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 placeholder:text-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Nachricht</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Deine Nachricht an uns..."
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 placeholder:text-gray-300 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#c4a882" }}
        >
          {isSubmitting ? "Wird gesendet…" : "Nachricht senden"}
        </button>

        {statusMessage && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm font-medium text-center ${
              formStatus === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {statusMessage}
          </div>
        )}

      </div>
    </form>
  );
};

export default ContactForm;
