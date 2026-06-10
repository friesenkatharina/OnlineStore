import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '../_lib/db.js';
import { User } from '../_lib/User.js';
import { parseCookies, setSecurityHeaders } from '../_lib/helpers.js';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const cookies = parseCookies(req);
  const token = cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated.' });

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return res.status(422).json({ message: 'Beide Felder sind erforderlich.' });
  if (newPassword.length < 8)
    return res.status(422).json({ message: 'Neues Passwort muss mind. 8 Zeichen haben.' });
  if (!/\d/.test(newPassword))
    return res.status(422).json({ message: 'Neues Passwort muss mind. eine Zahl enthalten.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: 'Benutzer nicht gefunden.' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Aktuelles Passwort ist falsch.' });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: 'Passwort erfolgreich geändert.' });
  } catch {
    res.status(401).json({ message: 'Sitzung abgelaufen. Bitte neu einloggen.' });
  }
}
