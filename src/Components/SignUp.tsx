import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registrierung fehlgeschlagen.");
        return;
      }
      navigate("/login");
    } catch {
      setError("Verbindungsfehler. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Konto erstellen</h1>
            <p className="text-gray-500 text-sm mt-2">Werde Teil unserer Makramee-Community</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="deine@email.de"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Benutzername</label>
              <input
                type="text"
                placeholder="dein_username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
              <input
                type="password"
                placeholder="Min. 8 Zeichen, 1 Zahl"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white transition hover:opacity-90 disabled:opacity-60 mt-2"
              style={{ backgroundColor: "#14532d" }}
            >
              {loading ? "Wird registriert..." : "Registrieren"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Bereits ein Konto?{" "}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: "#14532d" }}>
              Anmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
