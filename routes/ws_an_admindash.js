'use strict';
const { Router } = require('express');
const { db } = require('../config/firestore');
const router = Router();
router.post('/', async (req, res) => {
  try {
    const { q } = req.body;
    if (String(q) === '1') {
      const snap = await db.collection('platform_users').where('source_table','==','approvers').get();
      return res.json([{ approvers: snap.size }]);
    }
    if (String(q) === '2') {
      const snap = await db.collection('volunteers').where('source_table','==','volunteergroups').get();
      return res.json([{ volunteergroups: snap.size }]);
    }
    return res.json([{ error: true, message: 'Invalid q' }]);
  } catch (e) { return res.json([{ error: true, message: e.message }]); }
});
module.exports = router;
