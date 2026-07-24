'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const snap = await db.collection('system_config').where('source_table','==','config').limit(1).get();
    if (snap.empty) return res.json({ error: false, secretyKey: '', sec: '', ivstring: '' });
    const cfg = snap.docs[0].data();
    return res.json({ error: false, secretyKey: cfg.sk || '', sec: cfg.sec || '', ivstring: cfg.iv || '' });
  } catch (e) { return res.json({ error: true, message: e.message }); }
});
module.exports = router;
