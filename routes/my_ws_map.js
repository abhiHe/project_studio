'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { subscriber_id, country, state, source_table } = req.body;
    let q = db.collection('audit_logs');
    if (source_table) q = q.where('source_table','==',source_table);
    if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
    if (country) q = q.where('country','==',country);
    const snap = await q.orderBy('created_at','desc').limit(200).get();
    const points = snap.docs.filter(d => d.data().Lattitude && d.data().Longitude).map(d => ({ id: d.id, lat: d.data().Lattitude, lng: d.data().Longitude, type: d.data().source_table, ...d.data() }));
    return res.json(points);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
