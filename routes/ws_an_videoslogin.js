'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { verifyPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const encEmail = encryptedStatic(username);
    const snap = await db.collection('platform_users').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json(['NoUser']);
    const doc = snap.docs[0]; const u = doc.data();
    const match = await verifyPassword(password, u.password_hash || '');
    if (!match) return res.json(['NoUser']);
    return res.json([{ uid: u.unique_id || doc.id, name: u.name, email: username }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
