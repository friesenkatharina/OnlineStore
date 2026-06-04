import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import storeItems from "../items.json";

const FEATURED_IDS = [1, 2, 6, 8];
const featured = storeItems.filter((item) => FEATURED_IDS.includes(item.id));

const features = [
  { icon: "🤝", title: "Handgefertigt", text: "Jedes Stück wird mit Sorgfalt von Hand geknüpft." },
  { icon: "🌿", title: "Nachhaltig", text: "Natürliche Materialien, schonend für die Umwelt." },
  { icon: "✨", title: "Unikate", text: "Kein Stück ist wie das andere — jedes ist einzigartig." },
  { icon: "📦", title: "Schneller Versand", text: "Lieferung innerhalb von 3–5 Werktagen." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url(/MakraSymetrie.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "520px",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest mb-3 text-green-300 font-semibold">
            Handgemachte Makramee-Kunst
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Natürliche Schönheit für dein Zuhause
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Entdecke einzigartige, handgefertigte Makramee-Stücke mit Liebe zum Detail.
          </p>
          <Link
            to="/store"
            className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#14532d" }}
          >
            Jetzt shoppen
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((f) => (
            <div key={f.title}>
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Beliebte Stücke</h2>
            <Link
              to="/store"
              className="text-sm font-semibold hover:underline"
              style={{ color: "#14532d" }}
            >
              Alle ansehen →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((item) => (
              <Link to="/store" key={item.id} className="group block">
                <div className="overflow-hidden rounded-2xl bg-stone-100 aspect-square mb-3">
                  <img
                    src={item.imgUrl.trim()}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="font-semibold text-gray-800 text-sm">{item.name.trim()}</p>
                <p className="text-sm" style={{ color: "#14532d" }}>
                  {item.price.toFixed(2).replace(".", ",")} €
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Banner */}
      <section className="py-16 px-4" style={{ backgroundColor: "#14532d" }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Über unsere Handwerkskunst</h2>
          <p className="text-white/80 leading-relaxed mb-8">
            Herzlich Willkommen in unserem Makramee Online Shop! Jedes unserer Stücke
            wird mit viel Liebe zum Detail handgefertigt — aus hochwertigen, natürlichen
            Materialien. Boho-Chic trifft auf zeitloses Handwerk.
          </p>
          <Link
            to="/about"
            className="inline-block px-7 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-green-900 transition-all"
          >
            Mehr erfahren
          </Link>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Inspirationen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["/BlatGruen.jpeg", "/weddingMakra.jpeg", "/sparkleNight.jpeg",
              "/FlowerRegal.jpeg", "/WandbehangStar.jpeg", "/BluetenEleganz.jpeg"].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl aspect-square bg-stone-200">
                <img
                  src={src}
                  alt={`Inspiration ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
