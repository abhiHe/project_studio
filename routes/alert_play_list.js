'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { subscriber_id } = req.body;
    const snap = await db.collection('audit_logs').where('source_table','==','alerts').where('subscriber_id','==',subscriber_id).where('status','==','active').orderBy('created_at','desc').limit(50).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
