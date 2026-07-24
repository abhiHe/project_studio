'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { uid, subscriber_id } = req.body;
    const src = 'my_ws_an_alertcount'.includes('emergency') ? 'emergency_alerts' : 'my_ws_an_alertcount'.includes('event') ? 'events' : 'alerts';
    let q = db.collection('audit_logs').where('source_table','==',src);
    if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
    const snap = await q.get();
    return res.json([{ count: snap.size }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
