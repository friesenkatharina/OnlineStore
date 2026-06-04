import React from "react";
import Footer from "../Components/Footer";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Rechtliches</p>
        <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-10">Impressum</h1>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-amber-800 text-xs">
            <strong>Hinweis:</strong> Dieser Online-Shop ist ein <strong>Demoprojekt zu Portfoliozwecken</strong>.
            Es handelt sich um keinen echten Onlineshop. Es können keine Bestellungen aufgegeben oder
            Zahlungen getätigt werden.
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">Angaben gemäß § 5 TMG</h2>
            <p>Katharina Friesen<br />
            Webentwicklerin & Designerin<br />
            Deutschland</p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">Kontakt</h2>
            <p>E-Mail: <a href="mailto:katharina_f1@icloud.com" className="underline hover:text-green-700">katharina_f1@icloud.com</a></p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">Zweck dieser Website</h2>
            <p>
              Diese Website wurde von Katharina Friesen als Portfolioprojekt entwickelt und dient
              ausschließlich der Präsentation von Webentwicklungs-Kenntnissen. Alle dargestellten
              Produkte, Preise und Inhalte sind fiktiv und dienen nur zur Demonstration.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">Verwendete Technologien</h2>
            <p>React, TypeScript, Tailwind CSS, Vite, Node.js, MongoDB Atlas, Vercel</p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Da es sich um
              ein Demoprojekt handelt, übernimmt die Betreiberin keine Gewähr für die Vollständigkeit
              und Aktualität der bereitgestellten Inhalte.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">Urheberrecht</h2>
            <p>
              Die durch die Betreiberin erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. © {new Date().getFullYear()} Katharina Friesen
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
