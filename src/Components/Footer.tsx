import React from "react";
import { NavLink } from "react-router-dom";
import logo from "/makrameeLogo.png";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#14532d" }} className="text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
            <span className="font-bold text-lg">Makramee Store</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Handgefertigte Makramee-Kunst aus natürlichen Materialien — mit Liebe gemacht.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3 text-white/90">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><NavLink to="/" className="hover:text-white transition">Home</NavLink></li>
            <li><NavLink to="/store" className="hover:text-white transition">Store</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white transition">Über uns</NavLink></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-white/90">Kontakt</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>📧 info@makrameestore.de</li>
            <li>📍 Deutschland</li>
            <li>🕐 Mo–Fr 9:00–17:00 Uhr</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} Makramee Deco Store — Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
