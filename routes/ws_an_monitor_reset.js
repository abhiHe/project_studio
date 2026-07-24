'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { verifyPassword, hashPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { userid, oldpass, newpass, renewpass } = req.body;
    if (newpass !== renewpass) return res.json('reset and re enter password should be same');
    const snap = await db.collection('platform_users').where('unique_id','==',userid).limit(1).get();
    if (snap.empty) return res.json('User not found');
    const match = await verifyPassword(oldpass, snap.docs[0].data().password_hash || '');
    if (!match) return res.json('Please enter your old password correctly');
    if (oldpass === newpass) return res.json('Old and new password cannot be same');
    await snap.docs[0].ref.update({ password_hash: await hashPassword(newpass) });
    return res.json('Password Changed');
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
