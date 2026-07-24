'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { subscriber_id, status } = req.body;
    let q = db.collection('officers').where('source_table','==','actionusers');
    if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
    if (status) q = q.where('status','==',status);
    const snap = await q.get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
