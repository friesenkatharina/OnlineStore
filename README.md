## in this Project OnlineStore

Frontend

- Vite
- TypeScript
- Axios
- Tailwind
- Bootstrap
- Stripe
- emailjs

Backend

- React JS
- Express
- MongoDB
- bcrypt
- cors

kommen wir zuerst zum backend im code .
ich habe zuerst die Ordnernerstrucktur erstellt, dabei war mir wichtig die Struktur für die regestrierung und den login in der Seite. Die Daten sollen gespeichert werden in der Datenbank.

dafür habe ich Express installiert (Express. js ist ein leistungsstarkes und flexibles Framework für Node. js, welches vollständig in JavaScript geschrieben ist. Es wird zur Verwaltung der Datenpräsentation auf der Serverseite verwendet und bietet eine einfache und effektive Methode zur Erstellung von Webanwendungen und APIs.)
im Express Js wird Routing-methoden genutzt um flexibler die Componenten zu rendern
Routing-Methoden geben eine Callback-Funktion (manchmal auch „Handler-Funktionen“ genannt), wenn die Anwendung eine Anfrage an den angegebenen Route (Endpunkt) und HTTP-Methode erhält.

Mit mehreren Rückruffunktionen ist es wichtig, nextals Argument zur Rückruffunktion und dann Ruf next()im Körper der Funktion zur Hand der Steuerung zum nächsten Rückruf. z.B.(req, res, next)

##Stell dir Express wie den Manager eines Ladengeschäfts vor: Es hilft dabei, alles zu organisieren, von den Produkten, die du siehst, bis hin zu den Details deiner Bestellung. Wenn ein Nutzer auf der Website eine Aktion ausführt, wie sich anmelden oder ein Produkt in den Warenkorb legen, sorgt Express dafür, dass die Anfragen richtig bearbeitet werden.

# bcrypt

eine beliebte Bibliothen um Passwörter sicher zu speichern
Statt das Passwort direkt in der Datenbank zu speichern, verwendet bcrypt einen Prozess namens „Hashing“. Hierbei wird das ursprüngliche Passwort genommen und durch eine mathematische Funktion in eine Zeichenfolge umgewandelt, die scheinbar zufällig ist. Dieser Prozess ist einweg, was bedeutet, dass man aus der gehashten Version nicht das ursprüngliche Passwort zurückgewinnen kann.

# jsonwebtoken

JWTs leicht durch eine URL, POST-Parameter oder in einem HTTP-Header gesendet werden
JWTs enthalten alle notwendigen Informationen über den Benutzer, was die Anzahl der benötigten Datenbankabfragen reduziert.
JWTs werden häufig in Webanwendungen für die Authentifizierung und Autorisierung verwendet. Sie ermöglichen es dem Server, einmal die Identität eines Benutzers zu verifizieren und dann ein Token auszustellen, das bei zukünftigen Anfragen zur Authentifizierung verwendet wird, ohne erneut Benutzername und Passwort übermitteln zu müssen. Das JWT wird normalerweise im HTTP Authorization-Header mit dem Bearer-Schema gesendet (Authorization: Bearer <token>).

# Stripe

Stripe ist ein umfassendes Zahlungsverarbeitungssystem, das speziell dafür entwickelt wurde, Entwicklern die Integration von Zahlungsdiensten in ihre Anwendungen und Websites zu erleichtern. Es bietet eine breite Palette von Tools und Funktionen, die es ermöglichen, Zahlungen von Kunden sicher und effizient zu akzeptieren, zu verarbeiten und zu verwalten.

# cors

CORS ermöglicht es Servern, Regeln festzulegen, wer ihre Ressourcen abrufen darf. Diese Regeln werden durch HTTP-Header gesteuert, die vom Server zusammen mit den Ressourcen gesendet werden.

# dotenv

dotenv ist ein einfaches und praktisches NPM-Paket in Node.js, das dazu dient, Umgebungsvariablen aus einer .env-Datei in den process.env-Speicherbereich des Node.js-Prozesses zu laden. dies ist besonders nützlich für die Verwaltung von API Schlüsseln und Keys die geschützt werden müssen.

# cookie-parser
