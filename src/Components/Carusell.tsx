import React, { useState, useEffect, useRef } from "react";
import styles from "./Carousel.module.css"; // Assuming CSS modules
import { IonIcon } from "@ionic/react"; // Import the IonIcon component from

const Carousel: React.FC = () => {
  const sliderRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const handleActivation = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      const items = slider?.querySelectorAll(".item");
      if (!items) return;

      if (event.target.matches(".next")) {
        slider?.append(items[0]);
      } else if (event.target.matches(".prev")) {
        slider?.prepend(items[items.length - 1]);
      }
    };

    document.addEventListener("click", handleActivation, false);
    return () => {
      document.removeEventListener("click", handleActivation, false);
    };
  }, []);

  return (
    <main>
      <ul className={styles.slider} ref={sliderRef}>
        {/* List items with inline styles */}
        <li
          className={styles.item}
          style={{
            backgroundImage:
              "url('https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg')",
          }}
        >
          <div className={styles.content}>
            <h2 className={styles.title}>Lossless Youths</h2>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              fuga voluptatum, iure corporis inventore praesentium nisi. Id
              laboriosam ipsam enim.
            </p>
            <button>Read More</button>
          </div>
        </li>
        {/* Additional items... */}
      </ul>

      <nav className={styles.nav}>
        <IonIcon
          className={styles.btn + " prev"}
          name="arrow-back-outline"
        ></IonIcon>
        <IonIcon
          className={styles.btn + " next"}
          name="arrow-forward-outline"
        ></IonIcon>
      </nav>
    </main>
  );
};

export default Carousel;
