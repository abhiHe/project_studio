'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { verifyPassword, hashPassword } = require('../utils/helpers');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { userid, oldpass, newpass, renewpass } = req.body;
    if (newpass !== renewpass) return res.json([{ error: true, message: 'reset and re enter password should be same' }]);
    if (oldpass === newpass) return res.json([{ error: true, message: 'Old and new password cannot be same' }]);
    const snap = await db.collection('platform_users').where('unique_id','==',userid).limit(1).get();
    if (snap.empty) return res.json([{ error: true, message: 'User not found' }]);
    const match = await verifyPassword(oldpass, snap.docs[0].data().password_hash || '');
    if (!match) return res.json([{ error: true, message: 'Please enter your old password correctly' }]);
    await snap.docs[0].ref.update({ password_hash: await hashPassword(newpass) });
    return res.json([{ error: false, message: 'Password Changed Successfully' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
