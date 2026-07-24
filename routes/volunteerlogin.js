'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { verifyPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;
    const encEmail = encryptedStatic(rawEmail);
    const snap = await db.collection('volunteers').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'Login credentials are wrong.' }]);
    const doc = snap.docs[0]; const u = doc.data();
    const match = await verifyPassword(password, u.password_hash || '');
    if (!match) return res.json([{ error: true, message: 'Login credentials are wrong.' }]);
    if (!['approved','initial','applied'].includes(u.status)) return res.json('NeedToActivate');
    return res.json([{ uid: doc.id, name: u.name, email: rawEmail, state: u.state, status: u.status, usertype: u.usertype, VolGroup_id: u.vol_group_id, auth: u.auth, deviceuniqid: u.deviceuniqID }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
