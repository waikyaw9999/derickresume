const resumeHtml = require('../lib/resume-content');
const { verifySigned, json, readBody } = require('../lib/auth');

function getSessionToken(req, body) {
  const auth = req.headers.authorization || '';
  if (auth.toLowerCase().startsWith('bearer ')) {
    return auth.slice(7).trim();
  }
  return (body && body.sessionToken) || null;
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return json(res, 204, {});
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = req.method === 'POST' ? await readBody(req) : {};
    const sessionToken = getSessionToken(req, body);
    const payload = verifySigned(sessionToken);

    if (!payload || payload.type !== 'session') {
      return json(res, 401, { error: 'Session expired. Please sign in again.' });
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.end(resumeHtml);
  } catch (err) {
    console.error('resume error:', err);
    return json(res, 500, { error: err.message || 'Unable to load resume content.' });
  }
};
