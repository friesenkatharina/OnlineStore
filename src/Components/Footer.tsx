import React from "react";
import { NavLink } from "react-router-dom";
import logo from "/makrameeLogo.png";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#14532d" }} className="text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
            <span className="font-black text-lg uppercase tracking-tight">Makramee Store</span>
          </div>
          <p className="text-white/60 text-xs leading-relaxed mb-4">
            Handgefertigte Makramee-Kunst aus natürlichen Materialien — mit Liebe gemacht.
          </p>
          <div className="border-t border-white/10 pt-4">
            <p className="text-white/40 text-xs mb-1">Entwickelt & gestaltet von</p>
            <p className="text-white font-bold text-sm">Katharina Friesen</p>
            <p className="text-white/50 text-xs">Webentwicklerin & Designerin</p>
            <a
              href="mailto:katharina_f1@icloud.com"
              className="text-green-300 text-xs hover:text-green-200 transition mt-1 inline-block"
            >
              katharina_f1@icloud.com
            </a>
          </div>
          <div className="mt-3 inline-block bg-amber-500/20 border border-amber-400/30 rounded-lg px-3 py-1.5">
            <p className="text-amber-300 text-xs font-semibold">🎓 Portfolioprojekt — Demo-Website</p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold mb-4 text-white/90 text-xs uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li><NavLink to="/" className="hover:text-white transition">Home</NavLink></li>
            <li><NavLink to="/store" className="hover:text-white transition">Store</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white transition">Über uns</NavLink></li>
            <li><NavLink to="/login" className="hover:text-white transition">Login</NavLink></li>
            <li><NavLink to="/signup" className="hover:text-white transition">Registrieren</NavLink></li>
          </ul>
        </div>

        {/* Rechtliches */}
        <div>
          <h4 className="font-bold mb-4 text-white/90 text-xs uppercase tracking-widest">Rechtliches</h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li><NavLink to="/impressum" className="hover:text-white transition">Impressum</NavLink></li>
            <li><NavLink to="/datenschutz" className="hover:text-white transition">Datenschutz</NavLink></li>
          </ul>
          <div className="mt-6">
            <h4 className="font-bold mb-2 text-white/90 text-xs uppercase tracking-widest">Kontakt</h4>
            <a href="mailto:katharina_f1@icloud.com" className="text-xs text-white/60 hover:text-white transition block">
              katharina_f1@icloud.com
            </a>
          </div>
          <div className="mt-6">
            <h4 className="font-bold mb-2 text-white/90 text-xs uppercase tracking-widest">Tools</h4>
            <NavLink to="/qrcode" className="text-xs text-white/60 hover:text-white transition flex items-center gap-1.5">
              <span>⬛</span> QR-Code Generator
            </NavLink>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-xs">
          <span>© {new Date().getFullYear()} Katharina Friesen — Alle Rechte vorbehalten.</span>
          <span>Portfolioprojekt · Keine echten Transaktionen</span>
        </div>
      </div>
    </footer>
  );
}
