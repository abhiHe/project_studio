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
    const { username, email: rawEmail, password, address, city, state, country, latitude, longitude, liveurl } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const existing = await db.collection('platform_users').where('email','==',encEmail).limit(1).get();
    if (!existing.empty) return res.json({ error: true, message: 'Email already registered' });
    const uid = uuidv4();
    const hash = await hashPassword(password);
    const docRef = db.collection('platform_users').doc();
    await docRef.set({ unique_id: uid, name: username, email: encEmail, password_hash: hash, address, city, state, country, Lattitude: latitude, Longitude: longitude, usertype: 'mobilemonitor', status: 'N', source_table: 'users', created_at: FieldValue.serverTimestamp() });
    const verifyUrl = (process.env.API_ROOT||'') + '/verify?id=' + uid + '&countrycode=' + (req.body.countrycode||'US');
    const html = buildVerificationEmail({ name: username, verifyUrl, liveUrl: liveurl || process.env.APP_URL });
    await sendMail({ to: rawEmail, subject: 'KrimeWatch Email Verification', html });
    return res.json({ error: false, message: 'Registered successfully. Please verify your email.' });
  } catch (e) { return res.json({ error: true, message: e.message }); }
});
module.exports = router;
