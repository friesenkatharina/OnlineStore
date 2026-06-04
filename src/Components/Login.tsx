import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const strength = isMobile ? 0.15 : 0.3;
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        bg.style.transform = `translateY(${-rect.top * strength}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.message || "Login fehlgeschlagen."); return; }
      refresh();
      navigate("/store");
    } catch {
      setError("Verbindungsfehler. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden" style={{ clipPath: "inset(0)" }}>

      {/* Parallax Hintergrund */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0"
        style={{
          top: "-10%", bottom: "-10%",
          backgroundImage: "url(/WandbehangStar.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
          zIndex: 0,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">

        {/* Linke Seite — Beschreibung */}
        <div className="flex-1 text-white text-center md:text-left">
          <p className="text-sm uppercase tracking-widest text-green-300 font-semibold mb-3">
            Dein Makramee-Konto
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
            Schön, dass du wieder da bist!
          </h2>
          <ul className="space-y-3 text-white/80 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-green-300 text-lg">✓</span>
              Zugang zu über 30 handgefertigten Makramee-Unikaten
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-300 text-lg">✓</span>
              Dein persönlicher Warenkorb wird gespeichert
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-300 text-lg">✓</span>
              Schneller Checkout & sichere Bezahlung
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-300 text-lg">✓</span>
              Bestellhistorie & Kontoverwaltung
            </li>
          </ul>
        </div>

        {/* Rechte Seite — Formular */}
        <div className="w-full md:w-96 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-gray-900">Anmelden</h1>
            <p className="text-gray-500 text-sm mt-1">Melde dich in deinem Konto an</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="deine@email.de"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#14532d" }}
            >
              {loading ? "Wird eingeloggt..." : "Anmelden"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Noch kein Konto?{" "}
            <Link to="/signup" className="font-semibold hover:underline" style={{ color: "#14532d" }}>
              Jetzt registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
