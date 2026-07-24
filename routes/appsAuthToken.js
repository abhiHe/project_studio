'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const crypto = require('crypto');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, tokenId, q } = req.body;
    const hashedToken = crypto.createHash('md5').update(String(tokenId)).digest('hex');
    if (String(q) === '1') {
      const snap = await db.collection('platform_users').where('unique_id','==',uid).limit(1).get();
      if (snap.empty) return res.json({ error: true, error_msg: 'Please Check The Values' });
      await snap.docs[0].ref.update({ tokenId: hashedToken });
      return res.json({ error: false, error_msg: 'Updated Successfully' });
    }
    if (String(q) === '2') {
      const snap = await db.collection('officers').where('uniqid','==',uid).limit(1).get();
      if (snap.empty) return res.json({ error: true, error_msg: 'Please Check The Values' });
      await snap.docs[0].ref.update({ tokenId: hashedToken });
      return res.json({ error: false, error_msg: 'Updated Successfully' });
    }
    return res.json({ error: true, error_msg: 'Please Check The Values' });
  } catch (e) { return res.json({ error: true, error_msg: e.message }); }
});
module.exports = router;
