const { verifySigned, json, readBody } = require('../lib/auth');

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
    const payload = verifySigned(body.sessionToken);

    if (!payload || payload.type !== 'session') {
      return json(res, 401, { ok: false, error: 'Session expired. Please sign in again.' });
    }

    return json(res, 200, {
      ok: true,
      email: payload.email,
      exp: payload.exp,
    });
  } catch (err) {
    console.error('check-session error:', err);
    return json(res, 500, { error: err.message || 'Unable to validate session.' });
  }
};
