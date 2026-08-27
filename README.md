# Mini Blog — Adding Posts

Public blog posts live in one file and are served at crawlable URLs:

- Index: `/blog`
- Post: `/blog/<slug>`

## Where to edit

Open:

```text
lib/blog-posts.js
```

Add a new object at the **top** of the `posts` array (newest first is easiest to maintain). Posts are sorted by `date` descending when rendered, so the newest date appears first either way.

## Post fields

| Field | Required | Description |
| --- | --- | --- |
| `slug` | Yes | URL segment. Use lowercase letters, numbers, and hyphens only (e.g. `my-new-post`). Becomes `/blog/my-new-post`. |
| `title` | Yes | Post title shown on the list and detail page. |
| `date` | Yes | Publish date as `YYYY-MM-DD` (used for sorting, `<time>`, sitemap `lastmod`). |
| `tags` | No | Array of short labels (e.g. `['Product', 'Vercel']`). |
| `excerpt` | Yes | One or two sentences for the list card, meta description, and social previews. |
| `content` | Yes | HTML body of the post (see allowed markup below). |

## Example

```js
{
  slug: 'shipping-faster-with-small-scopes',
  title: 'Shipping Faster With Small Scopes',
  date: '2026-08-27',
  tags: ['Delivery', 'Product'],
  excerpt:
    'Why keeping each release tiny usually beats waiting for a perfect milestone.',
  content: `
    <p>Start with the smallest useful slice users can touch.</p>
    <h3>What helps</h3>
    <ul>
      <li>Clear acceptance criteria</li>
      <li>One owner for the release</li>
      <li>A rollback path before you ship</li>
    </ul>
    <p>Read more about related work on
      <a href="https://exacta.juneko.online/" target="_blank" rel="noreferrer">Exacta</a>.
    </p>
  `,
},
```

## Content HTML tips

Use simple semantic HTML inside `content`:

- `<p>` for paragraphs
- `<h3>` for subheadings (the page already has an `<h1>` title)
- `<ul>` / `<li>` for lists
- `<a href="..." target="_blank" rel="noreferrer">` for external links
- `<strong>` / `<em>` for emphasis

Avoid:

- Markdown (it is not converted automatically)
- Script tags or untrusted HTML
- Backticks `` ` `` inside the template string without escaping (the file uses JS template literals)

## After you add a post

1. Save `lib/blog-posts.js`.
2. Deploy (or run locally with `npx vercel dev`).
3. Check:
   - `/blog` — post appears in the list
   - `/blog/your-slug` — full article loads
   - `/sitemap.xml` — new URL is included automatically

No sitemap or route file edits are needed for a normal new post.

## Optional site URL

Canonical links and the sitemap use:

```text
SITE_URL=https://juneko.online
```

Set this in Vercel environment variables (see `.env.example`) if your production domain differs.
