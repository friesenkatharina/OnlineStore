import React, { useState } from "react";

const ImageModal = ({ src, alt }: { src: string; alt: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{ width: "30%", cursor: "pointer" }}
        onClick={toggleModal}
      />
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={toggleModal}
        >
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: "80%", maxHeight: "80%" }}
            onClick={(e) => e.stopPropagation()} // Prevents modal close when clicking on the image
          />
        </div>
      )}
    </>
  );
};

export default ImageModal;
