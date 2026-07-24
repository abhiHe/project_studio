'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { encryptedStatic } = require('../utils/crypto');
const { hashPassword, verifyPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const email = req.body.email; const newpass = req.body.newpass || req.body.password; const fullname = req.body.fullname;
    const encEmail = encryptedStatic(email);
    const snap = await db.collection('platform_users').where('email','==',encEmail).limit(1).get();
    if (snap.empty) return res.json({ error: false, message: 'Invalid Email ..' });
    const hash = await hashPassword(newpass);
    const upd = { password_hash: hash };
    if (fullname) upd.name = fullname;
    await snap.docs[0].ref.update(upd);
    return res.json({ error: true, message: 'Password Changed Successfully' });
  } catch (e) { return res.json({ error: true, message: e.message }); }
});
module.exports = router;
