import React, { useState, useEffect, useRef } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/kats_makramee_universum/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100090965007489&locale=de_DE";

export default function FloatingSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faved, setFaved] = useState(false);
  const [hidden, setHidden] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Favourit aus localStorage laden
  useEffect(() => {
    setFaved(localStorage.getItem("makramee-fav") === "true");
  }, []);

  const toggleFav = () => {
    const next = !faved;
    setFaved(next);
    localStorage.setItem("makramee-fav", String(next));
  };

  // Footer erkennen → Sidebar verstecken
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  const buttons = [
    {
      label: faved ? "Gespeichert" : "Favourisieren",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill={faved ? "#14532d" : "none"} stroke="currentColor" strokeWidth={1.8}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      onClick: toggleFav,
      href: null,
      color: faved ? "#14532d" : "#374151",
    },
    {
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
      onClick: null,
      href: INSTAGRAM_URL,
      color: "#E1306C",
    },
    {
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      onClick: null,
      href: FACEBOOK_URL,
      color: "#1877F2",
    },
  ];

  return (
    <>
      {/* Desktop — feste Sidebar rechts, Buttons sliden heraus */}
      <div
        ref={sidebarRef}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2"
      >
        {buttons.map((btn) => {
          const inner = (
            <div
              key={btn.label}
              className="group flex items-center justify-end"
            >
              {/* Label — erscheint beim Hover von rechts */}
              <span
                className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-xs font-bold text-white px-3 py-2 rounded-l-lg whitespace-nowrap shadow-md"
                style={{ backgroundColor: btn.color }}
              >
                {btn.label}
              </span>
              {/* Icon Button */}
              <button
                onClick={btn.onClick || undefined}
                className="w-11 h-11 flex items-center justify-center bg-white border-l-4 shadow-md hover:scale-105 transition-all duration-200"
                style={{ borderColor: btn.color, color: btn.color }}
                aria-label={btn.label}
              >
                {btn.icon}
              </button>
            </div>
          );

          return btn.href ? (
            <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer">
              {inner}
            </a>
          ) : (
            <div key={btn.label}>{inner}</div>
          );
        })}
      </div>

      {/* Mobile/Tablet — Toggle Button unten rechts */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden flex flex-col items-end gap-2">

        {/* Ausgeklappte Buttons */}
        {mobileOpen && (
          <div className="flex flex-col gap-2 mb-2">
            {buttons.map((btn) => {
              const inner = (
                <div key={btn.label} className="flex items-center gap-2 justify-end">
                  <span
                    className="text-xs font-bold text-white px-3 py-1.5 rounded-full shadow-md"
                    style={{ backgroundColor: btn.color }}
                  >
                    {btn.label}
                  </span>
                  <button
                    onClick={btn.onClick || undefined}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border"
                    style={{ borderColor: btn.color, color: btn.color }}
                    aria-label={btn.label}
                  >
                    {btn.icon}
                  </button>
                </div>
              );

              return btn.href ? (
                <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={btn.label}>{inner}</div>
              );
            })}
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-2 transition-transform duration-300"
          style={{ borderColor: "#14532d", color: "#14532d", transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-label="Social Links öffnen"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>
    </>
  );
}
