'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { keyword, q, country, state, subscriber_id, type } = req.body;
    if (!keyword) return res.json([]);
    const kw = String(keyword).toLowerCase();
    const collections = type ? [type] : ['audit_logs','platform_users','volunteers','officers'];
    const results = [];
    for (const col of collections) {
      let qr = db.collection(col);
      if (col === 'audit_logs' && subscriber_id) qr = qr.where('subscriber_id','==',subscriber_id);
      const snap = await qr.limit(200).get();
      snap.docs.forEach(d => {
        const data = d.data();
        if (JSON.stringify(data).toLowerCase().includes(kw)) results.push({ ...data, id: d.id, _collection: col });
      });
    }
    return res.json(results.slice(0, 50));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
