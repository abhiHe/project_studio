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
    const { username, email: rawEmail, password, address, city, state, country, latitude, longitude, liveurl, apiRoot, countrycode } = req.body;
    const encEmail = encryptedStatic(rawEmail.replace(/\s/g,''));
    const existing = await db.collection('subscribers').where('email','==',encEmail).limit(1).get();
    if (!existing.empty) return res.json({ error: true, message: 'Email already registered' });
    const uid = uuidv4(); const hash = await hashPassword(password);
    const docRef = db.collection('subscribers').doc(`sub_${uid.replace(/-/g,'').slice(0,12)}`);
    await docRef.set({ fname: username, email: encEmail, password_hash: hash, address, city, state, country, Lattitude: latitude, Longitude: longitude, unique_id: uid, usertype: 'monitor', status: 'N', source_table: 'subscribers', created_at: FieldValue.serverTimestamp() });
    const verifyUrl = (apiRoot||process.env.API_ROOT||'') + '/verify?id=' + uid + '&countrycode=' + (countrycode||'US') + '&code=&liveurl=' + encodeURIComponent(liveurl||process.env.APP_URL||'');
    const html = buildVerificationEmail({ name: username, verifyUrl, liveUrl: liveurl||process.env.APP_URL });
    await sendMail({ to: rawEmail, subject: 'Welcome to KrimeWatch', html });
    return res.json({ error: false, message: 'Registered successfully. Please verify your email.' });
  } catch (e) { return res.json({ error: true, message: e.message }); }
});
module.exports = router;
