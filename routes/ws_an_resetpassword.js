'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { verifyPassword, hashPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { userid, oldpass, newpass, renewpass } = req.body;
    if (newpass !== renewpass) return res.json('reset and re enter password should be same');
    const snap = await db.collection('volunteers').doc(`vol_${userid}`).get();
    if (!snap.exists) return res.json('User not found');
    const match = await verifyPassword(oldpass, snap.data().password_hash || '');
    if (!match) return res.json('Please enter your old password correctly');
    if (oldpass === newpass) return res.json('Old and new password cannot be same');
    const hash = await hashPassword(newpass);
    await snap.ref.update({ password_hash: hash });
    return res.json('Password Changed');
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
