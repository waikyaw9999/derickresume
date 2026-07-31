const {
  SESSION_TTL_MS,
  sign,
  verifySigned,
  hashOtp,
  normalizeEmail,
  isValidEmail,
  json,
  readBody,
} = require('../lib/auth');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return json(res, 204, {});
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await readBody(req);
    const email = normalizeEmail(body.email);
    const otp = String(body.otp || '').trim();
    const challenge = body.challenge;

    if (!isValidEmail(email)) {
      return json(res, 400, { error: 'Please enter a valid email address.' });
    }

    if (!/^\d{6}$/.test(otp)) {
      return json(res, 400, { error: 'Enter the 6-digit code from your email.' });
    }

    const payload = verifySigned(challenge);
    if (!payload || payload.type !== 'otp_challenge') {
      return json(res, 401, { error: 'Code expired or invalid. Please request a new one.' });
    }

    if (payload.email !== email) {
      return json(res, 401, { error: 'Email does not match this verification request.' });
    }

    if (payload.otpHash !== hashOtp(otp)) {
      return json(res, 401, { error: 'Incorrect verification code.' });
    }

    const sessionToken = sign({
      type: 'session',
      email,
      exp: Date.now() + SESSION_TTL_MS,
    });

    return json(res, 200, {
      ok: true,
      sessionToken,
      email,
      expiresIn: SESSION_TTL_MS,
      message: 'Access granted.',
    });
  } catch (err) {
    console.error('verify-otp error:', err);
    return json(res, 500, { error: err.message || 'Unable to verify code.' });
  }
};
