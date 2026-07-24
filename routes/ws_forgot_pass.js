'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { sendMail } = require('../utils/mailer');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { email: rawEmail } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const snap = await db.collection('platform_users').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json({ error: false, message: 'Invalid Email ..' });
    const u = snap.docs[0].data();
    const resetUrl = process.env.APP_URL + '/reset?id=' + Buffer.from(snap.docs[0].id).toString('base64');
    await sendMail({ to: rawEmail, subject: 'Password Reset', html: '<p>Click <a href="'+resetUrl+'">here</a> to reset your password.</p>' });
    return res.json({ error: false, message: 'We sent a mail to your account' });
  } catch (e) { return res.json({ error: true, message: e.message }); }
});
module.exports = router;
