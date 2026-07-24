'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, country, state, news_id } = req.body;
    if (String(q) === '1') {
      let qr = db.collection('news').where('source_table','==','newsfeed').where('status','==','published');
      if (country) qr = qr.where('country','==',country);
      const snap = await qr.orderBy('created_at','desc').limit(50).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2' && news_id) {
      const doc = await db.collection('news').doc(news_id).get();
      return res.json(doc.exists ? [{ ...doc.data(), id: doc.id }] : []);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
