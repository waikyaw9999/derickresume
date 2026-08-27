const { listPosts } = require('../lib/blog-posts');
const { absoluteUrl } = require('../lib/site');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.end('Method not allowed');
    return;
  }

  const posts = listPosts();
  const lastmod = posts[0] ? posts[0].date : new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const urls = [
    { loc: absoluteUrl('/showcase'), lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { loc: absoluteUrl('/blog'), lastmod, changefreq: 'weekly', priority: '0.9' },
    { loc: absoluteUrl('/github-access'), lastmod: today, changefreq: 'monthly', priority: '0.6' },
    ...posts.map((post) => ({
      loc: absoluteUrl(`/blog/${post.slug}`),
      lastmod: post.date,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  res.end(xml);
};
