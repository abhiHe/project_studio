// utils/helpers.js
// ── Common utility functions used across all routes ───────────────────
'use strict';

const bcrypt = require('bcryptjs');

// ── Password helpers ──────────────────────────────────────────────────

async function hashPassword(plain) {
  return bcrypt.hash(String(plain), 10);
}

async function verifyPassword(plain, hash) {
  return bcrypt.compare(String(plain), String(hash));
}

// ── Firestore document ID helpers ────────────────────────────────────

const ID = {
  subscriber:   (id) => id ? `sub_${id}`  : null,
  controlRoom:  (id) => id ? `cr_${id}`   : null,
  actionUser:   (id) => id ? `au_${id}`   : null,
  police:       (id) => id ? `pol_${id}`  : null,
  policeStation:(id) => id ? `ps_${id}`   : null,
  volunteer:    (id) => id ? `vol_${id}`  : null,
  mobileUser:   (id) => id ? `mu_${id}`   : null,
  platformUser: (id) => id ? `usr_${id}`  : null,
  device:       (id) => id ? `dev_${id}`  : null,
  payment:      (id) => id ? `pay_${id}`  : null,
  ad:           (id) => id ? `ad_${id}`   : null,
  feedback:     (id) => id ? `fb_${id}`   : null,
  news:         (id) => id ? `nf_${id}`   : null,
};

// ── Response helpers ──────────────────────────────────────────────────

function ok(res, data) {
  return res.json(Array.isArray(data) ? data : [data]);
}

function err(res, message, status = 200) {
  // PHP services return error objects inside an array with status 200
  return res.status(status).json([{ error: true, message }]);
}

function noUser(res) {
  return res.json(['NoUser']);
}

// ── Pagination helper ─────────────────────────────────────────────────

function paginate(query, { page = 1, limit = 50 } = {}) {
  const offset = (Number(page) - 1) * Number(limit);
  return query.limit(Number(limit)).offset(offset);
}

// ── Timestamp helpers ─────────────────────────────────────────────────

function nowISO() {
  return new Date().toISOString();
}

function toDate(val) {
  if (!val) return null;
  if (val && val.toDate) return val.toDate();
  return new Date(val);
}

// ── Firestore query helpers ───────────────────────────────────────────

/**
 * Convert a Firestore DocumentSnapshot to a plain object including its id.
 */
function docData(snap) {
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Convert a Firestore QuerySnapshot to an array of plain objects.
 */
function docsData(snap) {
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

module.exports = {
  hashPassword,
  verifyPassword,
  ID,
  ok,
  err,
  noUser,
  paginate,
  nowISO,
  toDate,
  docData,
  docsData,
};
