'use strict';
const { Router } = require('express');
const { db, FieldValue } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { hashPassword } = require('../utils/helpers');
const { sendMail, buildVerificationEmail } = require('../utils/mailer');
const { v4: uuidv4 } = require('uuid');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { name, email: rawEmail, password, phone, state, country, liveurl, subscriber_id } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const existing = await db.collection('platform_users').where('email','==',encEmail).where('source_table','==','approvers').limit(1).get();
    if (!existing.empty) return res.json({ error: true, message: 'Email already registered' });
    const uid = uuidv4();
    const docRef = db.collection('platform_users').doc(`apr_${uid.replace(/-/g,'').slice(0,12)}`);
    await docRef.set({ name, email: encEmail, password_hash: await hashPassword(password), phone, state, country, subscriber_id, unique_id: uid, source_table: 'approvers', status: 'pending', created_at: FieldValue.serverTimestamp() });
    const verifyUrl = (process.env.API_ROOT||'') + '/approververify?id=' + uid;
    const html = buildVerificationEmail({ name, verifyUrl, liveUrl: liveurl||process.env.APP_URL });
    await sendMail({ to: rawEmail, subject: 'KrimeWatch Approver Registration', html });
    return res.json([{ error: false, message: 'Approver registered successfully' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
