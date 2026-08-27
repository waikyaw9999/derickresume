const { listShowcaseItems } = require('../lib/showcase-items');
const { json } = require('../lib/auth');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return json(res, 204, {});
  }

  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    return json(res, 200, { ok: true, items: listShowcaseItems() });
  } catch (err) {
    console.error('showcase error:', err);
    return json(res, 500, { error: err.message || 'Unable to load showcase.' });
  }
};
