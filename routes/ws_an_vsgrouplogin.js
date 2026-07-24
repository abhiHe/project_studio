'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { verifyPassword } = require('../utils/helpers');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;
    if (!rawEmail || !password) return res.json({ error: true, message: 'Required parameters email or password is missing!' });
    const encEmail = encryptedStatic(rawEmail);
    const snap = await db.collection('volunteers').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'Login credentials are wrong. Please try again!' }]);
    const doc = snap.docs[0]; const user = doc.data();
    const match = await verifyPassword(password, user.password_hash || '');
    if (!match) return res.json([{ error: true, message: 'Login credentials are wrong. Please try again!' }]);
    if (!['approved','initial','applied'].includes(user.status)) return res.json('NeedToActivate');
    return res.json([{ uid: doc.id, ID: doc.id, name: user.name, email: rawEmail, state: user.state, status: user.status, usertype: user.usertype, VolGroup_id: user.vol_group_id }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
