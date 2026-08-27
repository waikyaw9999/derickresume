/**
 * Mini blog posts. Content is HTML (safe static author content).
 * Add new posts at the top of the array.
 */
const posts = [
  {
    slug: 'exacta-time-tracking-billing',
    title: 'Exacta — Time Tracking & Billing for Law Firms and Consultants',
    date: '2026-08-27',
    tags: ['Product', 'SaaS', 'Full Stack', 'Exacta'],
    excerpt:
      'Exacta keeps a persistent timer on screen so billable work isn’t lost, shows unbilled revenue in real time, and lets firms ask natural-language questions over their own time data (Ask Exacta).',
    content: `
      <p><strong>Live demo:</strong> <a href="https://exacta.juneko.online" target="_blank" rel="noreferrer">https://exacta.juneko.online</a></p>
      <p>Exacta keeps a persistent timer on screen so billable work isn’t lost, shows unbilled revenue in real time, and lets firms ask natural-language questions over their own time data (Ask Exacta).</p>
      <p><strong>Pricing:</strong> Exacta Pro — $29 / user / month, 14-day free trial.</p>

      <h3>Why I built it</h3>
      <p>Full-stack SaaS product (not a tutorial): multi-tenant organizations, JWT auth, Stripe subscriptions, Dockerized deploy, and CI/CD to a VPS — end-to-end product engineering.</p>

      <h3>Stack</h3>
      <ul>
        <li><strong>Backend:</strong> Java 17, Spring Boot 3, Spring Security, JPA, Flyway</li>
        <li><strong>Frontend:</strong> React 18, TypeScript, Vite, Tailwind, Zustand, TanStack Query</li>
        <li><strong>Data:</strong> PostgreSQL 16</li>
        <li><strong>Billing:</strong> Stripe Checkout + signed webhooks</li>
        <li><strong>AI:</strong> org-scoped retrieval + OpenAI-compatible LLM (e.g. Groq)</li>
        <li><strong>Ops:</strong> Docker Compose, GitHub Actions → Docker Hub → VPS</li>
      </ul>

      <h3>Highlights</h3>
      <p>Multi-tenant firms (OWNER / ADMIN / MEMBER) · floating timer · clients → projects → tasks · dashboard analytics · team seats · Stripe billing · Ask Exacta (firm-scoped RAG) · tenant isolation (cross-tenant → 404; expired access → 402)</p>

      <h3>Try the demo</h3>
      <p>Open <a href="https://exacta.juneko.online" target="_blank" rel="noreferrer">https://exacta.juneko.online</a> and sign in:</p>
      <div style="overflow-x:auto;">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Owner</td>
              <td><code>ada@exacta.test</code></td>
              <td><code>ExactaDemo1!</code></td>
            </tr>
            <tr>
              <td>Member</td>
              <td><code>marcus@exacta.test</code></td>
              <td><code>ExactaDemo1!</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Stripe Checkout is in test mode (card <code>4242 4242 4242 4242</code>).</p>
      <p><strong>Contact:</strong> <a href="mailto:waikyaw9999@gmail.com">waikyaw9999@gmail.com</a></p>
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
