import React from "react";

function About() {
  return (
    <>
      <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url("path/to/your/image.jpg")',
            height: "200px",
          }}
        ></div>

        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight"></h5>
          <p className="mb-4 text-base"></p>
          <p className="text-base text-surface/75 dark:text-neutral-300">
            <small></small>
          </p>
        </div>
      </div>
      <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight"></h5>
          <p className="mb-4 text-base"></p>
          <p className="text-base text-surface/75 dark:text-neutral-300">
            <small></small>
          </p>
        </div>
        <div className="relative overflow-hidden bg-cover bg-no-repeat"></div>
      </div>
    </>
  );
}

export default About;
