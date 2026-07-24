'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, country } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('geo_regions').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      const snap = await db.collection('geo_regions').doc(country).collection('states').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    return res.json([{ error: true, message: 'Invalid q' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
