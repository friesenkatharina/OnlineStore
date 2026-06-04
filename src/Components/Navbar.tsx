import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/makrameeLogo.png";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-green-300 ${isActive ? "text-green-300" : "text-white/80"}`;

  return (
    <nav className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: "#14532d" }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-9 w-9 object-contain" />
          <span className="text-white font-bold text-base hidden sm:block">Makramee Store</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-7">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/store" className={linkClass}>Store</NavLink>
          <NavLink to="/about" className={linkClass}>Über uns</NavLink>
          {user ? (
            <>
              <NavLink to="/account" className={linkClass}>Account</NavLink>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium px-4 py-1.5 rounded-full border border-white/40 text-white hover:bg-white/10 transition"
              >
                Abmelden
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink
                to="/signup"
                className="text-sm font-semibold px-4 py-1.5 rounded-full bg-white text-green-900 hover:bg-green-100 transition"
              >
                Registrieren
              </NavLink>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ backgroundColor: "#14532d" }}>
          <NavLink to="/" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/store" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Store</NavLink>
          <NavLink to="/about" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Über uns</NavLink>
          {user ? (
            <>
              <NavLink to="/account" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Account</NavLink>
              <button onClick={handleSignOut} className="text-white/80 text-sm text-left">Abmelden</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Registrieren</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
