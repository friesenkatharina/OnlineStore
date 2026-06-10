import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

const getPresets = (base: string) => [
  { label: "Shop-Startseite", url: base, desc: "Direkt zur Startseite" },
  { label: "Store / Kollektion", url: `${base}/store`, desc: "Direkt zu allen Produkten" },
  { label: "Registrieren", url: `${base}/signup`, desc: "Neue Kunden anmelden" },
  { label: "Kontakt", url: `${base}/contact`, desc: "Zum Kontaktformular" },
];

export default function QRCodePage() {
  const [selected, setSelected] = useState(0);
  const [customUrl, setCustomUrl] = useState("");
  const [size, setSize] = useState(240);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const presets = getPresets(window.location.origin);
  const activeUrl = customUrl.trim() || presets[selected].url;

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `makramee-qr-${presets[selected]?.label.toLowerCase().replace(/\s/g, "-") || "custom"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 uppercase tracking-widest">
            ← Zurück zur Startseite
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mt-4 mb-2">
            QR-Code Generator
          </h1>
          <p className="text-sm text-gray-500">
            Erstelle QR-Codes für Visitenkarten, Flyer, Produktverpackungen oder deinen Marktstand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Einstellungen */}
          <div className="space-y-6">

            {/* Preset-Links */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Seite auswählen
              </h2>
              <div className="space-y-2">
                {presets.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => { setSelected(i); setCustomUrl(""); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${
                      selected === i && !customUrl
                        ? "border-gray-900 bg-gray-50"
                        : "border-stone-200 hover:border-gray-400"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{p.label}</p>
                      <p className="text-xs text-gray-400">{p.desc}</p>
                    </div>
                    {selected === i && !customUrl && (
                      <span className="w-2 h-2 rounded-full bg-gray-900 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Eigene URL */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Oder eigene URL eingeben
              </h2>
              <input
                type="url"
                placeholder="https://..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition"
              />
            </div>

            {/* Größe */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Größe
                </h2>
                <span className="text-xs font-semibold text-gray-600">{size} × {size} px</span>
              </div>
              <input
                type="range"
                min={120}
                max={400}
                step={40}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Klein</span>
                <span>Groß</span>
              </div>
            </div>
          </div>

          {/* QR Vorschau & Download */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                Vorschau
              </p>

              {/* QR Code */}
              <div ref={canvasRef} className="p-4 bg-white border-2 border-stone-100 rounded-xl">
                <QRCodeCanvas
                  value={activeUrl}
                  size={Math.min(size, 220)}
                  bgColor="#ffffff"
                  fgColor="#1a1a1a"
                  level="H"
                  imageSettings={{
                    src: "/makrameeLogo.png",
                    height: 36,
                    width: 36,
                    excavate: true,
                  }}
                />
              </div>

              {/* Active URL */}
              <div className="w-full mt-5 flex items-center gap-2">
                <p className="flex-1 text-xs text-gray-400 truncate bg-stone-50 px-3 py-2 rounded-lg border border-stone-200">
                  {activeUrl}
                </p>
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 text-xs font-semibold rounded-lg border border-stone-200 hover:bg-stone-50 transition whitespace-nowrap"
                >
                  {copied ? "✓ Kopiert" : "Kopieren"}
                </button>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full py-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-700 transition"
            >
              ↓ Als PNG herunterladen
            </button>

            {/* Tipp-Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
              <p className="font-bold mb-1">💡 Tipp</p>
              <p className="text-xs leading-relaxed">
                Drucke den QR-Code auf Visitenkarten, Produktaufkleber oder dein Marktstand-Schild. Kunden scannen ihn und landen direkt in deinem Shop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
