'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, subscriber_id, country, state } = req.body;
    const src = 'my_ws_an_eventslist'.includes('emergency') ? 'emergency_alerts' : 'events';
    let q = db.collection('audit_logs').where('source_table','==',src);
    if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
    if (country) q = q.where('country','==',country);
    const snap = await q.orderBy('created_at','desc').limit(50).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
