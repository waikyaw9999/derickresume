const { listPosts, getPost } = require('./blog-posts');
const {
  SITE_URL,
  SITE_NAME,
  AUTHOR_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  escapeHtml,
} = require('./site');

function formatDate(isoDate) {
  try {
    return new Date(isoDate + 'T00:00:00Z').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  } catch (_) {
    return isoDate;
  }
}

function renderTags(tags) {
  return (tags || [])
    .map(
      (tag) =>
        `<span class="tag">${escapeHtml(tag)}</span>`
    )
    .join('');
}

function layout({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  jsonLd,
  body,
  robots = 'index, follow',
  brandLabel = 'Blog',
  navLabel = 'Blog',
  brandHref = '',
}) {
  const canonical = absoluteUrl(canonicalPath);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const homeHref =
    brandHref ||
    (brandLabel === 'Showcase'
      ? '/showcase'
      : brandLabel === 'GitHub'
        ? '/github-access'
        : '/blog');
  const jsonLdBlocks = (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    .filter(Boolean)
    .map(
      (block) =>
        `<script type="application/ld+json">${JSON.stringify(block)}</script>`
    )
    .join('\n    ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="author" content="${escapeHtml(AUTHOR_NAME)}">
    <meta name="robots" content="${escapeHtml(robots)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta name="theme-color" content="#4f46e5">

    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">
    <meta property="og:type" content="${escapeHtml(ogType)}">
    <meta property="og:title" content="${escapeHtml(fullTitle)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}">

    <script>
      if (localStorage.getItem('color-theme') !== 'light') {
        document.documentElement.classList.add('dark');
      }
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = { darkMode: 'class', theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Outfit', 'sans-serif'] } } } };
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
      :root { --bg:#f8fafc; --text:#0f172a; --card:#fff; --border:#e2e8f0; --shadow:0 10px 25px -5px rgba(0,0,0,.05); }
      .dark { --bg:#0b0f19; --text:#f1f5f9; --card:#111827; --border:#1f2937; --shadow:0 10px 25px -5px rgba(0,0,0,.3); }
      body { font-family: Inter, sans-serif; background: var(--bg); color: var(--text); }
      .section-heading { font-family: Outfit, sans-serif; font-size: 2.25rem; font-weight: 800; text-align: center; margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #4f46e5 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .card { background: var(--card); border: 1px solid var(--border); border-radius: 1rem; box-shadow: var(--shadow); padding: 1.5rem; }
      .tag { display:inline-block; background: rgba(79,70,229,.06); color:#4f46e5; border:1px solid rgba(79,70,229,.12); padding:.3rem .75rem; border-radius:9999px; font-size:.8125rem; font-weight:600; margin:0 .5rem .5rem 0; }
      .dark .tag { background: rgba(165,180,252,.06); color:#a5b4fc; border-color: rgba(165,180,252,.12); }
      .blog-prose h3 { font-family: Outfit, sans-serif; font-size:1.25rem; font-weight:700; margin:1.5rem 0 .75rem; }
      .blog-prose p { margin-bottom:1rem; line-height:1.7; }
      .blog-prose ul { margin:0 0 1rem 1.25rem; list-style:disc; }
      .blog-prose li { margin-bottom:.4rem; }
      .blog-prose a { color:#4f46e5; font-weight:600; text-decoration:underline; text-underline-offset:2px; }
      .dark .blog-prose a { color:#a5b4fc; }
      .post-card { transition: transform .2s ease, box-shadow .2s ease; }
      .post-card:hover { transform: translateY(-3px); }
    </style>
    ${jsonLdBlocks}
</head>
<body class="antialiased">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-3 focus:py-2 focus:rounded">Skip to content</a>
    <header class="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="${escapeHtml(homeHref)}" class="font-display text-xl font-bold text-indigo-600 dark:text-indigo-400">JuneKo<span class="text-slate-900 dark:text-white">.online</span> ${escapeHtml(brandLabel)}</a>
        <nav class="flex flex-wrap items-center justify-end gap-3 sm:gap-4 text-sm font-medium" aria-label="${escapeHtml(navLabel)}">
          <a href="/showcase" class="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Showcase</a>
          <a href="/blog" class="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Blog</a>
          <a href="/github-access" class="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">GitHub access</a>
          <a href="/" class="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Resume access</a>
        </nav>
      </div>
    </header>
    <main id="main-content" class="mx-auto max-w-5xl px-6 py-12">
      ${body}
    </main>
    <footer class="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>&copy; ${new Date().getUTCFullYear()} ${escapeHtml(AUTHOR_NAME)}. <a class="text-indigo-600 dark:text-indigo-400 font-medium" href="/showcase">Showcase</a> · <a class="text-indigo-600 dark:text-indigo-400 font-medium" href="/blog">Mini Blog</a> · <a class="text-indigo-600 dark:text-indigo-400 font-medium" href="/github-access">GitHub access</a></p>
    </footer>
</body>
</html>`;
}

function renderBlogIndex() {
  const posts = listPosts();
  const description =
    'Notes on product building, delivery, and engineering practice from Wai Myo Kyaw.';

  const items = posts
    .map((post) => {
      const href = `/blog/${encodeURIComponent(post.slug)}`;
      return `
      <article class="card post-card mb-4">
        <a href="${href}" class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl">
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            <time datetime="${escapeHtml(post.date)}">${escapeHtml(formatDate(post.date))}</time>
          </p>
          <h2 class="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">${escapeHtml(post.title)}</h2>
          <p class="text-slate-600 dark:text-slate-400 mb-4">${escapeHtml(post.excerpt)}</p>
          <div>${renderTags(post.tags)}</div>
        </a>
      </article>`;
    })
    .join('\n');

  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${AUTHOR_NAME} Mini Blog`,
    url: absoluteUrl('/blog'),
    description,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      description: post.excerpt,
      author: { '@type': 'Person', name: AUTHOR_NAME },
    })),
  };

  const body = `
      <header class="mb-10 text-center">
        <h1 class="section-heading">Mini Blog</h1>
        <p class="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">${escapeHtml(description)}</p>
      </header>
      <div class="space-y-4">
        ${items || '<p class="text-center text-slate-500">No posts yet.</p>'}
      </div>`;

  return layout({
    title: 'Mini Blog',
    description,
    canonicalPath: '/blog',
    ogType: 'website',
    jsonLd: blogLd,
    body,
  });
}

function renderBlogPost(slug) {
  const post = getPost(slug);
  if (!post) return null;

  const canonicalPath = `/blog/${post.slug}`;
  const description = post.excerpt;
  const postLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(canonicalPath),
    url: absoluteUrl(canonicalPath),
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    image: [DEFAULT_OG_IMAGE],
    keywords: (post.tags || []).join(', '),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: post.title, item: absoluteUrl(canonicalPath) },
    ],
  };

  const body = `
      <nav class="mb-6 text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
        <ol class="flex flex-wrap gap-2">
          <li><a class="hover:text-indigo-600 dark:hover:text-indigo-400" href="/">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a class="hover:text-indigo-600 dark:hover:text-indigo-400" href="/blog">Blog</a></li>
          <li aria-hidden="true">/</li>
          <li class="text-slate-800 dark:text-slate-200" aria-current="page">${escapeHtml(post.title)}</li>
        </ol>
      </nav>
      <article class="card" itemscope itemtype="https://schema.org/BlogPosting">
        <meta itemprop="author" content="${escapeHtml(AUTHOR_NAME)}">
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">
          <time itemprop="datePublished" datetime="${escapeHtml(post.date)}">${escapeHtml(formatDate(post.date))}</time>
        </p>
        <h1 class="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4" itemprop="headline">${escapeHtml(post.title)}</h1>
        <div class="mb-6">${renderTags(post.tags)}</div>
        <div class="blog-prose text-slate-700 dark:text-slate-300" itemprop="articleBody">
          ${post.content}
        </div>
      </article>
      <p class="mt-8">
        <a href="/blog" class="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          Back to all posts
        </a>
      </p>`;

  return layout({
    title: post.title,
    description,
    canonicalPath,
    ogType: 'article',
    jsonLd: [postLd, breadcrumbLd],
    body,
  });
}

module.exports = {
  layout,
  renderBlogIndex,
  renderBlogPost,
  getPost,
  listPosts,
};
