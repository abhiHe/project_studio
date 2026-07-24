'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { country, state } = req.body;
    let q = db.collection('control_rooms');
    if (country) q = q.where('country','==',country);
    if (state) q = q.where('state','==',state);
    const snap = await q.get();
    return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
