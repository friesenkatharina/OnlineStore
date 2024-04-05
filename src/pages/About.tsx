import React from "react";

function About() {
  return (
    <>
      <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url("path/to/your/image.jpg")', // Pfad zu deinem Bild
            height: "200px", // Optional: Setze eine Höhe für das Bild
          }}
        ></div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight">Card title</h5>
          <p className="mb-4 text-base">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="text-base text-surface/75 dark:text-neutral-300">
            <small>Last updated 3 mins ago</small>
          </p>
        </div>
      </div>

      {/* Zweite Karte bleibt unverändert, falls du dort kein Bild möchtest */}
      <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight">Card title</h5>
          <p className="mb-4 text-base">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="text-base text-surface/75 dark:text-neutral-300">
            <small>Last updated 3 mins ago</small>
          </p>
        </div>
        <div className="relative overflow-hidden bg-cover bg-no-repeat"></div>
      </div>
    </>
  );
}

export default About;
