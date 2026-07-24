'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, subscriber_id } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('subscribers').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      const snap = await db.collection('control_rooms').where('subscriber_id','==',subscriber_id).get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
