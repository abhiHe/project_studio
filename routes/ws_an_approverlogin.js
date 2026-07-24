'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { signToken } = require('../middleware/auth');
const { verifyPassword } = require('../utils/helpers');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const encEmail = encryptedStatic(username);
    const snap = await db.collection('platform_users')
      .where('email','==',encEmail).where('source_table','==','approvers').limit(1).get();
    if (snap.empty) return res.json(['NoUser']);
    const doc = snap.docs[0]; const user = doc.data();
    const match = await verifyPassword(password, user.password_hash || '');
    if (!match) return res.json(['NoUser']);
    if (user.status !== 'approved') return res.json('NeedToActivate');
    const token = signToken({ uid: doc.id, email: username, role: 'approver' });
    return res.json([{ uid: doc.id, uniqid: user.unique_id, name: user.name, email: username, state: user.state, token }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
