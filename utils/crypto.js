// utils/crypto.js
// ── Email / field encryption helpers (mirrors PHP encryptedstatic / dencryptedstatic)
'use strict';

const crypto = require('crypto');

const ALGO  = 'aes-256-cbc';
const KEY   = Buffer.from((process.env.ENCRYPT_KEY || '').padEnd(32, '0').slice(0, 32));
const IV    = Buffer.from((process.env.ENCRYPT_IV  || '').padEnd(16, '0').slice(0, 16));

/**
 * Encrypt a plain-text value (mirrors PHP encryptedstatic).
 * Returns a hex string so it can be stored / compared in Firestore.
 */
function encryptedStatic(plain) {
  if (!plain) return '';
  try {
    const cipher = crypto.createCipheriv(ALGO, KEY, IV);
    return cipher.update(String(plain), 'utf8', 'hex') + cipher.final('hex');
  } catch {
    return String(plain);
  }
}

/**
 * Decrypt back to plain text (mirrors PHP dencryptedstatic).
 */
function decryptedStatic(hex) {
  if (!hex) return '';
  try {
    const decipher = crypto.createDecipheriv(ALGO, KEY, IV);
    return decipher.update(String(hex), 'hex', 'utf8') + decipher.final('utf8');
  } catch {
    return String(hex);
  }
}

/**
 * Generate a random alphanumeric session token (mirrors PHP randomString).
 */
function randomString(length = 30) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

/**
 * MD5 of a random uniqid (mirrors PHP md5(uniqid('',true))).
 */
function randomKey() {
  return crypto.createHash('md5').update(crypto.randomUUID()).digest('hex');
}

/**
 * SHA-512 hash (mirrors PHP hash('sha512', ...)).
 */
function sha512(str) {
  return crypto.createHash('sha512').update(str).digest('hex');
}

module.exports = { encryptedStatic, decryptedStatic, randomString, randomKey, sha512 };
