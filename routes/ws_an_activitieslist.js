'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, subscriber_id, from_date, to_date } = req.body;
    let q = db.collection('audit_logs').where('source_table','==','activities');
    if (uid) q = q.where('user_id','==',uid);
    if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
    const snap = await q.orderBy('created_at','desc').limit(100).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
