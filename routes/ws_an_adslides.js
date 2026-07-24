'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { country, state, subscriber_id } = req.body;
    let q = db.collection('advertisements');
    if (country) q = q.where('country','==',country);
    if (state) q = q.where('state','==',state);
    if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
    const snap = await q.where('status','==','active').orderBy('created_at','desc').limit(20).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
