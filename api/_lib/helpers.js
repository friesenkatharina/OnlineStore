export function parseCookies(req) {
  const list = {};
  const header = req.headers.cookie;
  if (!header) return list;
  header.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.split('=');
    list[name.trim()] = decodeURIComponent(rest.join('=').trim());
  });
  return list;
}

export function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}

export function validateRegisterInput({ email, username, password }) {
  if (!email || !username || !password) return 'Email, username and password are required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format.';
  if (username.length < 3) return 'Username must be at least 3 characters.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/\d/.test(password)) return 'Password must contain at least one number.';
  return null;
}
