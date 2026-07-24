'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('system_config').where('source_table','==','config').limit(1).get();
      if (snap.empty) return res.json(null);
      return res.json(snap.docs[0].data().auth_code || null);
    }
    if (String(q) === '2') {
      return res.json(process.env.GOOGLE_CAPTCHA_KEY || '');
    }
    return res.json(null);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
