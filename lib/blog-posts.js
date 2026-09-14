/**
 * Mini blog posts. Content is HTML (safe static author content).
 * Add new posts at the top of the array.
 */
const posts = [
  {
    slug: 'booka-hotel-booking',
    title: 'Booka — Hotel Booking with Live Inventory & Concierge AI',
    date: '2026-09-14',
    tags: ['Product', 'Hospitality', 'SaaS', 'Booka'],
    excerpt:
      'Booka is a hotel booking experience for calm property discovery, live availability, secure checkout, and on-page concierge help powered by live property data.',
    content: `
      <p><strong>Live demo:</strong> <a href="https://booka.juneko.online" target="_blank" rel="noreferrer">https://booka.juneko.online</a></p>
      <p><em>Stays that feel settled the moment you arrive.</em> Browse calm properties, check live availability, and book without the noise.</p>
      <p>Booka is a hospitality booking product focused on clear discovery and a quiet guest path: featured stays, transparent rates, clear cancellation policies, and secure checkout — with concierge help available on every page.</p>

      <h3>What guests get</h3>
      <ul>
        <li><strong>Property discovery</strong> — handpicked stays with transparent rates</li>
        <li><strong>Live inventory</strong> — availability that reflects real inventory</li>
        <li><strong>Secure checkout</strong> — book without the usual booking-site clutter</li>
        <li><strong>Concierge AI</strong> — ask about amenities, rates, policies, room types, or availability using live data across properties</li>
      </ul>

      <h3>Guest + staff surfaces</h3>
      <ul>
        <li><strong>Stays</strong> — public browse and book experience</li>
        <li><strong>Staff</strong> — dedicated staff portal for operations</li>
      </ul>

      <h3>Featured example</h3>
      <p><strong>Booka Grand Hotel</strong> (Yangon, Myanmar) — a luxury hotel demo property with modern amenities and exceptional service, used to showcase the booking and concierge flows.</p>

      <h3>Try it</h3>
      <p>Open <a href="https://booka.juneko.online" target="_blank" rel="noreferrer">booka.juneko.online</a>, explore stays, or use the on-page Concierge to ask about amenities and availability.</p>
      <p><strong>Contact:</strong> <a href="mailto:waikyaw9999@gmail.com">waikyaw9999@gmail.com</a></p>
    `,
  },
  {
    slug: 'mydbtool-database-workbench',
    title: 'MyDBTool — Multi-Engine Database Workbench (Web + Electron)',
    date: '2026-09-14',
    tags: ['Product', 'Developer Tools', 'Desktop', 'MyDBTool'],
    excerpt:
      'A desktop-feel workbench for MongoDB, PostgreSQL, MySQL, and SQL Server: browse schemas, preview rows, run queries, and manage objects — as a web app or Electron desktop shell.',
    content: `
      <p><strong>Repo:</strong> <a href="https://github.com/waikyaw9999/mydbtool" target="_blank" rel="noreferrer">github.com/waikyaw9999/mydbtool</a></p>
      <p><strong>mydbtool</strong> is a practical MVP inspired by DBeaver — a workbench for engineers to manage MongoDB, PostgreSQL, MySQL, and Microsoft SQL Server connections. Browse schemas or collections, preview rows, and run SQL or Mongo find/aggregate queries.</p>
      <p>SSH tunnels, ER diagrams, import/export wizards, and multi-user cloud sync are intentionally out of scope.</p>

      <h3>Why I built it</h3>
      <p>I wanted a focused local tool for day-to-day database work: save encrypted connections, explore the object tree, preview data, run capped queries, and do basic DDL without leaving one UI — available both in the browser and as a packaged desktop app.</p>

      <h3>Stack</h3>
      <ul>
        <li><strong>App:</strong> Next.js App Router + React (TypeScript)</li>
        <li><strong>Desktop:</strong> Electron shell hosting the Next.js Node server (no static export)</li>
        <li><strong>Drivers:</strong> <code>pg</code>, <code>mysql2</code>, <code>mssql</code> (tedious), <code>mongodb</code></li>
        <li><strong>Security:</strong> AES-256-GCM password encryption, short-lived per-request DB connections, Electron <code>contextIsolation</code> / no <code>nodeIntegration</code></li>
        <li><strong>Local ops:</strong> optional Docker Compose stack for demo engines</li>
      </ul>

      <h3>Highlights</h3>
      <ul>
        <li>Four engines in one workbench (Postgres, MySQL, SQL Server, MongoDB)</li>
        <li>Object tree with create / rename / drop for databases, tables, columns, and collections</li>
        <li>Row preview (first 100, load more) with types when the engine provides them</li>
        <li>SQL editor and Mongo find/aggregate tabs; results capped (default 100, max 500)</li>
        <li>Per-connection <strong>read-only</strong> mode; destructive actions require explicit confirm</li>
        <li>Dark / light theme (follows system preference on first visit)</li>
        <li>Electron packaging for macOS / Windows / Linux installers</li>
      </ul>

      <h3>Run it</h3>
      <p><strong>Browser:</strong></p>
      <ul>
        <li><code>npm install</code></li>
        <li><code>cp .env.example .env.local</code> (set <code>CONNECTIONS_SECRET</code>)</li>
        <li><code>npm run dev</code> → <a href="http://localhost:3000" target="_blank" rel="noreferrer">http://localhost:3000</a></li>
      </ul>
      <p><strong>Desktop:</strong> <code>npm run electron:dev</code> (or <code>electron:build</code> for installers).</p>

      <h3>Safety note</h3>
      <p>Treat this as a <strong>local / trusted-network</strong> tool. The desktop build binds the Next.js server to <code>127.0.0.1</code> only. Do not expose it to the public internet without additional authentication in front.</p>
      <p><strong>Contact:</strong> <a href="mailto:waikyaw9999@gmail.com">waikyaw9999@gmail.com</a></p>
    `,
  },
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
