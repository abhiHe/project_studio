'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q, subscriber_id, uid } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('officers').where('subscriber_id','==',subscriber_id).where('source_table','==','actionusers').get();
      return res.json(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }
    if (String(q) === '2') {
      const snap = await db.collection('officers').where('unique_id','==',uid).limit(1).get();
      if (snap.empty) return res.json(['NoUser']);
      return res.json([{ ...snap.docs[0].data(), id: snap.docs[0].id }]);
    }
    return res.json([]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
