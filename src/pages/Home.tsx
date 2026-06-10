import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "../Components/Footer";
import TeamSection from "../Components/TeamSection";
import storeItems from "../items.json";

const FEATURED_IDS = [1, 4, 7, 8];
const featured = storeItems.filter((item) => FEATURED_IDS.includes(item.id));
const exclusiveItems = storeItems.filter((item) => item.exclusive);

const features = [
  { icon: "🤝", title: "Handgefertigt", text: "Jedes Stück wird mit Sorgfalt von Hand geknüpft." },
  { icon: "🌿", title: "Nachhaltig", text: "Natürliche Materialien, schonend für die Umwelt." },
  { icon: "✨", title: "Unikate", text: "Kein Stück ist wie das andere — jedes ist einzigartig." },
  { icon: "📦", title: "Schneller Versand", text: "Lieferung innerhalb von 3–5 Werktagen." },
];

export default function Home() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/users/me", { credentials: "include" })
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Makramee Store — Handgefertigte Makramee-Kunst kaufen</title>
        <meta name="description" content="Entdecke handgefertigte Makramee-Produkte aus 100 % natürlicher Baumwolle. Wanddekos, Blumenampeln, Tischläufer und mehr — jedes Stück ein Unikat." />
        <link rel="canonical" href="https://makramee-store.vercel.app/" />
      </Helmet>

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url(/MakraSymetrie.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "600px",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-green-300 font-semibold">
            Handgemachte Makramee-Kunst
          </p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 uppercase tracking-tight">
            Natürliche Schönheit für dein Zuhause
          </h1>
          <p className="text-base text-white/80 mb-8">
            Entdecke einzigartige, handgefertigte Makramee-Stücke mit Liebe zum Detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/store"
              className="px-8 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition"
            >
              Kollektion entdecken
            </Link>
            {!isAuth && (
              <Link
                to="/signup"
                className="px-8 py-3 border border-white text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition"
              >
                Member werden
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4 bg-stone-50 border-y border-stone-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((f) => (
            <div key={f.title}>
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Neue Kollektion */}
      <section
        className="py-16 px-4 relative"
        style={{
          backgroundImage: "url(/Muster.jpg)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/75" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Neu eingetroffen</p>
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Beliebte Stücke</h2>
            </div>
            <Link to="/store" className="text-xs font-bold uppercase tracking-widest text-gray-900 hover:underline">
              Alle ansehen →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map((item) => (
              <Link to="/store" key={item.id} className="group block">
                <div className="relative overflow-hidden bg-stone-100 aspect-[3/4] mb-3">
                  <img
                    src={item.imgUrl.trim()}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.isNew && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 bg-white text-black border border-black uppercase tracking-wider">
                      Neu
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{(item as any).subtitle}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{item.price.toFixed(2).replace(".", ",")} €</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Member Exclusive Section */}
      <section className="py-16 px-4 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-green-400 mb-2 block">
                Member Exclusive
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Nur für unsere Members
              </h2>
              <p className="text-white/50 text-sm mt-2 max-w-md">
                Als Member erhältst du Zugang zu exklusiven Stücken, die nicht öffentlich erhältlich sind.
              </p>
            </div>
            {!isAuth ? (
              <div className="flex gap-3 flex-shrink-0">
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition"
                >
                  Kostenlos registrieren
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-white transition"
                >
                  Anmelden
                </Link>
              </div>
            ) : (
              <Link
                to="/store?filter=exclusive"
                className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition flex-shrink-0"
              >
                Alle ansehen →
              </Link>
            )}
          </div>

          {/* Produkt Grid — unscharf wenn nicht eingeloggt */}
          <div className="relative">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-5 ${!isAuth ? "blur-sm pointer-events-none select-none" : ""}`}>
              {exclusiveItems.slice(0, 4).map((item) => (
                <div key={item.id} className="group">
                  <div className="relative overflow-hidden bg-stone-800 aspect-[3/4] mb-3">
                    <img
                      src={item.imgUrl.trim()}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 bg-white text-black uppercase tracking-wider">
                      Member Exclusive
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white uppercase tracking-wide">{item.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{(item as any).subtitle}</p>
                  <p className="text-sm font-semibold text-white mt-1">{item.price.toFixed(2).replace(".", ",")} €</p>
                </div>
              ))}
            </div>

            {/* Overlay wenn nicht eingeloggt */}
            {!isAuth && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-stone-900/90 px-8 py-6 border border-white/10">
                  <div className="text-2xl mb-3">🔒</div>
                  <p className="text-sm font-bold text-white mb-1">Exklusiv für Members</p>
                  <p className="text-xs text-white/50 mb-4">Registriere dich kostenlos um Zugang zu erhalten</p>
                  <Link
                    to="/signup"
                    className="inline-block px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition"
                  >
                    Jetzt Member werden
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <TeamSection />

      <Footer />
    </div>
  );
}
