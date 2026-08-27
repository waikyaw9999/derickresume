/**
 * Mini blog posts. Content is HTML (safe static author content).
 * Add new posts at the top of the array.
 */
const posts = [
  {
    slug: 'building-exacta-time-tracking',
    title: 'Building Exacta: Time Tracking & Billing',
    date: '2026-07-15',
    tags: ['Product', 'Full Stack', 'SaaS'],
    excerpt:
      'How I approached Exacta — a time tracking and billing web app focused on clean workflows for projects, hours, and invoicing.',
    content: `
      <p>Exacta started as a practical need: track billable work without fighting a bloated timesheet UI. The goal was a fast loop from logging hours to generating invoices.</p>
      <h3>What mattered</h3>
      <ul>
        <li>Simple project and client hierarchy</li>
        <li>Quick time entry with clear billable vs non-billable states</li>
        <li>Billing summaries that finance stakeholders can trust</li>
      </ul>
      <h3>Stack notes</h3>
      <p>I kept the product surface intentionally small — one clear job per screen — and deployed it under <a href="https://exacta.juneko.online/" target="_blank" rel="noreferrer">exacta.juneko.online</a>.</p>
      <p>The bigger lesson: shipping a focused internal tool often beats waiting for a perfect enterprise suite.</p>
    `,
  },
  {
    slug: 'otp-gated-portfolio-on-vercel',
    title: 'OTP-Gated Portfolio on a Static Vercel Site',
    date: '2026-07-31',
    tags: ['Security', 'Vercel', 'Serverless'],
    excerpt:
      'A lightweight access gate for a resume site: email OTP, signed sessions, and resume HTML served only after verification.',
    content: `
      <p>Public portfolios are great for discovery — until you want privacy for detailed experience, contacts, and private project notes.</p>
      <h3>Approach</h3>
      <ul>
        <li>Generate OTP server-side and email it with Resend</li>
        <li>Sign a short-lived challenge, then a longer session token</li>
        <li>Keep resume HTML behind an authenticated API (not in public source)</li>
      </ul>
      <h3>Trade-offs</h3>
      <p>This is friction by design. Visitors prove email ownership before content loads. It is not enterprise IAM, but it is a solid fit for a personal portfolio that should stay invite-style.</p>
    `,
  },
  {
    slug: 'leading-delivery-across-regions',
    title: 'Leading Delivery Across Singapore, Thailand & Myanmar',
    date: '2026-06-02',
    tags: ['Leadership', 'Delivery', 'Career'],
    excerpt:
      'Notes from years of shipping enterprise web and mobile work across multicultural teams and time zones.',
    content: `
      <p>Working across Singapore, Thailand, and Myanmar taught me that delivery quality is mostly communication quality.</p>
      <h3>Patterns that hold up</h3>
      <ul>
        <li>Write decisions down early — async teams need artifacts, not hallway memory</li>
        <li>Separate exploration from commitment so stakeholders see progress without false certainty</li>
        <li>Protect engineers from thrash by batching feedback into clear milestones</li>
      </ul>
      <p>Technical architecture matters, but so does the operating rhythm around it. The best systems still fail when ownership and expectations are fuzzy.</p>
    `,
  },
];

function summarize(post) {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags || [],
    excerpt: post.excerpt,
  };
}

function listPosts() {
  return posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(summarize);
}

function getPost(slug) {
  const post = posts.find((item) => item.slug === slug);
  if (!post) return null;
  return {
    ...summarize(post),
    content: post.content.trim(),
  };
}

module.exports = {
  listPosts,
  getPost,
};
