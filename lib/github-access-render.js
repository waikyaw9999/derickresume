const { layout } = require('./blog-render');
const { escapeHtml } = require('./site');

function renderGithubAccessPage() {
  const description =
    'Request access to Wai Myo Kyaw’s private GitHub repositories. No resume OTP required.';

  const body = `
      <header class="mb-8 text-center">
        <h1 class="section-heading">Request GitHub Access</h1>
        <p class="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">${escapeHtml(description)}</p>
      </header>

      <div class="card max-w-xl mx-auto">
        <form id="github-access-form" class="space-y-4" novalidate>
          <div>
            <label for="github-email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your email</label>
            <input id="github-email" name="email" type="email" autocomplete="email" required placeholder="you@company.com" class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3 text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
          </div>
          <div>
            <label for="github-username" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">GitHub username</label>
            <input id="github-username" name="githubUsername" type="text" autocomplete="username" maxlength="39" required placeholder="your-github-username" class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3 text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
          </div>
          <div>
            <label for="github-repo-hint" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Repository or project <span class="font-normal text-slate-400">(optional)</span></label>
            <input id="github-repo-hint" name="repoHint" type="text" maxlength="200" placeholder="e.g. exacta, portfolio API, private monorepo" class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3 text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
          </div>
          <div>
            <label for="github-message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Why do you need access? <span class="font-normal text-slate-400">(optional)</span></label>
            <textarea id="github-message" name="message" rows="4" maxlength="1000" placeholder="Brief context for the request" class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3 text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-y"></textarea>
          </div>
          <button id="github-access-submit" type="submit" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            <i class="fa-solid fa-lock-open text-sm"></i>
            <span>Submit access request</span>
          </button>
          <p id="github-access-message" class="text-sm min-h-[1.25rem] text-center" role="status"></p>
        </form>
      </div>

      <p class="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Also explore the
        <a href="/showcase" class="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">showcase</a>
        and
        <a href="/blog" class="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">mini blog</a>,
        or
        <a href="/" class="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">request resume access</a>.
      </p>

      <script>
        (function () {
          var form = document.getElementById('github-access-form');
          var submitBtn = document.getElementById('github-access-submit');
          var messageEl = document.getElementById('github-access-message');
          if (!form || !submitBtn || !messageEl) return;

          function setMessage(text, type) {
            messageEl.textContent = text || '';
            messageEl.className = 'text-sm min-h-[1.25rem] text-center';
            if (type === 'error') messageEl.className += ' text-red-600 dark:text-red-400';
            if (type === 'success') messageEl.className += ' text-emerald-600 dark:text-emerald-400';
          }

          function setLoading(loading) {
            submitBtn.disabled = loading;
            if (loading) {
              submitBtn.dataset.idle = submitBtn.innerHTML;
              submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Sending...</span>';
            } else {
              submitBtn.innerHTML = submitBtn.dataset.idle || '<i class="fa-solid fa-lock-open text-sm"></i><span>Submit access request</span>';
            }
          }

          form.addEventListener('submit', async function (event) {
            event.preventDefault();
            var email = (document.getElementById('github-email').value || '').trim();
            var githubUsername = (document.getElementById('github-username').value || '').trim().replace(/^@/, '');
            var repoHint = (document.getElementById('github-repo-hint').value || '').trim();
            var message = (document.getElementById('github-message').value || '').trim();

            if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
              setMessage('Please enter a valid email address.', 'error');
              return;
            }
            if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(githubUsername)) {
              setMessage('Enter a valid GitHub username.', 'error');
              return;
            }

            setLoading(true);
            setMessage('');
            try {
              var res = await fetch('/api/request-github-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, githubUsername: githubUsername, repoHint: repoHint, message: message }),
              });
              var data = await res.json().catch(function () { return {}; });
              if (!res.ok) throw new Error(data.error || 'Failed to submit request.');
              form.reset();
              setMessage(data.message || 'Request sent successfully.', 'success');
            } catch (err) {
              setMessage(err.message || 'Unable to submit request.', 'error');
            } finally {
              setLoading(false);
            }
          });
        })();
      </script>`;

  return layout({
    title: 'Request GitHub Access',
    description,
    canonicalPath: '/github-access',
    ogType: 'website',
    brandLabel: 'GitHub',
    navLabel: 'GitHub access',
    robots: 'index, follow',
    body,
  });
}

module.exports = {
  renderGithubAccessPage,
};
