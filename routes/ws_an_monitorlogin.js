'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic, randomString } = require('../utils/crypto');
const { signToken } = require('../middleware/auth');
const { verifyPassword } = require('../utils/helpers');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const snap = await db.collection('platform_users').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'Login credentials are wrong. Please try again!' }]);
    const doc = snap.docs[0]; const user = doc.data();
    const match = await verifyPassword(password, user.password_hash || '');
    if (!match) return res.json([{ error: true, message: 'Login credentials are wrong. Please try again!' }]);
    const deviceid = randomString(30);
    await doc.ref.update({ deviceid });
    const token = signToken({ uid: doc.id, email: rawEmail, role: 'monitor' });
    return res.json([{
      error: false, message: 'Success', uid: user.unique_id || doc.id,
      name: user.name, email: rawEmail, deviceid, auth: user.auth,
      deviceuniqid: user.deviceuniqID, expireddate: user.expiry_date || '',
    }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
