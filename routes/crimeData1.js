'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { country, state, city, subscriber_id, id } = req.body;
    if ('crimeData1' === 'singleCrimeData' && id) {
      const doc = await db.collection('audit_logs').doc(id).get();
      return res.json(doc.exists ? [{ ...doc.data(), id: doc.id }] : []);
    }
    let q = db.collection('audit_logs').where('source_table','==','crime_data');
    if (country) q = q.where('country','==',country);
    if (state) q = q.where('state','==',state);
    if (city) q = q.where('city','==',city);
    if (subscriber_id) q = q.where('subscriber_id','==',subscriber_id);
    const snap = await q.orderBy('created_at','desc').limit(100).get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
