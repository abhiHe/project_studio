'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const { signToken } = require('../middleware/auth');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, secrectkey, uid } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('platform_users').where('unique_id','==',uid).limit(1).get();
      if (snap.empty) return res.json('notmatch');
      const u = snap.docs[0].data();
      if (u.security_key === secrectkey || u.deviceid === secrectkey) {
        const newKey = signToken({ uid: snap.docs[0].id, role: u.usertype });
        return res.json(newKey);
      }
      return res.json('notmatch');
    }
    return res.json('notmatch');
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
