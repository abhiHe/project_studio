// middleware/auth.js
// ── JWT authentication middleware ────────────────────────────────────
'use strict';

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'kw_default_secret';

/**
 * requireAuth — verifies Bearer JWT from Authorization header.
 * Attaches decoded payload to req.user.
 */
function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json([{ error: true, message: 'Unauthorized: no token' }]);
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    return res.status(401).json([{ error: true, message: 'Unauthorized: invalid token' }]);
  }
}

/**
 * optionalAuth — like requireAuth but doesn't block when token is absent.
 */
function optionalAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (token) {
    try { req.user = jwt.verify(token, SECRET); } catch {}
  }
  next();
}

/**
 * Issue a signed JWT for a user.
 * @param {object} payload  Any serialisable object.
 * @returns {string}        Signed JWT string.
 */
function signToken(payload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

/**
 * requireRole — factory that returns a middleware enforcing a role list.
 * @param {string[]} roles
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json([{ error: true, message: 'Unauthorized' }]);
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json([{ error: true, message: 'Forbidden' }]);
    }
    next();
  };
}

module.exports = { requireAuth, optionalAuth, signToken, requireRole };
