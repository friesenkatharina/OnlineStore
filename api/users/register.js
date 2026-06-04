import bcrypt from 'bcrypt';
import { connectDB } from '../_lib/db.js';
import { User } from '../_lib/User.js';
import { setSecurityHeaders, validateRegisterInput } from '../_lib/helpers.js';

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, username, password } = req.body;

  const validationError = validateRegisterInput({ email, username, password });
  if (validationError) return res.status(422).json({ message: validationError });

  try {
    await connectDB();

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: 'Email or username already taken.' });

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, username, password: hashedPassword });

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
