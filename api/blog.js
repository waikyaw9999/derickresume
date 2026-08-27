const { listPosts, getPost } = require('../lib/blog-posts');
const { json, readBody } = require('../lib/auth');

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
    const slug =
      (req.query && req.query.slug) ||
      (body && body.slug) ||
      null;

    if (slug) {
      const post = getPost(String(slug));
      if (!post) {
        return json(res, 404, { error: 'Post not found.' });
      }
      return json(res, 200, { ok: true, post });
    }

    return json(res, 200, { ok: true, posts: listPosts() });
  } catch (err) {
    console.error('blog error:', err);
    return json(res, 500, { error: err.message || 'Unable to load blog.' });
  }
};
