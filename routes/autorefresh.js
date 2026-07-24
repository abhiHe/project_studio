'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { subscriber_id, last_ts } = req.body;
    let q = db.collection('audit_logs').where('subscriber_id','==',subscriber_id);
    if (last_ts) q = q.where('created_at','>',new Date(last_ts));
    const snap = await q.orderBy('created_at','desc').limit(50).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
