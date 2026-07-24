'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { verifyPassword, hashPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { userid, oldpass, newpass, renewpass } = req.body;
    if (newpass !== renewpass) return res.json('Please check the Password Entered.');
    const snap = await db.collection('platform_users').doc(`adv_${userid}`).get();
    if (!snap.exists) return res.json('Please check the Password Entered.');
    const match = await verifyPassword(oldpass, snap.data().password_hash || '');
    if (!match) return res.json('Please check the Password Entered.');
    await snap.ref.update({ password_hash: await hashPassword(newpass) });
    return res.json('Congratulations your password changed');
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
