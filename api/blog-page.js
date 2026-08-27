const { renderBlogIndex, renderBlogPost } = require('../lib/blog-render');

function sendHtml(res, status, html) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
  res.end(html);
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, HEAD');
    res.end('Method not allowed');
    return;
  }

  try {
    const slug = req.query && req.query.slug ? String(req.query.slug) : '';

    if (slug) {
      const html = renderBlogPost(slug);
      if (!html) {
        sendHtml(
          res,
          404,
          `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Post not found</title><meta name="robots" content="noindex"><link rel="canonical" href="/blog"></head><body><h1>Post not found</h1><p><a href="/blog">Back to blog</a></p></body></html>`
        );
        return;
      }
      if (req.method === 'HEAD') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end();
        return;
      }
      sendHtml(res, 200, html);
      return;
    }

    if (req.method === 'HEAD') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end();
      return;
    }
    sendHtml(res, 200, renderBlogIndex());
  } catch (err) {
    console.error('blog-page error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Unable to render blog page.');
  }
};
