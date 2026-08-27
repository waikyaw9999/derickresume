const SITE_URL = (process.env.SITE_URL || 'https://juneko.online').replace(/\/$/, '');
const SITE_NAME = 'JuneKo.online';
const AUTHOR_NAME = 'Wai Myo Kyaw';
const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop';

function absoluteUrl(pathname) {
  if (!pathname) return SITE_URL;
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return SITE_URL + (pathname.startsWith('/') ? pathname : '/' + pathname);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = {
  SITE_URL,
  SITE_NAME,
  AUTHOR_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  escapeHtml,
};
