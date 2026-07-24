// config/firestore.js
// ── Firestore Admin SDK singleton ──────────────────────────────────────
'use strict';

const admin = require('firebase-admin');
const path  = require('path');

if (!admin.apps.length) {
  const useEmulator = process.env.USE_EMULATOR === 'true'
    || !!process.env.FIRESTORE_EMULATOR_HOST;

  if (useEmulator) {
    // ── Emulator mode (local Linux development) ──────────────────────
    // FIRESTORE_EMULATOR_HOST is picked up automatically by the SDK.
    // No service-account key is needed — use a mock credential so
    // Admin SDK initialises without requiring a real GCP pr