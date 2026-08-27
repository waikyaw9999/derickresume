const { listShowcaseItems } = require('./showcase-items');
const { layout } = require('./blog-render');
const {
  SITE_URL,
  AUTHOR_NAME,
  absoluteUrl,
  escapeHtml,
} = require('./site');

function renderShowcasePage() {
  const items = listShowcaseItems();
  const description =
    'Websites and applications showcase by Wai Myo Kyaw — selected product, marketing, and platform work.';

  const cards = items
    .map((item) => {
      return `
      <article class="rounded-3xl border border-slate-200 bg-white/90 p-4 transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-950/75" itemscope itemtype="https://schema.org/CreativeWork">
        <div class="mb-4 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 h-52 bg-slate-100 dark:bg-slate-900">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt || item.title)}" class="h-full w-full object-cover" itemprop="image" width="640" height="360" loading="lazy">
        </div>
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">${escapeHtml(item.type || 'Project')}</p>
        <h2 class="font-semibold text-indigo-600 dark:text-indigo-400 mb-2 text-lg" itemprop="name">${escapeHtml(item.title)}</h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-4" itemprop="description">${escapeHtml(item.description)}</p>
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700" itemprop="url">
          Open project
        </a>
        <meta itemprop="author" content="${escapeHtml(AUTHOR_NAME)}">
      </article>`;
    })
    .join('\n');

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Websites and Applications Showcase',
    url: absoluteUrl('/showcase'),
    description,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.url,
        name: item.title,
        description: item.description,
      })),
    },
  };

  const body = `
      <header class="mb-10 text-center">
        <h1 class="section-heading">Websites &amp; Applications Showcase</h1>
        <p class="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">${escapeHtml(description)}</p>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${cards}
      </div>
      <p class="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
        Looking for career details?
        <a href="/" class="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Request resume access</a>
        or read the
        <a href="/blog" class="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">mini blog</a>.
      </p>`;

  return layout({
    title: 'Websites & Applications Showcase',
    description,
    canonicalPath: '/showcase',
    ogType: 'website',
    jsonLd: collectionLd,
    body,
    brandLabel: 'Showcase',
    navLabel: 'Showcase',
  });
}

module.exports = {
  renderShowcasePage,
};
