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
    const { groupname, email: rawEmail, password, phone, address, city, state, country, liveurl, apiRoot } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    // Create volunteer group doc
    const groupRef = db.collection('volunteers').doc();
    const uid = uuidv4();
    await groupRef.set({ name: groupname, email: encEmail, phone, address, city, state, country, unique_id: uid, source_table: 'volunteergroups', status: 'pending', created_at: FieldValue.serverTimestamp() });
    // Send verification
    const verifyUrl = (apiRoot || process.env.API_ROOT || '') + '/volunteerverify?id=' + uid;
    const html = buildVerificationEmail({ name: groupname, verifyUrl, liveUrl: liveurl || process.env.APP_URL });
    await sendMail({ to: rawEmail, subject: 'KrimeWatch Volunteer Registration', html });
    return res.json([{ error: false, message: 'Registered successfully. Please verify your email.' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
