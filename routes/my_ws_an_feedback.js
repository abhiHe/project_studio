'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, email } = req.body;
    let q = db.collection('feedback');
    if (email) q = q.where('email','==',email);
    else if (uid) q = q.where('user_id','==',uid);
    const snap = await q.orderBy('created_at','desc').limit(20).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
