'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { subscriber_id, case_id, status } = req.body;
    if (case_id) {
      const doc = await db.collection('audit_logs').doc(case_id).get();
      return res.json(doc.exists ? [{ ...doc.data(), id: doc.id }] : []);
    }
    let q = db.collection('audit_logs').where('source_table','==','cases');
    if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
    if (status) q = q.where('status','==',status);
    const snap = await q.orderBy('created_at','desc').limit(50).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
