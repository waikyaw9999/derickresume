const { Resend } = require('resend');
const {
  OTP_TTL_MS,
  sign,
  hashOtp,
  generateOtp,
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

    if (!isValidEmail(email)) {
      return json(res, 400, { error: 'Please enter a valid email address.' });
    }

    if (!process.env.RESEND_API_KEY) {
      return json(res, 500, { error: 'Email delivery is not configured (RESEND_API_KEY).' });
    }

    const otp = generateOtp();
    const expiresAt = Date.now() + OTP_TTL_MS;
    const challenge = sign({
      type: 'otp_challenge',
      email,
      otpHash: hashOtp(otp),
      exp: expiresAt,
    });

    const fromEmail = process.env.OTP_FROM_EMAIL || 'onboarding@resend.dev';
    const fromName = process.env.OTP_FROM_NAME || 'JuneKo Portfolio';
    const minutes = Math.round(OTP_TTL_MS / 60000);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [email],
      subject: `${otp} is your access code`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #0f172a;">
          <h2 style="margin: 0 0 12px; font-size: 20px;">Resume access code</h2>
          <p style="margin: 0 0 16px; color: #475569;">Use this one-time code to view Wai Myo Kyaw's portfolio. It expires in ${minutes} minutes.</p>
          <p style="margin: 0 0 20px; font-size: 32px; letter-spacing: 8px; font-weight: 700; color: #4f46e5;">${otp}</p>
          <p style="margin: 0; font-size: 13px; color: #94a3b8;">If you did not request this, you can ignore this email.</p>
        </div>
      `,
      text: `Your resume access code is ${otp}. It expires in ${minutes} minutes.`,
    });

    if (error) {
      console.error('Resend error:', error);
      return json(res, 502, { error: 'Failed to send verification email. Please try again.' });
    }

    return json(res, 200, {
      ok: true,
      challenge,
      expiresIn: OTP_TTL_MS,
      message: 'Verification code sent. Check your inbox.',
    });
  } catch (err) {
    console.error('send-otp error:', err);
    return json(res, 500, { error: err.message || 'Unable to send verification code.' });
  }
};
