function About() {
  return (
    <>
      <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img
            className="rounded-t-lg"
            src="https://tecdn.b-cdn.net/img/new/slides/041.webp"
            alt=""
          />
        </div>
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
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img
            className="rounded-b-lg"
            src="https://tecdn.b-cdn.net/img/new/slides/042.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default About;
