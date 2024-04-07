import express from "express";
import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";

const app = express();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash das Passwort
    const hashedPassword = await bcrypt.hash(password, 10);

    // Erstelle einen neuen Nutzer
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Speichere den Nutzer in der Datenbank
    await user.save();

    res.status(201).send("Nutzer erfolgreich registriert");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Suche den Nutzer per E-Mail
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Nutzer nicht gefunden");
    }

    // Überprüfe das Passwort
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Ungültiges Passwort");
    }

    // Nutzer erfolgreich eingeloggt
    res.send("Erfolgreich eingeloggt");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ... existing code ...

app.use("/", router);
