import React from "react";
import Footer from "../Components/Footer";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Rechtliches</p>
        <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-10">Datenschutz&shy;erklärung</h1>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-amber-800 text-xs">
            <strong>Hinweis:</strong> Dies ist ein <strong>Demoprojekt zu Portfoliozwecken</strong>.
            Es handelt sich um keinen echten Onlineshop.
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">1. Verantwortliche Person</h2>
            <p>Katharina Friesen<br />
            E-Mail: <a href="mailto:katharina_f1@icloud.com" className="underline hover:text-green-700">katharina_f1@icloud.com</a></p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">2. Welche Daten werden gespeichert?</h2>
            <p>Bei der Registrierung werden folgende Daten gespeichert:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>E-Mail-Adresse</li>
              <li>Benutzername</li>
              <li>Passwort (verschlüsselt mit bcrypt)</li>
            </ul>
            <p className="mt-3">Es werden keine Zahlungsdaten, Adressen oder sonstige persönliche Daten gespeichert, da es sich um ein Demoprojekt handelt.</p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">3. Zweck der Datenverarbeitung</h2>
            <p>Die gespeicherten Daten dienen ausschließlich dem technischen Betrieb der Demo-Anwendung und der Authentifizierung. Sie werden nicht an Dritte weitergegeben.</p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">4. Cookies & Authentifizierung</h2>
            <p>Diese Website verwendet einen <strong>httpOnly-Cookie</strong> zur sicheren Authentifizierung. Dieser Cookie enthält ein JWT-Token und wird beim Abmelden gelöscht. Es werden keine Tracking-Cookies oder Analyse-Tools verwendet.</p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">5. Hosting</h2>
            <p>Diese Website wird gehostet bei <strong>Vercel Inc.</strong> (USA) und nutzt <strong>MongoDB Atlas</strong> (AWS Frankfurt) als Datenbank. Beide Dienste sind DSGVO-konform.</p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">6. Ihre Rechte</h2>
            <p>Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer gespeicherten Daten. Für Anfragen wenden Sie sich an: <a href="mailto:katharina_f1@icloud.com" className="underline hover:text-green-700">katharina_f1@icloud.com</a></p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-3">7. Datenlöschung</h2>
            <p>Da es sich um ein Portfolioprojekt handelt, können Testdaten jederzeit auf Anfrage vollständig gelöscht werden.</p>
          </div>

          <p className="text-xs text-gray-400 pt-4 border-t border-stone-100">Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
