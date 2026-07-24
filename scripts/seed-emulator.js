// scripts/seed-emulator.js
// ── Seed the local Firestore emulator with sample KrimeWatch data ─────────
// Usage:  npm run seed:emulator
// Prereq: Emulator must be running (npm run emulator OR bash scripts/start-emulator.sh)
'use strict';

require('dotenv').config();
const { db } = require('../config/firestore');

// ── Helpers ───────────────────────────────────────────────────────────────
const now = () => new Date().toISOString();

async function upsert(collection, id, data) {
  await db.collection(collection).doc(id).set(data, { merge: true });
  console.log(`  ✓  ${collection}/${id}`);
}

// ── Seed data ─────────────────────────────────────────────────────────────
async function seed() {
  console.log('\n[seed] Seeding Firestore emulator …\n');

  // ── geo_regions ──────────────────────────────────────────────────────────
  await upsert('geo_regions', 'ZA', {
    type: 'country', name: 'South Africa', code: 'ZA',
    created_at: now(),
  });
  await upsert('geo_regions', 'GP', {
    type: 'state', name: 'Gauteng', country_code: 'ZA',
    created_at: now(),
  });
  await upsert('geo_regions', 'JHB', {
    type: 'district', name: 'Johannesburg', state_code: 'GP',
    created_at: now(),
  });

  // ── system_config ─────────────────────────────────────────────────────────
  await upsert('system_config', 'app_settings', {
    app_name:    'KrimeWatch',
    version:     '2.0.0',
    environment: 'emulator',
    updated_at:  now(),
  });

  // ── platform_users ────────────────────────────────────────────────────────
  await upsert('platform_users', 'usr_1', {
    source_table: 'users',
    fname: 'Admin', lname: 'User',
    email: 'admin@krimewatch.com',
    role: 'admin', active: 1, verified: 1,
    created_at: now(), updated_at: now(),
  });

  // ── subscribers ───────────────────────────────────────────────────────────
  await upsert('subscribers', 'sub_1', {
    fname: 'John', lname: 'Doe',
    email: 'john.doe@example.com',
    phone: '0821234567', active: 1, verified: 1,
    subscription_type: 'basic',
    created_at: now(), updated_at: now(),
  });

  // ── control_rooms ─────────────────────────────────────────────────────────
  await upsert('control_rooms', 'cr_1', {
    name: 'Johannesburg Control Room',
    district: 'JHB', active: 1,
    created_at: now(),
  });

  // ── officers ──────────────────────────────────────────────────────────────
  await upsert('officers', 'pol_1', {
    source_table: 'police',
    fname: 'Officer', lname: 'Smith',
    badge_number: 'JHB001', station_id: 'ps_1',
    active: 1, created_at: now(),
  });
  await upsert('officers', 'ps_1', {
    source_table: 'police_station',
    name: 'Johannesburg Central Police Station',
    district: 'JHB', contact: '0112345678',
    active: 1, created_at: now(),
  });

  // ── mobile_users ─────────────────────────────────────────────────────────
  await upsert('mobile_users', 'mu_1', {
    fname: 'Jane', lname: 'Doe',
    email: 'jane.doe@example.com',
    phone: '0839876543', active: 1, verified: 1,
    created_at: now(),
  });

  // ── devices ───────────────────────────────────────────────────────────────
  await upsert('devices', 'dev_1', {
    user_id: 'mu_1', user_type: 'mobile_user',
    device_type: 'android', model: 'Pixel 7',
    active: 1, created_at: now(),
  });
  await db
    .collection('devices').doc('dev_1')
    .collection('tokens').doc('tok_1')
    .set({ token: 'emulator_fcm_token_sample', created_at: now() });
  console.log('  ✓  devices/dev_1/tokens/tok_1');

  // ── feedback ──────────────────────────────────────────────────────────────
  await upsert('feedback', 'fb_1', {
    user_id: 'mu_1', subject: 'Test feedback',
    message: 'This is a test feedback entry from the emulator seed.',
    status: 'open', created_at: now(),
  });

  // ── audit_logs ────────────────────────────────────────────────────────────
  await upsert('audit_logs', 'log_1', {
    source_table: 'audit',
    action: 'seed', actor_id: 'usr_1', actor_type: 'platform_user',
    description: 'Emulator seed script ran',
    created_at: now(),
  });

  // ── news ──────────────────────────────────────────────────────────────────
  await upsert('news', 'nf_1', {
    title: 'Welcome to KrimeWatch Emulator',
    content: 'This is a seed news item for local development.',
    published: 1, created_at: now(),
  });

  console.log('\n[seed] Done! Emulator is seeded with sample data.');
  console.log('[seed] View data at: http://localhost:4000/firestore\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] ERROR:', err.message);
  process.exit(1);
});
