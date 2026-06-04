import { setSecurityHeaders } from '../_lib/helpers.js';

export default function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
  res.status(200).json({ message: 'Logged out successfully.' });
}
