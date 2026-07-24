'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic, randomString } = require('../utils/crypto');
const { signToken } = require('../middleware/auth');
const { verifyPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const email = req.body.email || req.body.username;
    const { password } = req.body;
    const encEmail = encryptedStatic(email);
    const snap = await db.collection('mobile_users').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'NoUser' }]);
    const doc = snap.docs[0]; const u = doc.data();
    const match = await verifyPassword(password, u.password_hash || '');
    if (!match) return res.json([{ error: true, message: 'Password is Wrong' }]);
    const deviceid = randomString(30);
    await doc.ref.update({ deviceid });
    const token = signToken({ uid: doc.id, email, role: 'mobile_user' });
    return res.json([{ uid: u.unique_id || doc.id, name: u.name, email, deviceid, securityKey: token, error: false }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
