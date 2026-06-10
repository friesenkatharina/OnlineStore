import React from "react";
import { Helmet } from "react-helmet-async";
import ContactForm from "../Components/ContactForm";
import TeamSection from "../Components/TeamSection";

const values = [
  { icon: "🪢", title: "Handgemacht", text: "Jedes Stück entsteht in liebevoller Handarbeit – kein Roboter, kein Fließband." },
  { icon: "🌿", title: "Nachhaltig", text: "Wir verwenden ausschließlich natürliche Materialien und achten auf umweltbewusste Verpackungen." },
  { icon: "✨", title: "Einzigartig", text: "Kein Stück ist wie das andere. Jedes Makramee ist ein echtes Unikat." },
  { icon: "💛", title: "Mit Liebe", text: "Hinter jedem Knoten steckt Leidenschaft, Geduld und echtes Handwerk." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Über uns — Das Team hinter dem Makramee Store</title>
        <meta name="description" content="Lerne das Team hinter dem Makramee Store kennen. Vier leidenschaftliche Handwerkerinnen, die Makramee-Kunst mit Liebe und nachhaltigen Materialien erschaffen." />
        <link rel="canonical" href="https://makramee-store.vercel.app/about" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#faf8f5] px-4 pt-20 pb-24">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#c4a882]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#a8c4b0]/15 blur-2xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-[#b08060]">
            Über uns
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
            Mehr als ein Shop –<br />
            <span className="text-[#c4a882]">eine Leidenschaft.</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            Wir sind ein kleines Team aus Uttenreuth, das Makramee liebt. Alles was hier entsteht, wird mit Herz, Geduld und echtem Handwerk gefertigt.
          </p>
        </div>
      </section>

      {/* Bild + Intro */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src="/DreamWhite.jpeg"
              alt="Unser Atelier"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#b08060] mb-3">
              Unsere Geschichte
            </p>
            <h2 className="text-3xl font-black text-gray-900 mb-4 leading-snug">
              Gestartet in einer kleinen Küche
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Was 2019 als Hobby begann, ist heute ein kleines aber feines Label für handgefertigte Makramee-Kunst. Jedes Stück das wir verkaufen, haben wir selbst entworfen, geknotet und mit Liebe verpackt.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Wir glauben daran, dass echtes Handwerk seinen Wert hat – und dass ein Zuhause durch ein einziges, besonderes Stück wärmer wirken kann.
            </p>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="bg-[#faf8f5] px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#b08060] mb-2">Was uns antreibt</p>
            <h2 className="text-3xl font-black text-gray-900">Unsere Werte</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 items-start">
                <span className="text-2xl shrink-0">{v.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Kontakt */}
      <section className="px-4 py-16 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#b08060] mb-2">Schreib uns</p>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Wir freuen uns von dir zu hören</h2>
            <p className="text-gray-500 text-sm">Fragen, Feedback oder einfach Hallo — wir antworten so schnell wie möglich.</p>
          </div>
          <ContactForm />
        </div>
      </section>

    </div>
  );
}
