// utils/mailer.js
// ── Nodemailer wrapper for all transactional emails ───────────────────
'use strict';

const nodemailer = require('nodemailer');

let _transport = null;

function getTransport() {
  if (!_transport) {
    _transport = nodemailer.createTransport({
      host:   process.env.SMTP_HOST || 'smtp.gmail.com',
      port:   parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return _transport;
}

/**
 * Send an email.
 * @param {object} opts  { to, subject, html, text }
 */
async function sendMail({ to, subject, html, text }) {
  const transport = getTransport();
  return transport.sendMail({
    from:    process.env.EMAIL_FROM || 'KrimeWatch <noreply@krimewatch.com>',
    to,
    subject,
    html,
    text: text || '',
  });
}

/**
 * Build the KrimeWatch branded HTML email (mirrors PHP getEmailMsg).
 */
function buildVerificationEmail({ name, verifyUrl, liveUrl }) {
  const logo = `${liveUrl || process.env.APP_URL}/assets/logo.png`;
  return `
<!DOCTYPE html><html><body>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr><td align="center">
    <table width="650" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding:55px 0">
          <table width="100%" border="0"><tr>
            <td style="padding:0 30px 30px">
              <a href="${liveUrl}"><img src="${logo}" width="125" height="33" alt="KrimeWatch" /></a>
            </td>
          </tr></table>
          <table width="100%"><tr>
            <td style="padding:60px 30px;border-radius:26px 26px 0 0;background:#004d00;">
              <h1 style="color:#fff;font-family:Arial,sans-serif;font-size:40px;text-align:center;">Welcome, To KrimeWatch</h1>
              <h3 style="color:#fff;font-family:Arial,sans-serif;font-size:30px;text-align:center;">Dear ${name}!</h3>
              <h3 style="color:#fff;font-family:Arial,sans-serif;font-size:30px;text-align:center;">We're glad you're here,</h3>
              <p style="color:#fff;font-family:Arial,sans-serif;font-size:16px;line-height:30px;text-align:center;">
                Thank you for starting your registration. To protect your identity, we need to verify your email address.
                Please click the link below and continue your KrimeWatch registration.
              </p>
              <table border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;">
                <tr>
                  <td style="background:#e6ffe6;padding:12px 30px;border-radius:0 22px 22px 22px;">
                    <a href="${verifyUrl}" style="color:#003300;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">CLICK HERE</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr></table>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

/**
 * Build a password reset email.
 */
function buildResetEmail({ name, resetUrl }) {
  return `
<!DOCTYPE html><html><body>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr><td align="center">
    <table width="650" border="0" cellspacing="0" cellpadding="0">
      <tr><td style="padding:55px 30px;border-radius:26px;background:#004d00;">
        <h1 style="color:#fff;font-family:Arial,sans-serif;text-align:center;">Password Reset</h1>
        <p style="color:#fff;font-family:Arial,sans-serif;font-size:16px;text-align:center;">Dear ${name},</p>
        <p style="color:#fff;font-family:Arial,sans-serif;font-size:16px;text-align:center;">
          Click the button below to reset your KrimeWatch password.
        </p>
        <table border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;">
          <tr>
            <td style="background:#e6ffe6;padding:12px 30px;border-radius:0 22px 22px 22px;">
              <a href="${resetUrl}" style="color:#003300;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">RESET PASSWORD</a>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

module.exports = { sendMail, buildVerificationEmail, buildResetEmail };
