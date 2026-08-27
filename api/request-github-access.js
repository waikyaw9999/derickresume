const { Resend } = require('resend');
const {
  normalizeEmail,
  isValidEmail,
  json,
  readBody,
} = require('../lib/auth');

function normalizeGithubUsername(value) {
  return String(value || '').trim().replace(/^@/, '');
}

function isValidGithubUsername(username) {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return json(res, 204, {});
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await readBody(req);
    const email = normalizeEmail(body.email);
    const githubUsername = normalizeGithubUsername(body.githubUsername);
    const message = String(body.message || '').trim().slice(0, 1000);
    const repoHint = String(body.repoHint || '').trim().slice(0, 200);

    if (!isValidEmail(email)) {
      return json(res, 400, { error: 'Please enter a valid email address.' });
    }

    if (githubUsername && !isValidGithubUsername(githubUsername)) {
      return json(res, 400, {
        error: 'Enter a valid GitHub username (letters, numbers, and hyphens only), or leave it blank.',
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return json(res, 500, { error: 'Email delivery is not configured (RESEND_API_KEY).' });
    }

    const notifyEmail = process.env.GITHUB_ACCESS_NOTIFY_EMAIL || 'waikyaw9999@gmail.com';
    const fromEmail = process.env.OTP_FROM_EMAIL || 'onboarding@resend.dev';
    const fromName = process.env.OTP_FROM_NAME || 'JuneKo Portfolio';
    const profileUrl = githubUsername ? `https://github.com/${githubUsername}` : '';
    const usernameLabel = githubUsername ? `@${githubUsername}` : 'not provided';
    const subject = githubUsername
      ? `GitHub access request from @${githubUsername}`
      : `GitHub access request from ${email}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [notifyEmail],
      replyTo: email,
      subject,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0f172a;">
          <h2 style="margin: 0 0 12px; font-size: 20px;">GitHub repository access request</h2>
          <p style="margin: 0 0 16px; color: #475569;">Someone requested GitHub access from your public portfolio form.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 140px;">Visitor email</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">GitHub username</td>
              <td style="padding: 8px 0;">${
                githubUsername
                  ? `<a href="${escapeHtml(profileUrl)}">${escapeHtml(usernameLabel)}</a>`
                  : 'Not provided'
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Repo / focus</td>
              <td style="padding: 8px 0;">${escapeHtml(repoHint || 'Not specified')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(message || 'No message provided')}</td>
            </tr>
          </table>
          <p style="margin: 20px 0 0; font-size: 13px; color: #94a3b8;">Reply to this email to contact the requester directly.</p>
        </div>
      `,
      text: [
        'GitHub repository access request',
        `Visitor email: ${email}`,
        `GitHub username: ${githubUsername ? `${usernameLabel} (${profileUrl})` : 'Not provided'}`,
        `Repo / focus: ${repoHint || 'Not specified'}`,
        `Message: ${message || 'No message provided'}`,
      ].join('\n'),
    });

    if (error) {
      console.error('Resend error:', error);
      return json(res, 502, { error: 'Failed to send access request. Please try again.' });
    }

    return json(res, 200, {
      ok: true,
      message: 'Request sent. You will be contacted once access is reviewed.',
    });
  } catch (err) {
    console.error('request-github-access error:', err);
    return json(res, 500, { error: err.message || 'Unable to submit GitHub access request.' });
  }
};
