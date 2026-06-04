import jwt from 'jsonwebtoken';
import { connectDB } from '../_lib/db.js';
import { User } from '../_lib/User.js';
import { parseCookies, setSecurityHeaders } from '../_lib/helpers.js';

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const cookies = parseCookies(req);
  const token = cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found.' });

    res.status(200).json({ user: { username: user.username, email: user.email } });
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
