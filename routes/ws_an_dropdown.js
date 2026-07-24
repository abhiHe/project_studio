'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, subscriber_id, country, state } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('officers').where('subscriber_id','==',subscriber_id).get();
      return res.json(snap.docs.map(d => ({ id: d.id, name: d.data().name || d.data().officer_name })));
    }
    if (String(q) === '2') {
      const snap = await db.collection('geo_regions').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '3') {
      const snap = await db.collection('geo_regions').doc(country).collection('states').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
