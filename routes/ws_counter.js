'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { subscriber_id, country } = req.body;
    const counts = {};
    const tables = ['alerts','events','cases','tracking','missing_persons'];
    await Promise.all(tables.map(async t => {
      let q = db.collection('audit_logs').where('source_table','==',t);
      if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
      if (country) q = q.where('country','==',country);
      const s = await q.get();
      counts[t] = s.size;
    }));
    return res.json([counts]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
