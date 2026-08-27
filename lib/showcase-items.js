/**
 * Public websites & applications showcase items.
 * Add new work at the top of the array.
 */
const items = [
  {
    slug: 'exacta',
    title: 'Exacta',
    type: 'Application',
    description: 'Time tracking and billing web app for projects, hours, and invoicing.',
    url: 'https://exacta.juneko.online/',
    image: '/exacta.png',
    imageAlt: 'Exacta preview',
  },
  {
    slug: 'soneva',
    title: 'Soneva',
    type: 'Website',
    description: 'Luxury resort website experience and online presence.',
    url: 'https://soneva.com',
    image: '/soneva.png',
    imageAlt: 'Soneva preview',
  },
  {
    slug: 'emesco-specialty-foods',
    title: 'Emesco Specialty Foods',
    type: 'Website',
    description: 'Food and specialty products website with e-commerce readiness.',
    url: 'http://emescospecialtyfoods.com/',
    image: '/emesco.png',
    imageAlt: 'Emesco Specialty Foods preview',
  },
  {
    slug: 'es-landing-3',
    title: 'ES Landing 3',
    type: 'Website',
    description: 'Modern landing page and promotional web experience.',
    url: 'https://eslanding-three.vercel.app/',
    image: '/eslanding.png',
    imageAlt: 'ES Landing 3 preview',
  },
  {
    slug: 'psat-beta',
    title: 'PSAT Beta',
    type: 'Application',
    description: 'Beta web platform showcasing product and user onboarding flows.',
    url: 'https://psat-beta.vercel.app/',
    image: '/psat.png',
    imageAlt: 'PSAT Beta preview',
  },
  {
    slug: 'soma-one-theta',
    title: 'Soma One Theta',
    type: 'Website',
    description: 'Single-page product showcase and immersive web experience.',
    url: 'https://soma-one-theta.vercel.app/',
    image: '/soma-health.png',
    imageAlt: 'Soma One Theta preview',
  },
  {
    slug: 'hotel-elegance',
    title: 'Hotel Elegance',
    type: 'Website',
    description: 'Elegant hospitality landing page and booking-focused presentation.',
    url: 'https://hotel-elegance-two.vercel.app/',
    image: '/elegance.png',
    imageAlt: 'Hotel Elegance preview',
  },
  {
    slug: 'jump-summer-program',
    title: 'Jump Summer Program',
    type: 'Website',
    description: 'Educational program landing page and campaign microsite.',
    url: 'https://jumpfoundation.org/lp-2026-summer-programs/',
    image: '/jumpsummer.png',
    imageAlt: 'Jump Summer Program preview',
  },
];

function listShowcaseItems() {
  return items.slice();
}

module.exports = {
  listShowcaseItems,
};
