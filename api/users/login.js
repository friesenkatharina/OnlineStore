import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '../_lib/db.js';
import { User } from '../_lib/User.js';
import { setSecurityHeaders } from '../_lib/helpers.js';

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(422).json({ message: 'Email and password are required.' });

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const isProd = process.env.NODE_ENV === 'production';
    res.setHeader('Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${isProd ? '; Secure' : ''}`
    );

    res.status(200).json({ message: 'Login successful.', user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}
