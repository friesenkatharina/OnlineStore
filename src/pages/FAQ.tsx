import { useState } from "react";

type FAQItem = { question: string; answer: string };

const faqs: { category: string; icon: string; items: FAQItem[] }[] = [
  {
    category: "Bestellung & Zahlung",
    icon: "🛒",
    items: [
      {
        question: "Wie kann ich bestellen?",
        answer: `Lege einfach deine Lieblingsprodukte in den Warenkorb, klicke auf 'Zur Kasse' und folge den Schritten. Du benötigst dafür ein kostenloses Konto.`,
      },
      {
        question: "Welche Zahlungsarten werden akzeptiert?",
        answer: `Derzeit befinden wir uns im Aufbau unseres Zahlungssystems. In Kürze werden PayPal, Kreditkarte und Klarna verfügbar sein. Bis dahin kannst du uns direkt per E-Mail kontaktieren.`,
      },
      {
        question: "Kann ich meine Bestellung stornieren oder ändern?",
        answer: `Bestellungen können bis zu 24 Stunden nach Aufgabe storniert oder geändert werden. Schreibe uns dafür eine E-Mail so schnell wie möglich.`,
      },
    ],
  },
  {
    category: "Versand & Lieferung",
    icon: "📦",
    items: [
      {
        question: "Wie lange dauert die Lieferung?",
        answer: `Die Lieferzeit beträgt in der Regel 3–5 Werktage innerhalb Deutschlands. Für internationale Bestellungen kann es 7–14 Werktage dauern.`,
      },
      {
        question: "Wie hoch sind die Versandkosten?",
        answer: `Der Versand innerhalb Deutschlands kostet 4,90 €. Ab einem Bestellwert von 60 € liefern wir kostenlos.`,
      },
      {
        question: "Kann ich meine Bestellung verfolgen?",
        answer: `Ja! Nach dem Versand erhältst du eine Bestätigungs-E-Mail mit einer Sendungsverfolgungsnummer.`,
      },
    ],
  },
  {
    category: "Produkte & Materialien",
    icon: "🪢",
    items: [
      {
        question: "Aus welchen Materialien bestehen die Produkte?",
        answer: `Alle unsere Makramee-Stücke werden aus 100 % natürlicher Baumwolle hergestellt. Wir verwenden ausschließlich nachhaltige und umweltfreundliche Materialien.`,
      },
      {
        question: "Sind die Produkte handgemacht?",
        answer: `Ja, jedes einzelne Stück wird von Hand geknüpft. Dadurch ist jedes Produkt ein Unikat — kleine Abweichungen sind ein Zeichen der Handarbeit.`,
      },
      {
        question: "Wie pflege ich mein Makramee-Stück?",
        answer: `Am besten schüttelst du es regelmäßig aus und bringst es an einem trockenen, luftigen Ort unter. Bei Bedarf kannst du es vorsichtig mit lauwarmem Wasser und mildem Shampoo von Hand waschen.`,
      },
    ],
  },
  {
    category: "Rückgabe & Reklamation",
    icon: "↩️",
    items: [
      {
        question: "Kann ich Produkte zurückgeben?",
        answer: `Du hast ein 14-tägiges Rückgaberecht. Das Produkt muss unbenutzt und in Originalverpackung sein. Kontaktiere uns einfach per E-Mail und wir regeln alles.`,
      },
      {
        question: "Was mache ich, wenn mein Paket beschädigt ankommt?",
        answer: `Bitte fotografiere den Schaden und schicke uns die Bilder per E-Mail. Wir kümmern uns umgehend um einen Ersatz oder eine Rückerstattung.`,
      },
    ],
  },
  {
    category: "Individuelle Anfragen",
    icon: "✨",
    items: [
      {
        question: "Kann ich individuelle Stücke in Wunschfarben bestellen?",
        answer: `Ja! Wir freuen uns über individuelle Anfragen. Schreibe uns über das Kontaktformular und beschreibe deine Wunschvorstellungen — wir erstellen dir ein persönliches Angebot.`,
      },
      {
        question: "Bietet ihr Makramee für Hochzeiten oder Events an?",
        answer: `Absolut! Unsere Hochzeitskollektion ist sehr beliebt. Für größere Mengen oder besondere Anlässe bitte frühzeitig anfragen, da die Produktion Zeit braucht.`,
      },
    ],
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key);

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero */}
      <div className="bg-[#14532d] text-white py-14 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-green-300 font-semibold mb-3">
          Häufige Fragen
        </p>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3">
          FAQ
        </h1>
        <p className="text-white/70 text-sm max-w-md mx-auto">
          Hier findest du Antworten auf die häufigsten Fragen. Nicht dabei? Schreib uns einfach!
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-3xl mx-auto px-4 py-14 space-y-10">
        {faqs.map((section) => (
          <div key={section.category}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{section.icon}</span>
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">
                {section.category}
              </h2>
            </div>

            <div className="space-y-2">
              {section.items.map((item) => {
                const key = `${section.category}-${item.question}`;
                const isOpen = openItem === key;
                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-gray-800 pr-4">
                        {item.question}
                      </span>
                      <span
                        className="text-gray-400 text-lg flex-shrink-0 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-stone-100 pt-4">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Kontakt CTA */}
        <div className="bg-[#14532d] rounded-3xl p-8 text-center text-white">
          <p className="text-lg font-bold mb-2">Noch eine Frage?</p>
          <p className="text-white/70 text-sm mb-5">
            Wir helfen dir gerne weiter — einfach eine Nachricht schicken.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-green-900 text-sm font-bold rounded-full hover:bg-green-50 transition"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </div>
  );
}
